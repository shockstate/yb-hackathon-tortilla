using System.Collections.Generic;
using Tortilla.Hackathon.Domain;

namespace Tortilla.Hackathon.Data.Repositories
{
    public interface IPassengerRepository
    {
        IList<Passenger> GetPassengersByTripId();
    }
}
