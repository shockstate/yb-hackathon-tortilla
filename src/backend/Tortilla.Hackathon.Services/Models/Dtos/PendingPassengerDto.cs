using System;
using Tortilla.Hackathon.Domain;

namespace Tortilla.Hackathon.Services.Models.Dtos
{
    public class PendingPassengerDto
    {
        public string TripId { get; set; }
        public string UserId { get; set; }
        public string UserFirstName { get; set; }
        public string UserLastName { get; set; }
        public double TripOriginLatitude { get; set; }
        public double TripOriginLongitude { get; set; }
        public double TripDestinationLatitude { get; set; }
        public double TripDestinationLongitude { get; set; }
        public DateTime TripStartDateTime { get; set; }
        public TripRecurrency TripRecurrency { get; set; }
    }
}
