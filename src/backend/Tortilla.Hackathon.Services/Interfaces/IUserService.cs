
using System.Threading.Tasks;
using Tortilla.Hackathon.Services.Models;

namespace Tortilla.Hackathon.Services.Interfaces
{
    public interface IUserService
    {
        Task RegisterUser(User user);
    }
}
