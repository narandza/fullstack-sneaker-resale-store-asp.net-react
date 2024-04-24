using FluentValidation;
using Microsoft.EntityFrameworkCore;
using SneakerResaleStore.Application.UseCases.Commands;
using SneakerResaleStore.Application.UseCases.DTO;
using SneakerResaleStore.DataAccess;
using SneakerResaleStore.Implementation.Validators;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SneakerResaleStore.Implementation.UseCases.Commands.TicketCommands
{
    public class EFUpdateTicketCommand : EfUseCase, IUpdateTicketCommand
    {
        private readonly UpdateTicketValidator _validator;
        public EFUpdateTicketCommand(SneakerResaleStoreContext context, UpdateTicketValidator validator) : base(context)
        {
            _validator = validator;
        }

        public int Id => 95;

        public string Name => "Update a ticket";

        public string Description => "";

        public void Execute(UpdateTicketDTO request)
        {
           _validator.ValidateAndThrow(request);

            var existingTicket = Context.Tickets.FirstOrDefault(t => t.Id == request.Id);
        
                if(existingTicket != null)
                 {
                existingTicket.Status = request.Status;
                existingTicket.ModifiedAt = DateTime.UtcNow;

                Context.Entry(existingTicket).State = EntityState.Modified;
                Context.SaveChanges();
                }

          
        }


    }
}
