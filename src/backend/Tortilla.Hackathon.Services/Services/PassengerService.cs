using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Tortilla.Hackathon.Data.Repositories;
using Tortilla.Hackathon.Services.Interfaces;
using Tortilla.Hackathon.Services.Models.Dtos;

namespace Tortilla.Hackathon.Services.Services
{
    public class PassengerService : IPassengerService
    {
        private readonly ITripRepository tripRepository;
        private readonly IMapper mapper;

        public PassengerService(ITripRepository tripRepository, IMapper mapper)
        {
            this.tripRepository = tripRepository;
            this.mapper = mapper;
        }

        public async Task<IList<PendingPassengerDto>> GetPendingPassengersAsync(Guid tripUserId)
        {
            var trips = await tripRepository.GetTripsByUserAsync(tripUserId);
            var pendingPassengers = trips
                .SelectMany(trip => trip.Passengers)
                .Where(p => p.AcceptedDateTime is null);

            return mapper.Map<List<PendingPassengerDto>>(pendingPassengers);
        }
    }
}
