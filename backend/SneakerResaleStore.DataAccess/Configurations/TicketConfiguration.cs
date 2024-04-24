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
    public class TicketConfiguration : EntityConfiguration<Ticket>
    {
        protected override void ConfigureEntity(EntityTypeBuilder<Ticket> builder)
        {
            builder.Property(x => x.Title).IsRequired().HasMaxLength(100);

            builder.Property(x => x.Description).IsRequired();

            builder.HasOne(x => x.User)
                .WithMany(x => x.Tickets)
                .HasForeignKey(x => x.UserId)
                .OnDelete(DeleteBehavior.Restrict);

            builder.HasMany(x => x.TicketMessages)
                .WithOne(x => x.Ticket)
                .HasForeignKey(x => x.TicketId)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}
