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
                .Include(d => d.Trip)
                .Where(dayTrip =>
                    dayTrip.Trip.UserId == userId ||
                    dayTrip.Passengers.Any(p => p.UserId == userId))
                // My following trips (one week)
                //.Where(dayTrip => dayTrip.DateTime >= DateTime.Now && dayTrip.DateTime <= DateTime.Now.AddDays(7))
                .ToListAsync();
        }

        public async Task<IList<DayTrip>> GetDayTripsAvailableByDateTimeForUser(DateTime dateTime, Guid userId)
        {
            // I search all the trips in the day
            var dateTimeBeginningOfTheDay = DateTime.Parse(dateTime.ToShortDateString());
            var dateTimeEndOfTheDay = dateTimeBeginningOfTheDay.AddDays(1).AddTicks(-1);

            return await dbContext.DayTrips
                .Include(d => d.Trip)
                .Where(dayTrip => dayTrip.DateTime >= dateTimeBeginningOfTheDay && dayTrip.DateTime < dateTimeEndOfTheDay)
                .Where(dayTrip => !dayTrip.Passengers.Any(p => p.UserId == userId))
                .Where(dayTrip => dayTrip.Trip.UserId != userId)
                .Where(dayTrip => dayTrip.Trip.User.Car.MaxCapacity > dayTrip.Passengers.Count + 1)
                .ToListAsync();
        }
    }
}
