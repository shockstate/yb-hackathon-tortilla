using Geocoding;
using Geocoding.Google;
using System.Threading.Tasks;
using Tortilla.Hackathon.Services.Interfaces;

namespace Tortilla.Hackathon.Services.Services
{
    public class GeolocationService : IGeolocationService
    {
        public async Task<string> GetLocationDescription(double latitude, double longitude)
        {
            var geocoder = new GoogleGeocoder() { ApiKey = "this-is-my-google-api-key" };

            var asd = await geocoder.ReverseGeocodeAsync(latitude, longitude);

            return "TODO";
        }

    }
}
