using System;
using Tortilla.Hackathon.Domain;

namespace Tortilla.Hackathon.Services.Models.Dtos.Trips
{
    public class MyTripDto
    {
        public Guid TripId { get; set; }
        public string Origin { get; set; }
        public double OriginLatitude { get; set; }
        public double OriginLongitude { get; set; }
        public string Destination { get; set; }
        public double DestinationLatitude { get; set; }
        public double DestinationLongitude { get; set; }
        public TripRecurrency Recurrency { get; set; }
        public bool IsUserPassenger { get; set; }
    }
}
