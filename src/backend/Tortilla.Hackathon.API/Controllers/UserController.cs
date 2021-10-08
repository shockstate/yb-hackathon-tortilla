using System;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Tortilla.Hackathon.Services.Interfaces;
using Tortilla.Hackathon.Services.Models.Dtos;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Tortilla.Hackathon.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService userService;
        private readonly ILogger<UserController> logger;
        public UserController(
            IUserService userService, ILogger<UserController> logger)
        {
            this.userService = userService;
            this.logger = logger;
        }
        // GET api/<UserController>/5
        [HttpPost("login")]
        public async Task<IActionResult> Login(UserCredentialsDto userCredentialsDto)
        {
            try
            {
                await userService.LoginAsync(userCredentialsDto);
            }
            catch (NotImplementedException ex)
            {
                logger.LogError(ex, ex.Message);
                return StatusCode(StatusCodes.Status501NotImplemented, ex.Message);
            }
            catch (UnauthorizedAccessException ex)
            {
                logger.LogError(ex, ex.Message);
                return StatusCode(StatusCodes.Status401Unauthorized, ex.Message);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
            return StatusCode(StatusCodes.Status302Found);
        }

        // POST api/<UserController>
        [HttpPost("register")]
        public async Task<IActionResult> RegisterUser(CreateUserDto userDto, CancellationToken cancellationToken = default)
        {
            //validate data
            try
            {
                await userService.RegisterAsync(userDto);
            }
            catch (NotImplementedException ex)
            {
                logger.LogError(ex, ex.Message);
                return StatusCode(StatusCodes.Status501NotImplemented, ex.Message);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
            return StatusCode(StatusCodes.Status201Created);
        }
    }
}
