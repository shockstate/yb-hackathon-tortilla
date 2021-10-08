using System.Threading.Tasks;
using Tortilla.Hackathon.Domain;

namespace Tortilla.Hackathon.Data.Repositories
{
    public interface IUserRepository
    {
        Task InsertAsync(User user);
        Task<User> GetUserByEmailAsync(string email);
    }
}
