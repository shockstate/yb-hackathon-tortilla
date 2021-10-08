using Microsoft.EntityFrameworkCore;
using System;
using Tortilla.Hackaton.Domain;

namespace Tortilla.Hackaton.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>()
                .HasKey(u => u.Id);
        }
    }
}
