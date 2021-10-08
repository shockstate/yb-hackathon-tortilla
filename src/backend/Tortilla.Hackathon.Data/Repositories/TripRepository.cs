using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Tortilla.Hackathon.Domain;

namespace Tortilla.Hackathon.Data.Repositories
{
    public class TripRepository : ITripRepository
    {
        private readonly ApplicationDbContext dbContext;

        public TripRepository(ApplicationDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public async Task InsertAsync(Trip trip)
        {
            await dbContext.Trips.AddAsync(trip);
            await dbContext.SaveChangesAsync();
        }

        public async Task<IList<Trip>> GetTripsByUserIdAsync(Guid userId)
        {
            return await dbContext.Trips
                .Where(t => t.UserId == userId)
                // TODO:
                //.Include(t => t.Passengers.Select(p => p.User))
                .ToListAsync();
        }
    }
}
