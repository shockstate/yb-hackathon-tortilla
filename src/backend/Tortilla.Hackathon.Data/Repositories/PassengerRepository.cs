namespace Tortilla.Hackathon.Data.Repositories
{
    public class PassengerRepository : IPassengerRepository
    {
        private readonly ApplicationDbContext dbContext;

        public PassengerRepository(ApplicationDbContext dbContext)
        {
            this.dbContext = dbContext;
        }
    }
}
