namespace Tortilla.Hackathon.Data.Repositories
{
    public class TripRepository : ITripRepository
    {
        private readonly ApplicationDbContext dbContext;

        public TripRepository(ApplicationDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

    }
}
