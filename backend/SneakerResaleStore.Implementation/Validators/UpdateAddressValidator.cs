using FluentValidation;
using SneakerResaleStore.Application.UseCases.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SneakerResaleStore.Implementation.Validators
{
    public class UpdateAddressValidator : AbstractValidator<UpdateAddressDTO>
    {
        public UpdateAddressValidator()
        {
            RuleFor(address => address.StreetAddress)
                .NotEmpty().WithMessage("Street address is required.");
                
            RuleFor(address => address.City)
                .NotEmpty().WithMessage("City is required.")
                .MaximumLength(50).WithMessage("City cannot exceed 50 characters.");

            RuleFor(address => address.PostalCode)
                .NotEmpty().WithMessage("Postal code is required.")
                .Must(code => code.ToString().Length == 5).WithMessage("Postal code must be 5 digits long.");
        }
    }
}
