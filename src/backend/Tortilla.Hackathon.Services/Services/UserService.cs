using System.Threading.Tasks;
using AutoMapper;
using Microsoft.Extensions.Logging;
using Tortilla.Hackathon.Data.Repositories;
using Tortilla.Hackathon.Domain;
using Tortilla.Hackathon.Services.Interfaces;
using Tortilla.Hackathon.Services.Models.Dtos;

namespace Tortilla.Hackathon.Services.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository userRepository;
        private readonly IMapper mapper;
        private readonly ILogger<UserService> logger;

        public UserService(IUserRepository userRepository, IMapper mapper, ILogger<UserService> logger)
        {
            this.userRepository = userRepository;
            this.mapper = mapper;
            this.logger = logger;
        }

        public async Task RegisterUser(CreateUserDto userDto)
        {
            var user = mapper.Map<User>(userDto);
            await userRepository.Insert(user);
            logger.LogInformation("User created successfully");
        }
    }
}
