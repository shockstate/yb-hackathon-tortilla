using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
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

        public Task Update()
        {
            dbContext.SaveChanges();
            return Task.CompletedTask;
        }
    }
}
