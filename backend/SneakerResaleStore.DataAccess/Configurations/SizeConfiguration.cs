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
    public class SizeConfiguration : EntityConfiguration<Size>
    {
        protected override void ConfigureEntity(EntityTypeBuilder<Size> builder)
        {
            builder.Property(x => x.Number).IsRequired()
                                           .HasMaxLength(10);
           
            builder.HasIndex(x => x.Number).IsUnique();

            builder.HasMany(x => x.SneakerSizes)
                   .WithOne(x => x.Size)
                   .HasForeignKey(x => x.SizeId)
                   .OnDelete(DeleteBehavior.Restrict);
        }
    }
}
