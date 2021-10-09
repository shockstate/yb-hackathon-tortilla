using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Tortilla.Hackathon.Domain;

namespace Tortilla.Hackathon.Data.Repositories
{
    public interface IDayTripRepository
    {
        Task<IList<DayTrip>> GetMyTripsAsOwnerOrPassengerByUserIdAsync(Guid userId);

        Task<IList<DayTrip>> GetDayTripsAvailableByDateTimeForUser(DateTime dateTime, Guid userId);

        Task<DayTrip> GetDayTripById(Guid dayTripId);
    }
}
