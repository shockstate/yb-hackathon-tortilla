
using System.Threading.Tasks;
using Tortilla.Hackathon.Services.Models;
using Tortilla.Hackathon.Services.Models.Dtos;

namespace Tortilla.Hackathon.Services.Interfaces
{
    public interface IUserService
    {
        Task RegisterAsync(CreateUserDto user);
        Task LoginAsync(UserCredentialsDto credentials);
    }
}
