using FluentValidation;
using SneakerResaleStore.Application.UseCases.DTO;
using SneakerResaleStore.Implementation.Validators;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

public class RegisterUserValidator : AbstractValidator<RegisterUserDTO>
{
    public RegisterUserValidator()
    {
        RuleLevelCascadeMode = CascadeMode.Stop;

        RuleFor(user => user.FirstName)
            .NotEmpty().WithMessage("First name is required.")
            .MaximumLength(50).WithMessage("First name cannot exceed 50 characters.");

        RuleFor(user => user.LastName)
            .NotEmpty().WithMessage("Last name is required.")
            .MaximumLength(50).WithMessage("Last name cannot exceed 50 characters.");

        RuleFor(user => user.Email)
            .NotEmpty().WithMessage("Email is required.")
            .MaximumLength(100).WithMessage("Email cannot exceed 100 characters.")
            .EmailAddress().WithMessage("Invalid email address.");

        RuleFor(user => user.Password)
            .NotEmpty().WithMessage("Password is required.")
            .SetValidator(new PasswordValidator());

        RuleFor(user => user.Address)
            .NotNull().WithMessage("Address is required.")
            .SetValidator(new CreateAddressValidator());
       
    }
}

   