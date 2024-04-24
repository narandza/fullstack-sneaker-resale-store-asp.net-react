using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SneakerResaleStore.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SneakerResaleStore.DataAccess.Configurations
{
    public class AddressConfiguration : EntityConfiguration<Address>
    {
        protected override void ConfigureEntity(EntityTypeBuilder<Address> builder)
        {
            builder.Property(x => x.StreetAddress).IsRequired();

            builder.Property(x => x.City).IsRequired()
                                         .HasMaxLength(50);

            builder.Property(x => x.PostalCode).IsRequired()
                                               .HasMaxLength(5);

     
                                            
        }
    }
}
