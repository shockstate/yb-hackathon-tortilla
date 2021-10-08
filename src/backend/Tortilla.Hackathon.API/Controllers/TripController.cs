using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Threading.Tasks;
using Tortilla.Hackathon.Services.Interfaces;

namespace Tortilla.Hackathon.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TripController : ControllerBase
    {
        private readonly ITripService tripService;
        private readonly ILogger<UserController> logger;
        public TripController(
            ITripService tripService, ILogger<UserController> logger)
        {
            this.tripService = tripService;
            this.logger = logger;
        }

        [HttpGet("myTrips")]
        public async Task<IActionResult> GetMyTrips(string email)
        {
            var trips = await tripService.GetMyTripsAsOwnerOrPassengerByUserEmailAsync(email);
            return Ok(trips);
        }

        //public void CreateTrip([FromBody] string value)
        //public void RequestJoinToTrip([FromBody] string value)
        //public void AcceptRequestToJoinTrip([FromBody] string value)
    }
}
