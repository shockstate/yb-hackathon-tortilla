using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;

namespace Tortilla.Hackathon.Domain
{
    public class Trip
    {
        public Trip()
        {
            Passengers = new Collection<UserTripPassenger>();
        }

        public Guid Id { get; set; }
        public double Origin { get; set; }
        public double Destination { get; set; }
        public DateTime StartDateTime { get; set; }
        public TripRecurrency Recurrency { get; set; }
        public Guid UserId { get; set; }
        public virtual User User { get; set; }
        public virtual ICollection<UserTripPassenger> Passengers { get; set; }
    }
}
