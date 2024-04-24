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
    public class TicektMessageConfiguration : EntityConfiguration<TicketMessage>
    {
        protected override void ConfigureEntity(EntityTypeBuilder<TicketMessage> builder)
        {
            builder.Property(x => x.Message).IsRequired();

            builder.HasOne(x => x.Ticket)
                    .WithMany(x => x.TicketMessages)
                    .HasForeignKey(x => x.TicketId)
                    .OnDelete(DeleteBehavior.Restrict);
        }
    }
}
