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

        public async Task<IList<Trip>> GetTripsByUserAsync(Guid userId)
        {
            return await dbContext.Trips
                .Where(t => t.UserId == userId)
                .Include(t => t.Passengers.Select(p => p.User))
                .ToListAsync();
        }
    }
}
