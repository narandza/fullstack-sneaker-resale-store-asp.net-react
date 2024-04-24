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
    public class BrandConfiguration : EntityConfiguration<Brand>
    {
        protected override void ConfigureEntity(EntityTypeBuilder<Brand> builder)
        {
            builder.Property(x => x.Name).IsRequired()
                                         .HasMaxLength(50);

            builder.Property(x => x.Description).IsRequired();
                                 

        }
    }
}
