using System.Threading.Tasks;
using Tortilla.Hackathon.Domain;

namespace Tortilla.Hackathon.Data.Repositories
{
    public interface IUserRepository
    {
        Task Insert(User user);
        Task<User> GetUserByEmail(string email);
        Task InsertCar(string userId, Car car);
    }
}
