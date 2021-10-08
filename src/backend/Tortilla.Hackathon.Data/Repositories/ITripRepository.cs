using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Tortilla.Hackathon.Domain;

namespace Tortilla.Hackathon.Data.Repositories
{
    public interface ITripRepository
    {
        Task<IList<Trip>> GetTripsByUserIdAsync(Guid userId);
        Task<IList<Trip>> GetMyTripsAsOwnerOrPassengerByUserIdAsync(Guid userId);
    }
}
