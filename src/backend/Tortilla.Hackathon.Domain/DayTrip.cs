using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;

namespace Tortilla.Hackathon.Domain
{
    public class DayTrip
    {
        public DayTrip()
        {
            Passengers = new Collection<Passenger>();
        }

        public Guid Id { get; set; }
        public Guid TripId { get; set; }
        public virtual Trip Trip { get; set; }
        public DateTime DateTime { get; set; }
        public virtual IList<Passenger> Passengers { get; set; }
    }
}
