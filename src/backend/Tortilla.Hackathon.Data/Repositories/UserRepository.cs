using System.Threading.Tasks;
using Tortilla.Hackathon.Domain;

namespace Tortilla.Hackathon.Data.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly ApplicationDbContext _dbContext;

        public UserRepository(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task Insert(User user)
        {
            await _dbContext.AddAsync(user);
        }

        public Task<User> GetUserByEmail(string email)
        {
            throw new System.NotImplementedException();
        }

        public Task InsertCar(string userId, Car car)
        {
            throw new System.NotImplementedException();
        }
    }
}
