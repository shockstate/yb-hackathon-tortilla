
using System.Collections.Generic;
using System.Threading.Tasks;
using Tortilla.Hackathon.Services.Models.Dtos;

namespace Tortilla.Hackathon.Services.Interfaces
{
    public interface IUserService
    {
        Task RegisterAsync(CreateUserDto user);
        Task<LoginResponseDto> LoginAsync(UserCredentialsDto credentials);
        Task<UserDetailsDto> GetUserByEmailAsync(string email);
        Task<IEnumerable<UserRankingDto>> GetRankingUsers();
    }
}
