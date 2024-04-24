using FluentValidation;
using SneakerResaleStore.Application.UseCases.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SneakerResaleStore.Implementation.Validators
{
    public class CreateAddressValidator : AbstractValidator<CreateAddressDTO>
    {
        public CreateAddressValidator()
        {
            RuleLevelCascadeMode = CascadeMode.Stop;

            RuleFor(address => address.StreetAddress)
                .NotEmpty().WithMessage("Street Address is required.");

            RuleFor(address => address.City)
                .NotEmpty().WithMessage("City is required")
                .MaximumLength(50).WithMessage("City cannot exceed 50 characters."); 

            RuleFor(address => address.PostalCode)
                .NotEmpty().WithMessage("Postal Code is required.")
                .Must(x => x.ToString().Length == 5).WithMessage("Postal code must be 5 digits long.");
        }
    }
}
