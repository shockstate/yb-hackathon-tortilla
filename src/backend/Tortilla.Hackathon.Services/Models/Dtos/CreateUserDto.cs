using System;
using System.ComponentModel.DataAnnotations;

namespace Tortilla.Hackathon.Services.Models.Dtos
{
    public class CreateUserDto
    {
        [Required]
        public string FirstName { get; set; } = string.Empty;
        [Required]
        public string LastName { get; set; } = string.Empty;
        [Required]
        public string Password { get; set; } = string.Empty;
        [Required]
        [EmailAddress]
        public string Email { get; set; } = string.Empty;
        [Required]
        public DateTime DateOfBirth { get; set; } = DateTime.MinValue;
        [Required]
        public string DriversLicenseNumber { get; set; } = string.Empty;
        [Required]
        public CarDto Car { get; set; } = new CarDto();
    }
}
