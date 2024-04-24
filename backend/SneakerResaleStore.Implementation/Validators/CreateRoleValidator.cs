using FluentValidation;
using SneakerResaleStore.Application.UseCases.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SneakerResaleStore.Implementation.Validators
{
    public class CreateRoleValidator : AbstractValidator<CreateRoleDTO>
    {
        public CreateRoleValidator()
        {
            RuleLevelCascadeMode = CascadeMode.Stop;

            RuleFor(role => role.Name)
                .NotEmpty().WithMessage("Name is required.")
                .MaximumLength(50).WithMessage("Name cannot exceed 50 characters.");

            RuleFor(role => role.RoleUseCaseIds)
                .NotEmpty().WithMessage("RoleUseCaseIds is required.")
                .Must(ids => ids != null && ids.Any()).WithMessage("At least one RoleUseCaseId must be provided.");
        }
    }
}
