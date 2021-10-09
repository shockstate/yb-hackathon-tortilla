using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
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

            var userWithMail = await userRepository.GetUserByEmailAsync(userDto.Email);
            if (userWithMail != null)
            {
                logger.LogInformation($"User with email {userDto.Email} already exists");
                throw new DuplicateNameException($"User with email {userWithMail.Email} already exists");
            }
            await userRepository.InsertAsync(user);

            logger.LogInformation("User created successfully");
        }

        public async Task<LoginResponseDto> LoginAsync(UserCredentialsDto userCredentialsDto)
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

            return new LoginResponseDto { UserId = user.Id };
        }

        public async Task<UserDetailsDto> GetUserByEmailAsync(string email)
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

        public async Task<IEnumerable<UserRankingDto>> GetRankingUsers()
        {
            var users = await userRepository.GetUsers();
            var top10Users = users.OrderByDescending(i => i.Points);
            var top10dto = mapper.Map<List<User>, List<UserRankingDto>>(top10Users.ToList());
            return top10dto;
        }
    }
}
