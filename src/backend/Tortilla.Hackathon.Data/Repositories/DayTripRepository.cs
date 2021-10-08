using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Tortilla.Hackathon.Domain;

namespace Tortilla.Hackathon.Data.Repositories
{
    public class DayTripRepository : IDayTripRepository
    {
        private readonly ApplicationDbContext dbContext;

        public DayTripRepository(ApplicationDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public async Task<IList<DayTrip>> GetMyTripsAsOwnerOrPassengerByUserIdAsync(Guid userId)
        {
            return await dbContext.DayTrips
                .Where(dayTrip =>
                    dayTrip.Trip.UserId == userId ||
                    dayTrip.Passengers.Any(p => p.UserId == userId))
                .ToListAsync();
        }
    }
}
