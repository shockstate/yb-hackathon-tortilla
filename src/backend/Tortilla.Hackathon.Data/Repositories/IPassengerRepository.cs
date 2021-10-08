using System;
using System.Threading.Tasks;
using Tortilla.Hackathon.Domain;

namespace Tortilla.Hackathon.Data.Repositories
{
    public interface IPassengerRepository
    {
        Task<Passenger> GetPassengerById(Guid id);
        Task Update();
    }
}
