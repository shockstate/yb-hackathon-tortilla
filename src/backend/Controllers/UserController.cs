using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {


        // GET api/<UserController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "user";
        }

        // POST api/<UserController>
        [HttpPost]
        public void Post([FromBody] string value)
        {
            //create user
        }
    }
}
