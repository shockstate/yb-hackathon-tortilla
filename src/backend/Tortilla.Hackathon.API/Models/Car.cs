using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Tortilla.Hackathon.API.Models
{
    public class Car
    {
        public string Model { get; set; }
        public DateTime Year { get; set; }
        public int MaxCapacity { get; set; }
        public CarType CarType { get; set; }
        }
}
