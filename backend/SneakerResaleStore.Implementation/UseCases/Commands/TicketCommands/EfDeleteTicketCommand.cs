using SneakerResaleStore.Application.UseCases.Commands;
using SneakerResaleStore.DataAccess;
using SneakerResaleStore.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SneakerResaleStore.Implementation.UseCases.Commands.TicketCommands
{
    public class EfDeleteTicketCommand : EfUseCase, IDeleteTicketCommand
    {
        public EfDeleteTicketCommand(SneakerResaleStoreContext context) : base(context)
        {
        }

        public int Id => 95;

        public string Name => "Delete a ticket";

        public string Description => "";

        public void Execute(int request)
        {
            Ticket ticket = Context.Tickets.Find(request);

            if (ticket != null)
            {
                ticket.Status = TicketStatus.Closed;
                ticket.IsActive = false;
                ticket.DeletedAt = DateTime.UtcNow;

                Context.SaveChanges();
            }
        }
    }
}
