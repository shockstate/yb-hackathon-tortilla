using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading.Tasks;
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

        public Task<Passenger> GetPassengerById(Guid id)
        {
            return dbContext.Passengers
                .Where(p => p.Id == id)
                .FirstOrDefaultAsync();
        }

        public async Task InsertAsync(Passenger passenger)
        {
            await dbContext.Passengers.AddAsync(passenger);
            await dbContext.SaveChangesAsync();
        }

        public async Task Update(Passenger passenger)
        {
            dbContext.Passengers.Update(passenger);
            await dbContext.SaveChangesAsync();
        }
    }
}
