using System;
using System.Collections.Generic;

namespace Tortilla.Hackathon.Domain
{
    public class DayTrip
    {
        public Guid Id { get; set; }
        public Guid TripId { get; set; }
        public virtual Trip Trip { get; set; }
        public DateTime DateTime { get; set; }
        public IList<Passenger> Passengers { get; set; }
    }
}
