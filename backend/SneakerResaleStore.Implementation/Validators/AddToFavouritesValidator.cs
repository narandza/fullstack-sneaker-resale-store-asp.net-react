using FluentValidation;
using SneakerResaleStore.DataAccess;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SneakerResaleStore.Implementation.Validators
{
    public class AddToFavouritesValidator : AbstractValidator<int>
    {
        private readonly SneakerResaleStoreContext _context;

        public AddToFavouritesValidator(SneakerResaleStoreContext context)
        {
            _context = context;

            RuleFor(x => x)
                .NotEmpty().WithMessage("Sneaker Id is required")
                .GreaterThan(0).WithMessage("Sneaker Id must be greater than zero")
                .Must(x => context.Sneakers.Any(s => s.Id == x)).WithMessage("Sneaker does not exist.");
        }
    }
}
