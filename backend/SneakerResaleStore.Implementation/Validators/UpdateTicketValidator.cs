using FluentValidation;
using SneakerResaleStore.Application.UseCases.DTO;
using SneakerResaleStore.DataAccess;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SneakerResaleStore.Implementation.Validators
{
    public class UpdateTicketValidator : AbstractValidator<UpdateTicketDTO>
    {
        private readonly SneakerResaleStoreContext _context;
        public UpdateTicketValidator(SneakerResaleStoreContext context)
        {
            _context = context;

            RuleFor(x => x.Id).NotEmpty().WithMessage("TicketID is required")
                .Must(x => _context.Tickets.Any(t => t.Id == x)).WithMessage("Ticket does not exist.");

            RuleFor(x => x.Status)
                .IsInEnum().WithMessage("Invalid ticket status.");
        }
    }
}
