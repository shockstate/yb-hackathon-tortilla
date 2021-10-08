using System.Collections.Generic;
using Tortilla.Hackathon.Domain;

namespace Tortilla.Hackathon.Data.Repositories
{
    public class PassengerRepository : IPassengerRepository
    {
        private readonly ApplicationDbContext dbContext;

        public PassengerRepository(ApplicationDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public IList<Passenger> GetPassengersByTripId()
        {
            throw new System.NotImplementedException();
        }
    }
}
