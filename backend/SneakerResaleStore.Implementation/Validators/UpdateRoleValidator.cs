using FluentValidation;
using SneakerResaleStore.Application.UseCases.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SneakerResaleStore.Implementation.Validators
{
    public class UpdateRoleValidator : AbstractValidator<UpdateRoleDTO>
    {
        public UpdateRoleValidator()
        {
            RuleFor(role => role.Id)
                .NotEmpty().WithMessage("Id is required.")
                .GreaterThan(0).WithMessage("Invalid Id.");

            RuleFor(role => role.Name)
                .NotEmpty().WithMessage("Name is required.")
                .MaximumLength(50).WithMessage("Name cannot exceed 50 characters.");

            RuleFor(role => role.RoleUseCaseIds)
                .NotEmpty().WithMessage("Role use case IDs are required.")
                .ForEach(useCaseId =>
                {
                    useCaseId.Must(id => id > 0).WithMessage("Invalid role use case ID.");
                });
        }
    }

}
