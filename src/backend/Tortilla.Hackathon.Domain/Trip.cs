using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;

namespace Tortilla.Hackathon.Domain
{
    public class Trip
    {
        public Trip()
        {
            DayTrips = new Collection<DayTrip>();
        }

        public Guid Id { get; set; }
        public string OriginDescription { get; set; }
        public double OriginLatitude { get; set; }
        public double OriginLongitude { get; set; }
        public string DestinationDescription { get; set; }
        public double DestinationLatitude { get; set; }
        public double DestinationLongitude { get; set; }
        public DateTime StartDateTime { get; set; }
        public TripRecurrency Recurrency { get; set; }
        public Guid UserId { get; set; }
        public virtual User User { get; set; }
        public virtual ICollection<DayTrip> DayTrips { get; set; }
    }
}
