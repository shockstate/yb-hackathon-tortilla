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
        private readonly IUserRepository userRepository;
        private readonly ITripRepository tripRepository;
        private readonly IMapper mapper;
        private readonly IGeolocationService geolocationService;

        public TripService(IUserRepository userRepository, ITripRepository tripRepository, 
            IMapper mapper, IGeolocationService geolocationService)
        {
            this.userRepository = userRepository;
            this.tripRepository = tripRepository;
            this.mapper = mapper;
            this.geolocationService = geolocationService;
        }

        public async Task<IList<MyTripDto>> GetMyTripsAsOwnerOrPassengerByUserEmailAsync(string email)
        {
            var user = await userRepository.GetUserByEmailAsync(email);
            var myTrips = await tripRepository.GetMyTripsAsOwnerOrPassengerByUserIdAsync(user.Id);

            var myTripsDto = mapper.Map<List<MyTripDto>>(myTrips);
            await ResolveIsPassengerFieldsAndLocationsForDto(user.Id, myTrips, myTripsDto);

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
            await tripRepository.InsertAsync(trip);
        }
    }
}
