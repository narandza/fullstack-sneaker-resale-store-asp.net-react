using FluentValidation;
using SneakerResaleStore.Application;
using SneakerResaleStore.Application.UseCases.Commands;
using SneakerResaleStore.Application.UseCases.DTO;
using SneakerResaleStore.DataAccess;
using SneakerResaleStore.Domain.Entities;
using SneakerResaleStore.Implementation.Validators;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SneakerResaleStore.Implementation.UseCases.Commands.TicketCommands
{
    public class EFCreateTicketCommand : EfUseCase, ICreateTicketCommand
    {
        private readonly CreateTicketValidator _validator;
        private readonly IApplicationActor _actor;
        public EFCreateTicketCommand(SneakerResaleStoreContext context, CreateTicketValidator validator, IApplicationActor actor) : base(context)
        {
            _validator = validator;
            _actor = actor;
        }

        public int Id => 93;

        public string Name => "Create a ticket";

        public string Description => "";

        public void Execute(CreateTicketDTO request)
        {
            _validator.ValidateAndThrow(request);

            Ticket ticket = new Ticket
            {
                Title = request.Title,
                Description = request.Description,
                Status = request.Status,
                UserId = _actor.Id
            };

            Context.Add(ticket);
            Context.SaveChanges();
        }
    }
}
