using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Geolocation;

namespace Tortilla.Hackathon.API.Models.Dtos
{
    public class TripDto
    {
        public Coordinate Origin { get; set; }
        public Coordinate Destination { get; set; }
        public Recurrency Recurrency { get; set; }
    }
}
