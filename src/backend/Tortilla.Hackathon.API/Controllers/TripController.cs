using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
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
        public async Task<IActionResult> GetMyTrips(Guid userId)
        {
            try
            {
                var trips = await tripService.GetMyTripsAsOwnerOrPassengerByUserIdAsync(userId);
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

        [HttpGet]
        public async Task<IActionResult> SearchTrips(SearchTripsDto searchTripsDto)
        {
            try
            {
                var dayTrips = await tripService.SearchDayTripsAsync(searchTripsDto);
                return Ok(dayTrips);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        //public void AcceptRequestToJoinTrip([FromBody] string value)
    }
}
