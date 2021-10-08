using System;

namespace Tortilla.Hackathon.Domain
{
    public class Trip
    {
        public Guid Id { get; set; }
        public double Origin { get; set; }
        public double Destination { get; set; }
        public DateTime StartDateTime { get; set; }
        public TripRecurrency Recurrency { get; set; }
        public Guid UserId { get; set; }
        public virtual User User { get; set; }
    }
}
