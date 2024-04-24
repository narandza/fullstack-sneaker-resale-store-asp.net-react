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
    public class UserConfiguration : EntityConfiguration<User>
    {
        protected override void ConfigureEntity(EntityTypeBuilder<User> builder)
        {
           builder.Property(x => x.Email).IsRequired()
                                         .HasMaxLength(100);

           builder.HasIndex(x => x.Email).IsUnique();

           builder.Property(x => x.Password).IsRequired()  ;

            builder.Property(x => x.FirstName).IsRequired()
                                              .HasMaxLength(100);

            builder.Property(x => x.LastName).IsRequired()
                                              .HasMaxLength(100);

            builder.HasOne(x => x.Role)
                    .WithMany(x => x.Users)
                    .HasForeignKey(x => x.RoleId)
                    .OnDelete(DeleteBehavior.Restrict);

           builder.HasMany(x => x.Favorites)
                   .WithOne(x => x.User)
                   .HasForeignKey(x => x.UserId)
                   .OnDelete(DeleteBehavior.Restrict);
            
            builder.HasMany(x => x.Orders)
                   .WithOne(x => x.User)
                   .HasForeignKey(x => x.UserId)
                   .OnDelete(DeleteBehavior.Restrict);

        }
    }
}
