﻿
using System;

namespace Tortilla.Hackathon.API.Models.Dtos
{
    public class UserDetailsDto
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