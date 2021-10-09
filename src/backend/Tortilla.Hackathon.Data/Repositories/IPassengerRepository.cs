using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Tortilla.Hackathon.Domain;

namespace Tortilla.Hackathon.Data.Repositories
{
    public interface IPassengerRepository
    {
        Task<Passenger> GetPassengerById(Guid id);
        Task InsertAsync(Passenger passenger);
        Task Update(Passenger passenger);
        Task<IList<Passenger>> GetPendingPassengersByTripUserId(Guid tripUserId);
    }
}
