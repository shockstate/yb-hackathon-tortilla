using Geocoding.Microsoft;
using Microsoft.Extensions.Configuration;
using System.Linq;
using System.Threading.Tasks;
using Tortilla.Hackathon.Services.Interfaces;

namespace Tortilla.Hackathon.Services.Services
{
    public class GeolocationService : IGeolocationService
    {
        private readonly BingMapsGeocoder geocoder;

        public GeolocationService(IConfiguration configuration)
        {
            var apiKey = configuration["BingGeocodingApiKey"];
            geocoder = new BingMapsGeocoder(apiKey);
        }

        public async Task<string> GetLocationDescription(double latitude, double longitude)
        {
            var addresses = await geocoder.ReverseGeocodeAsync(latitude, longitude);
            var location = addresses.FirstOrDefault();

            if (location is null)
            {
                return string.Empty;
            }

            return $"{location.AddressLine}, {location.PostalCode} {location.Locality}, {location.AdminDistrict}, {location.CountryRegion}";
        }

    }
}
