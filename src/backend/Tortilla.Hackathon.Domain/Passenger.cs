using System;

namespace Tortilla.Hackathon.Domain
{
    public class Passenger
    {
        public Guid Id { get; set; }
        public Guid UserId { get; set; }
        public virtual User User { get; set; }
        public Guid DayTripId { get; set; }
        public virtual DayTrip DayTrip { get; set; }
        public PassengerStatus PassengerStatus { get; set; }
    }
}
