
using System.Collections.Generic;
using System.Threading.Tasks;
using Tortilla.Hackathon.Services.Models.Dtos.Trips;

namespace Tortilla.Hackathon.Services.Interfaces
{
    public interface ITripService
    {
        Task<IList<MyTripDto>> GetMyTripsAsOwnerOrPassengerByUserEmailAsync(string email);
        Task CreateTripAsync(CreateTripDto createTripDto);
    }
}
