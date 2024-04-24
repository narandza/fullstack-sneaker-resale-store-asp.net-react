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
    public class AddOrderItemValidator : AbstractValidator<AddOrderItemDTO>
    {
        private readonly SneakerResaleStoreContext _context;
        public AddOrderItemValidator(SneakerResaleStoreContext context)
        {
            _context = context;

            RuleFor(x => x.SneakerId)
                .NotEmpty().WithMessage("Sneaker is required.")
                .GreaterThan(0).WithMessage("SneakerId must be greater than 0.")
                .Must(x => _context.Sneakers.Any(s => s.Id == x)).WithMessage("Sneaker does not exist.");

            
        }
    }
}
