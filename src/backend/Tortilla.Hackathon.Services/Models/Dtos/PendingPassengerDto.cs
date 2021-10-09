using System;

namespace Tortilla.Hackathon.Services.Models.Dtos
{
    public class PendingPassengerDto
    {
        public string PassengerId { get; set; }
        public string DayTripId { get; set; }
        public string UserId { get; set; }
        public string UserFirstName { get; set; }
        public string UserLastName { get; set; }
        public string OriginDescription { get; set; }
        public double OriginLatitude { get; set; }
        public double OriginLongitude { get; set; }
        public int OriginDistanceInMeters { get; set; }
        public string DestinationDescription { get; set; }
        public double DestinationLatitude { get; set; }
        public double DestinationLongitude { get; set; }
        public DateTime DateTime { get; set; }
    }
}
