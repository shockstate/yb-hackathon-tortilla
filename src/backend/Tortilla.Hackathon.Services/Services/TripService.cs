using AutoMapper;
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
        private readonly List<DayOfWeek> workableDays = new List<DayOfWeek> 
        {
            DayOfWeek.Monday,
            DayOfWeek.Tuesday,
            DayOfWeek.Wednesday,
            DayOfWeek.Tuesday,
            DayOfWeek.Friday
        };

        public TripService(ITripRepository tripRepository, 
            IMapper mapper, IGeolocationService geolocationService)
        {
            this.tripRepository = tripRepository;
            this.mapper = mapper;
            this.geolocationService = geolocationService;
        }

        public async Task<IList<MyTripDto>> GetMyTripsAsOwnerOrPassengerByUserIdAsync(Guid userId)
        {
            var myTrips = await tripRepository.GetMyTripsAsOwnerOrPassengerByUserIdAsync(userId);

            var myTripsDto = mapper.Map<List<MyTripDto>>(myTrips);
            await ResolveIsPassengerFieldsAndLocationsForDto(userId, myTrips, myTripsDto);

            return myTripsDto;
        }

        private async Task ResolveIsPassengerFieldsAndLocationsForDto(Guid userId, IList<Trip> trips, IList<MyTripDto> myTripDtos)
        {
            foreach (var myTripDto in myTripDtos)
            {
                var trip = trips.First(t => t.Id == myTripDto.TripId);
                myTripDto.IsUserPassenger = trip.UserId != userId;
                myTripDto.OriginDescription = await geolocationService.GetLocationDescription(myTripDto.OriginLatitude, myTripDto.OriginLongitude);
                myTripDto.DestinationDescription = await geolocationService.GetLocationDescription(myTripDto.DestinationLatitude, myTripDto.DestinationLongitude);
            }
        }

        public async Task CreateTripAsync(CreateTripDto createTripDto)
        {
            var trip = mapper.Map<Trip>(createTripDto);
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
    }
}
