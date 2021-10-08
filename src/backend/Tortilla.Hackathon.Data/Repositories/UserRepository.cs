using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;
using Tortilla.Hackathon.Domain;

namespace Tortilla.Hackathon.Data.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly ApplicationDbContext dbContext;

        public UserRepository(ApplicationDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public async Task InsertAsync(User user)
        {
            await dbContext.Users.AddAsync(user);
            await dbContext.SaveChangesAsync();
        }

        public Task<User> GetUserByEmailAsync(string email)
        {
            return dbContext.Users
                .Where(u => u.Email == email)
                .FirstOrDefaultAsync();
        }
    }
}
