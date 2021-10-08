using System;

namespace Tortilla.Hackathon.API.Models.Dtos
{
    public class CreateUserDto
    {
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public DateTime DateOfBirth { get; set; } = DateTime.MinValue;
        public string DriversLicenceNumber { get; set; } = string.Empty;
    }
}
