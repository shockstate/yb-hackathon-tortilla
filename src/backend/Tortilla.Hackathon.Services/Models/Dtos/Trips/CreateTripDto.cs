using System;
using System.ComponentModel.DataAnnotations;
using Tortilla.Hackathon.Domain;
using Tortilla.Hackathon.Services.Validations;

namespace Tortilla.Hackathon.Services.Models.Dtos.Trips
{
    public class CreateTripDto
    {
        [Required]
        public double OriginLatitude { get; set; }
        [Required]
        public double OriginLongitude { get; set; }
        [Required]
        public string OriginDescription { get; set; }
        [Required]
        public double DestinationLatitude { get; set; }
        [Required]
        public double DestinationLongitude { get; set; }
        [Required]
        public string DestinationDescription { get; set; }
        [Required]
        [StartDateTimeAttribute]
        public DateTime StartDateTime { get; set; }
        [Required]
        public TripRecurrency Recurrency { get; set; }
        [Required]
        public Guid UserId { get; set; }
    }
}
