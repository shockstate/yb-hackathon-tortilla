using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Tortilla.Hackathon.Services.Models.Dtos
{
    public class CarDto
    {
        public string Model { get; set; }
        public int Year { get; set; }
        public int MaxCapacity { get; set; }
        public CarType CarType { get; set; }
    }
}
