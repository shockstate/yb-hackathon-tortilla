using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.Extensions.Logging;
using Tortilla.Hackathon.Data.Repositories;
using Tortilla.Hackathon.Domain;
using Tortilla.Hackathon.Services.Helpers;
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

        public async Task RegisterAsync(CreateUserDto userDto)
        {
            var user = mapper.Map<User>(userDto);
            await userRepository.InsertAsync(user);
            logger.LogInformation("User created successfully");
        }

        public async Task LoginAsync(UserCredentialsDto userCredentialsDto)
        {
            var hashedPassword = Security.GetHashString(userCredentialsDto.Password);
            var user = await userRepository.GetUserByEmailAsync(userCredentialsDto.Email);

            if (user == null)
            {
                logger.LogInformation($"User with email {userCredentialsDto.Email} does not exist");
                throw new KeyNotFoundException($"User with email {userCredentialsDto.Email} does not exist");
            }

            if (user.PasswordHash != hashedPassword)
            {
                throw new UnauthorizedAccessException();
            }

            logger.LogInformation("Login was successful");
        }

        public async Task<UserDetailsDto> GetUserAsync(string email)
        {
            var user = await userRepository.GetUserByEmailAsync(email);
            if (user == null)
            {
                logger.LogInformation($"User with email {email} does not exist");
                throw new KeyNotFoundException($"User with email {email} does not exist");
            }
            var userDto = mapper.Map<UserDetailsDto>(user);
            logger.LogInformation("Get mail was successful");
            return userDto;
        }
    }
}
