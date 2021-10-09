using System;
using System.ComponentModel.DataAnnotations;

namespace Tortilla.Hackathon.Services.Models.Dtos.Trips
{
    public class SearchTripsDto
    {
        [Required]
        public double OriginLatitude { get; set; }
        [Required]
        public double OriginLongitude { get; set; }
        [Required]
        public double DestinationLatitude { get; set; }
        [Required]
        public double DestinationLongitude { get; set; }
        [Required]
        public DateTime DateTime { get; set; }
        [Required]
        public Guid UserId { get; set; }
    }
}
