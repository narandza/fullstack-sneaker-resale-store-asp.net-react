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
    public class UpdateOrderValidator : AbstractValidator<UpdateOrderDTO>
    {
        private readonly SneakerResaleStoreContext _context;

        public UpdateOrderValidator(SneakerResaleStoreContext context)
        {
            _context = context;

            RuleFor(x => x.Id)
            .NotEmpty().WithMessage("Order ID is required.")
            .Must(x => _context.Orders.Any(o => o.Id == x)).WithMessage("Order does not exist.");

            RuleFor(x => x.PaymentStatus)
            .IsInEnum().WithMessage("Invalid payment status."); 
            
            //RuleFor(x => x.PaymentMethod)
            //.IsInEnum().WithMessage("Invalid payment method.");

            RuleForEach(x => x.Items)
            .SetValidator(new CreateOrderItemValidator(_context));
        }
    }
}
