using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;
using Tortilla.Hackathon.Services.Interfaces;

namespace Tortilla.Hackathon.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PassengerController : ControllerBase
    {
        private readonly IPassengerService passengerService;
        private readonly ILogger<UserController> logger;

        public PassengerController(
            IPassengerService passengerService, ILogger<UserController> logger)
        {
            this.passengerService = passengerService;
            this.logger = logger;
        }

        [HttpPatch("{id}")]
        public async Task<IActionResult> AcceptPassenger([FromRoute] Guid id, [FromBody] Boolean isAccepted)
        {
            try
            {
                await passengerService.AcceptPassenger(isAccepted, id);
                return Ok();
            }
            catch (NotImplementedException ex)
            {
                logger.LogError(ex, ex.Message);
                return StatusCode(StatusCodes.Status501NotImplemented, ex.Message);
            }
            catch (InvalidOperationException ex)
            {
                logger.LogError(ex, ex.Message);
                return StatusCode(StatusCodes.Status405MethodNotAllowed, ex.Message);
            }
            catch (KeyNotFoundException ex)
            {
                logger.LogError(ex, ex.Message);
                return StatusCode(StatusCodes.Status404NotFound, ex.Message);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
    }
}
