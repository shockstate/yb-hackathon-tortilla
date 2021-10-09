using System;
using System.ComponentModel.DataAnnotations;

namespace Tortilla.Hackathon.Services.Models.Dtos.Trips
{
    public class DayTripRequestDto
    {
        [Required]
        public Guid DayTripId { get; set; }
        [Required]
        public Guid UserId { get; set; }
    }
}
