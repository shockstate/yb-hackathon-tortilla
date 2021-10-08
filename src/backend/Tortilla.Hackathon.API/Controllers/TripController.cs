using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.ComponentModel.DataAnnotations;
using System.Threading.Tasks;
using Tortilla.Hackathon.Services.Interfaces;
using Tortilla.Hackathon.Services.Models.Dtos.Trips;

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
        public async Task<IActionResult> GetMyTrips([EmailAddress] string email)
        {
            try
            {
                var trips = await tripService.GetMyTripsAsOwnerOrPassengerByUserEmailAsync(email);
                return Ok(trips);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        public async Task<IActionResult> CreateTrip(CreateTripDto createTripDto)
        {
            try
            { 
                await tripService.CreateTripAsync(createTripDto);
                return StatusCode(StatusCodes.Status201Created);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        //public void RequestJoinToTrip([FromBody] string value)
        //public void AcceptRequestToJoinTrip([FromBody] string value)
    }
}
