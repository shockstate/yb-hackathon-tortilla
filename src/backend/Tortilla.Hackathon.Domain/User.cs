using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;

namespace Tortilla.Hackathon.Domain
{
    public class User
    {
        public User()
        {
            Trips = new Collection<Trip>();
            //TripsAsPassenger = new Collection<Trip>();
        }

        public Guid Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string PasswordHash { get; set; }
        public string DriversLicenseNumber { get; set; }
        public int TotalCo2Saved { get; set; }
        public int Points { get; set; }
        public Guid CarId { get; set; }
        public virtual Car Car { get; set; }
        public virtual ICollection<Trip> Trips { get; set; }
        //public virtual ICollection<Trip> TripsAsPassenger { get; set; }
    }
}
