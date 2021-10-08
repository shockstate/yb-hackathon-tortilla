
using System.Threading.Tasks;
using Geolocation;

namespace Tortilla.Hackathon.Services.Interfaces
{
    public interface ITripService
    {
        Task GetTrips(Coordinate origin, Coordinate destination);
    }
}
