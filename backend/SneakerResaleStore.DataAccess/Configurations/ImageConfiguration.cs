using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SneakerResaleStore.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SneakerResaleStore.DataAccess.Configurations
{
    public class ImageConfiguration : EntityConfiguration<Image>
    {
        protected override void ConfigureEntity(EntityTypeBuilder<Image> builder)
        {
            builder.Property(x => x.Path).IsRequired()
                                         .HasMaxLength(256);
        }
    }
}
