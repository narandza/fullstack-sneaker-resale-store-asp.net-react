using Microsoft.EntityFrameworkCore;
using SneakerResaleStore.Domain.Entities;
using System;

namespace SneakerResaleStore.DataAccess
{
    public class SneakerResaleStoreContext : DbContext
    {
        public SneakerResaleStoreContext()
        {

        }

        public SneakerResaleStoreContext(DbContextOptions opt) : base(opt)
        {
            Database.EnsureCreated();
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfigurationsFromAssembly(typeof(SneakerResaleStoreContext).Assembly);
            modelBuilder.Entity<SneakerImage>().HasKey(x => new { x.SneakerId, x.ImageId });      
            modelBuilder.Entity<SneakerSize>().HasKey(x => new { x.SneakerId, x.SizeId });
            modelBuilder.Entity<RoleUseCase>().HasKey(x => new { x.RoleId, x.UseCaseId });

            base.OnModelCreating(modelBuilder);
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(@"Data Source=DIMITRIJE\SQLEXPRESS; Initial Catalog = SneakerResaleStore; Integrated Security = true");
            //base.OnConfiguring(optionsBuilder);
        }

        public DbSet<Address> Addresses { get; set; }
        public DbSet<Brand> Brands { get; set; }
        public DbSet<Favorite> Favorites { get; set; }
        public DbSet<Image> Images { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<OrderItem> OrderItems { get; set; }
        public DbSet<Role> Roles { get; set; }
        public DbSet<RoleUseCase> RoleUseCases { get; set; }
        public DbSet<Size> Sizes { get; set; }
        public DbSet<Sneaker> Sneakers { get; set; }
        public DbSet<SneakerImage> SneakerImages { get; set; }
        public DbSet<SneakerSize> SneakerSizes { get; set; }
        public DbSet<Ticket> Tickets { get; set; }
        public DbSet<TicketMessage> TicketMessages { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<LogEntry> LogEntries { get; set; }
    }
}
