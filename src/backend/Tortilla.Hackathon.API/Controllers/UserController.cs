using System;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Tortilla.Hackathon.API.Models.Dtos;
using Tortilla.Hackathon.Services.Interfaces;
using Tortilla.Hackathon.Services.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Tortilla.Hackathon.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService userService;
        private readonly IMapper mapper;
        private readonly ILogger<UserController> logger;
        public UserController(
            IUserService userService, IMapper mapper, ILogger<UserController> logger)
        {
            this.userService = userService;
            this.mapper = mapper;
            this.logger = logger;
        }
        // GET api/<UserController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "user";
        }

        // POST api/<UserController>
        [HttpPost("")]
        public async Task<IActionResult> RegisterUser(CreateUserDto userDto, CancellationToken cancellationToken = default)
        {
            //validate data
            try
            {
                var user = mapper.Map<User>(userDto);
                await userService.RegisterUser(user);
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
