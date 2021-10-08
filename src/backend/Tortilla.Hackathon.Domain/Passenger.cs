using System;

namespace Tortilla.Hackathon.Domain
{
    public class Passenger
    {
        public Guid UserId { get; set; }
        public virtual User User { get; set; }
        public Guid TripId { get; set; }
        public virtual Trip Trip { get; set; }
        public DateTime AcceptedDateTime { get; set; }
    }
}
