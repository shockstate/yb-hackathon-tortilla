using System.Threading.Tasks;

namespace Tortilla.Hackathon.Services.Interfaces
{
    public interface IGeolocationService
    {
        Task<string> GetLocationDescription(double latitude, double longitude);
    }
}
