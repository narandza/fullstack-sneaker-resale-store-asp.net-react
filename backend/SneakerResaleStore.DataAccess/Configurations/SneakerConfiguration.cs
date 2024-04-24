using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SneakerResaleStore.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SneakerResaleStore.DataAccess.Configurations
{
    public class SneakerConfiguration : EntityConfiguration<Sneaker>
    {
        protected override void ConfigureEntity(EntityTypeBuilder<Sneaker> builder)
        {
            builder.Property(x => x.Model).IsRequired()
                                          .HasMaxLength(128);

            builder.Property(x => x.Colorway).IsRequired()
                                             .HasMaxLength(128);

            builder.Property(x => x.Description).IsRequired();

            builder.HasOne(x => x.Brand)
                    .WithMany(x => x.Sneakers)
                    .HasForeignKey(x => x.BrandId)
                    .OnDelete(DeleteBehavior.Restrict);

            builder.HasMany(x => x.Images)
                    .WithOne(x => x.Sneaker)
                    .HasForeignKey(x => x.SneakerId)
                    .OnDelete(DeleteBehavior.Restrict);

            builder.HasMany(x=> x.Favorites)
                   .WithOne(x=> x.Sneaker)
                   .HasForeignKey(x => x.SneakerId)
                   .OnDelete(DeleteBehavior.Restrict);

            builder.HasMany(x => x.OrderItems)
                   .WithOne(x => x.Sneaker)
                   .HasForeignKey(x => x.SneakerId)
                   .OnDelete(DeleteBehavior.Restrict);

            builder.HasMany(x => x.Sizes)
                .WithOne(x => x.Sneaker)
                .HasForeignKey(x => x.SneakerId)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}
