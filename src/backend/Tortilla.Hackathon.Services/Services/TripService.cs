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
        private readonly IPassengerRepository passengerRepository;
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
            IDayTripRepository dayTripRepository, IPassengerRepository passengerRepository)
        {
            this.tripRepository = tripRepository;
            this.mapper = mapper;
            this.geolocationService = geolocationService;
            this.dayTripRepository = dayTripRepository;
            this.passengerRepository = passengerRepository;
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
                var userPassenger = myDayTrip.Passengers.FirstOrDefault(p => p.UserId == userId);
                myDayTripDto.IsUserPassenger = userPassenger != null;
                myDayTripDto.PassengerStatus = userPassenger?.PassengerStatus ?? PassengerStatus.Pending;
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

            foreach (var dayTripDto in dayTripDtos)
            {
                var originDistanceInMeters = originGeoCoordinate.GetDistanceTo(new GeoCoordinate(dayTripDto.OriginLatitude, dayTripDto.OriginLongitude));
                var destinationDistanceInMeters = destinationGeoCoordinate.GetDistanceTo(new GeoCoordinate(dayTripDto.DestinationLatitude, dayTripDto.DestinationLongitude));
                dayTripDto.OriginDistanceInMeters = Convert.ToInt32(originDistanceInMeters);
                dayTripDto.DestinationDistanceInMeters = Convert.ToInt32(destinationDistanceInMeters);
            }

            return dayTripDtos;
        }

        public async Task CreteDayTripRequest(DayTripRequestDto dayTripRequestDto)
        {
            var dayTrip = await dayTripRepository.GetDayTripById(dayTripRequestDto.DayTripId);

            var carMaxCapacity = dayTrip.Trip.User.Car.MaxPassengersCapacity;

            if (dayTrip.DateTime <= DateTime.Now)
            {
                throw new Exception("Date already passed.");
            }

            if (dayTrip.Trip.UserId == dayTripRequestDto.UserId)
            {
                throw new Exception("User is the own of the trip.");
            }

            if (dayTrip.Passengers.Any(p => p.UserId == dayTripRequestDto.UserId))
            {
                throw new Exception("User already requested this trip.");
            }

            if (dayTrip.Passengers.Count(p => p.PassengerStatus == PassengerStatus.Accepted) >= carMaxCapacity)
            {
                throw new Exception("Trip is already full.");
            }

            var passenger = new Passenger
            {
                UserId = dayTripRequestDto.UserId,
                PassengerStatus = PassengerStatus.Pending,
                DayTripId = dayTrip.Id
            };

            await passengerRepository.InsertAsync(passenger);
        }

        public double GetDistanceBetweenTwoPoints(double originLong, double originLat, double destinLong, double destinLatitud)
        {
            // Only taken account a straight line, not the proper car route. We can use Google Maps in the future, but is costly
            var originGeoCoordinate = new GeoCoordinate(originLat, originLong);
            var destinationGeoCoordinate = new GeoCoordinate(destinLatitud, destinLong);
            var originDistanceInMeters = originGeoCoordinate.GetDistanceTo(destinationGeoCoordinate);

            return originDistanceInMeters;
        }
    }
}
