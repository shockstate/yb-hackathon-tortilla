using System;

namespace Tortilla.Hackathon.Domain
{
    public class Car
    {
        public Guid Id { get; set; }
        public string Model { get; set; }
        public int Year { get; set; }
        public int MaxPassengersCapacity { get; set; }
        public CarType CarType { get; set; }
        public Guid UserId { get; set; }
        public virtual User User { get; set; }
    }
}
