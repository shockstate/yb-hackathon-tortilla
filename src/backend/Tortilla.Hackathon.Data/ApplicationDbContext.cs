using Microsoft.EntityFrameworkCore;
using Tortilla.Hackathon.Domain;

namespace Tortilla.Hackathon.Data
{
    public class ApplicationDbContext : DbContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<Trip> Trips { get; set; }
        public DbSet<DayTrip> DayTrips { get; set; }
        public DbSet<Car> Cars { get; set; }
        public DbSet<Passenger> Passengers { get; set; }

        public ApplicationDbContext(DbContextOptions options) : base(options)
        {
            Database.Migrate();
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>()
                .HasKey(e => e.Id);

            modelBuilder.Entity<User>()
                .HasOne(e => e.Car)
                .WithOne(e => e.User)
                .HasForeignKey<User>(e => e.CarId);

            modelBuilder.Entity<User>()
                .HasMany(e => e.Trips)
                .WithOne(e => e.User)
                .HasForeignKey(e => e.UserId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Car>()
                .HasKey(e => e.Id);

            modelBuilder.Entity<Car>()
                .HasOne(e => e.User)
                .WithOne(e => e.Car)
                .HasForeignKey<Car>(e => e.UserId);

            modelBuilder.Entity<Trip>()
                .HasOne(e => e.User)
                .WithMany(e => e.Trips)
                .HasForeignKey(e => e.UserId);

            modelBuilder.Entity<Trip>()
                .HasMany(e => e.DayTrips)
                .WithOne(e => e.Trip)
                .HasForeignKey(e => e.TripId);

            modelBuilder.Entity<Passenger>()
                .HasKey(e => e.Id);

            modelBuilder.Entity<Passenger>()
                .HasOne(pt => pt.User)
                .WithMany(p => p.Passengers)
                .HasForeignKey(pt => pt.UserId);

            modelBuilder.Entity<Passenger>()
                .HasOne(pt => pt.DayTrip)
                .WithMany(t => t.Passengers)
                .HasForeignKey(pt => pt.DayTripId);
        }
    }
}
