
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Tortilla.Hackathon.Services.Models.Dtos.Trips;

namespace Tortilla.Hackathon.Services.Interfaces
{
    public interface ITripService
    {
        Task<IList<MyTripDto>> GetMyTripsAsOwnerOrPassengerByUserIdAsync(Guid userId);
        Task CreateTripAsync(CreateTripDto createTripDto);
    }
}
