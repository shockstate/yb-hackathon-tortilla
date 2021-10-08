using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Tortilla.Hackathon.Services.Interfaces;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

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

        // GET: api/<TripController>
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "trip 1", "trip 2" };
        }

        // GET api/<TripController>/5
        [HttpGet("{id}")]
        public string GetTripbyId(int id)
        {
            return "details of the trip";
        }

        // POST api/<TripController>
        [HttpPost]
        public void CreateTrip([FromBody] string value)
        {
            //create a trip request
        }

        // POST api/<TripController>/5/members/requests
        [HttpPost("{id}/members/request")]
        public void RequestJoinToTrip([FromBody] string value)
        {
            //create a trip request
        }

        // POST api/<TripController>/5/members/accept
        [HttpPost("{id}/members/accept")]
        public void AcceptRequestToJoinTrip([FromBody] string value)
        {
            //create a trip request
        }

    }
}
