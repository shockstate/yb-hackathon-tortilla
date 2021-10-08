using Geolocation;

namespace Tortilla.Hackathon.Services.Models.Dtos
{
    public class TripDto
    {
        public Coordinate Origin { get; set; }
        public Coordinate Destination { get; set; }
        public Recurrency Recurrency { get; set; }
    }
}
