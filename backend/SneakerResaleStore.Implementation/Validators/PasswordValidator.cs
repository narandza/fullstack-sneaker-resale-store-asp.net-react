using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace SneakerResaleStore.Implementation.Validators
{
    public class PasswordValidator : AbstractValidator<string>
    {
        public PasswordValidator()
        {
            RuleLevelCascadeMode = CascadeMode.Stop;

            RuleFor(password => password)
                .NotEmpty().WithMessage("Password is required.")
                .MinimumLength(8).WithMessage("Password must be at least 8 characters long.")
                .Must(BeValidPassword).WithMessage("Password must meet the complexity requirements.");
        }

        private bool BeValidPassword(string password)
        {
            const string uppercaseRegex = "[A-Z]";
            const string lowercaseRegex = "[a-z]";
            const string digitRegex = @"\d";
            const string specialCharRegex = @"[^\w\d\s]";

            bool isUppercaseValid = Regex.IsMatch(password, uppercaseRegex);
            bool isLowercaseValid = Regex.IsMatch(password, lowercaseRegex);
            bool isDigitValid = Regex.IsMatch(password, digitRegex);
            bool isSpecialCharValid = Regex.IsMatch(password, specialCharRegex);

            if (!isUppercaseValid)
                throw new ValidationException("Password must contain at least one uppercase letter.");

            if (!isLowercaseValid)
                throw new ValidationException("Password must contain at least one lowercase letter.");

            if (!isDigitValid)
                throw new ValidationException("Password must contain at least one digit.");

            if (!isSpecialCharValid)
                throw new ValidationException("Password must contain at least one special character.");

            return true;
        }
    }
}

