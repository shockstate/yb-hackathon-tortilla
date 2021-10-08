using System;

namespace Tortilla.Hackathon.Services.Models
{
    public class Car
    {
        public string Model { get; set; }
        public DateTime Year { get; set; }
        public int MaxCapacity { get; set; }
        public CarType CarType { get; set; }
        }
}
