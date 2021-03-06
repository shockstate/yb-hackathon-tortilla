using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Tortilla.Hackathon.Domain;

namespace Tortilla.Hackathon.Data.Repositories
{
    public interface ITripRepository
    {
        Task InsertAsync(Trip trip);
        Task<IList<Trip>> GetTripsByUserIdAsync(Guid userId);
    }
}
