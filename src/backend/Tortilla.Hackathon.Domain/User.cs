using System;

namespace Tortilla.Hackathon.Domain
{
    public class User
    {
        public Guid Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string PasswordHash { get; set; }
        public string DriversLicenseNumber { get; set; }
        public int TotalCo2Saved { get; set; }
        public int Points { get; set; }
    }
}
