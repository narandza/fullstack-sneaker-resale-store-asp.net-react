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
    public class CreateOrderValidator : AbstractValidator<CreateOrderDTO>
    {
        private readonly SneakerResaleStoreContext _context;

        public CreateOrderValidator(SneakerResaleStoreContext context)
        {
            _context = context;

            RuleFor(order => order.PaymentMethod)
                .IsInEnum().WithMessage("Invalid payment method.");

            RuleForEach(order => order.Items)
                .SetValidator(new CreateOrderItemValidator(context));
        }
    }

    public class CreateOrderItemValidator : AbstractValidator<CreateOrderItemDTO>
    {
        private readonly SneakerResaleStoreContext _context;
        public CreateOrderItemValidator(SneakerResaleStoreContext context)
        {
            _context = context;

            RuleFor(item => item.SneakerId)
                .NotEmpty().WithMessage("Sneaker Id is required.")
                .GreaterThan(0).WithMessage("Sneaker Id must be greater than zero.")
                .Must(item => _context.Sneakers.Any(s => s.Id == item)).WithMessage("Sneaker does not exist");
           
        }
    }
}
