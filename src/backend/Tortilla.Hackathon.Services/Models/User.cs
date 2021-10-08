using System;
namespace Tortilla.Hackathon.Services.Models
{
    public record User
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string DriversLicenceNumber { get; set; }
        public int TotalCo2Saved { get; set; }
        public int Points { get; set; }
    }
}
