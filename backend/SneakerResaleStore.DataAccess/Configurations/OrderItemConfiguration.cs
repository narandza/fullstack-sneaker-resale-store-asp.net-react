using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SneakerResaleStore.Domain.Entities;

namespace SneakerResaleStore.DataAccess.Configurations
{
    public class OrderItemConfiguration : EntityConfiguration<OrderItem>
    {
        protected override void ConfigureEntity(EntityTypeBuilder<OrderItem> builder)
        {
            builder.HasOne(x => x.Order)
                   .WithMany(x => x.Items)
                   .HasForeignKey(x => x.OrderId)
                   .OnDelete(DeleteBehavior.Restrict);

            builder.HasOne(x => x.Sneaker)
                    .WithMany(x => x.OrderItems)
                    .HasForeignKey(x => x.SneakerId)
                    .OnDelete(DeleteBehavior.Restrict); 
        }
    }
}
