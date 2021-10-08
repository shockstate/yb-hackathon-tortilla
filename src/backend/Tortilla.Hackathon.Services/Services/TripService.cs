using AutoMapper;
using GeoCoordinatePortable;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Tortilla.Hackathon.Data.Repositories;
using Tortilla.Hackathon.Domain;
using Tortilla.Hackathon.Services.Interfaces;
using Tortilla.Hackathon.Services.Models.Dtos.Trips;

namespace Tortilla.Hackathon.Services.Services
{
    public class TripService : ITripService
    {
        private readonly ITripRepository tripRepository;
        private readonly IMapper mapper;
        private readonly IGeolocationService geolocationService;
        private readonly IDayTripRepository dayTripRepository;
        private readonly List<DayOfWeek> workableDays = new List<DayOfWeek> 
        {
            DayOfWeek.Monday,
            DayOfWeek.Tuesday,
            DayOfWeek.Wednesday,
            DayOfWeek.Tuesday,
            DayOfWeek.Friday
        };

        public TripService(ITripRepository tripRepository, 
            IMapper mapper, IGeolocationService geolocationService,
            IDayTripRepository dayTripRepository)
        {
            this.tripRepository = tripRepository;
            this.mapper = mapper;
            this.geolocationService = geolocationService;
            this.dayTripRepository = dayTripRepository;
        }

        public async Task<IList<MyDayTripDto>> GetMyTripsAsOwnerOrPassengerByUserIdAsync(Guid userId)
        {
            var myDayTrips = await dayTripRepository.GetMyTripsAsOwnerOrPassengerByUserIdAsync(userId);

            var myDayTripDtos = mapper.Map<List<MyDayTripDto>>(myDayTrips);
            ResolveIsPassengerFieldsForDto(userId, myDayTrips, myDayTripDtos);

            return myDayTripDtos;
        }

        private static void ResolveIsPassengerFieldsForDto(Guid userId, IList<DayTrip> dayTrips, IList<MyDayTripDto> myDayTripDtos)
        {
            foreach (var myDayTripDto in myDayTripDtos)
            {
                var myDayTrip = dayTrips.First(t => t.Id == myDayTripDto.Id);
                myDayTripDto.IsUserPassenger = myDayTrip.Trip.UserId != userId;
            }
        }

        public async Task CreateTripAsync(CreateTripDto createTripDto)
        {
            var trip = mapper.Map<Trip>(createTripDto);
            trip.OriginDescription = await geolocationService.GetLocationDescription(trip.OriginLatitude, trip.OriginLongitude);
            trip.DestinationDescription = await geolocationService.GetLocationDescription(trip.DestinationLatitude, trip.DestinationLongitude);
            CreateDayTripsForTrip(trip);

            await tripRepository.InsertAsync(trip);
        }

        private void CreateDayTripsForTrip(Trip trip)
        {
            if (trip.Recurrency == TripRecurrency.None)
            {
                trip.DayTrips.Add(new DayTrip
                {
                    DateTime = trip.StartDateTime
                });

                return;
            }

            // For the following 30 days create trips.
            for (int i = 0; i < 30; i++)
            {
                var tripDateTime = trip.StartDateTime.AddDays(i);

                if (trip.Recurrency == TripRecurrency.EveryDay || 
                    (trip.Recurrency == TripRecurrency.EveryWorkday && workableDays.Contains(tripDateTime.DayOfWeek)))
                {
                    trip.DayTrips.Add(new DayTrip
                    {
                        DateTime = tripDateTime
                    });
                }
            }
        }

        public async Task<IList<DayTripDto>> SearchDayTripsAsync(SearchTripsDto searchTripsDto)
        {
            var dayTripsInDateTime = await dayTripRepository.GetDayTripsAvailableByDateTimeForUser(searchTripsDto.DateTime, searchTripsDto.UserId);
            
            var maxRadiusInMeters = 5000;
            var originGeoCoordinate = new GeoCoordinate(searchTripsDto.OriginLatitude, searchTripsDto.OriginLongitude);
            var destinationGeoCoordinate = new GeoCoordinate(searchTripsDto.DestinationLatitude, searchTripsDto.DestinationLongitude);

            var dayTripsInRadius = dayTripsInDateTime
                .Where(dayTrip =>
                    originGeoCoordinate.GetDistanceTo(new GeoCoordinate(dayTrip.Trip.OriginLatitude, dayTrip.Trip.OriginLongitude)) <= maxRadiusInMeters &&
                    destinationGeoCoordinate.GetDistanceTo(new GeoCoordinate(dayTrip.Trip.DestinationLatitude, dayTrip.Trip.DestinationLongitude)) <= maxRadiusInMeters);

            var dayTripDtos = mapper.Map<List<DayTripDto>>(dayTripsInRadius);

            return dayTripDtos;
        }
    }
}
