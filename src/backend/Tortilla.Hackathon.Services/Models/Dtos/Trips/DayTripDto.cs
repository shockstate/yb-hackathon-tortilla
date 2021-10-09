using System;

namespace Tortilla.Hackathon.Services.Models.Dtos.Trips
{
    public class DayTripDto
    {
        public Guid Id { get; set; }
        public string OriginDescription { get; set; }
        public double OriginLatitude { get; set; }
        public double OriginLongitude { get; set; }
        public int OriginDistanceInMeters { get; set; }
        public string DestinationDescription { get; set; }
        public double DestinationLatitude { get; set; }
        public double DestinationLongitude { get; set; }
        public int DestinationDistanceInMeters { get; set; }
        public DateTime DateTime { get; set; }
    }
}
