using System;
using System.Threading.Tasks;
using Geolocation;
using Tortilla.Hackathon.Services.Interfaces;

namespace Tortilla.Hackathon.Services.Services
{
    public class TripService : ITripService
    {
        public Task GetTrips(Coordinate origin, Coordinate destination)
        {
            throw new NotImplementedException();
        }
    }
}
