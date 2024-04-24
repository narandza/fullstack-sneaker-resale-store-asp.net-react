using FluentValidation;
using SneakerResaleStore.Application.UseCases.Commands;
using SneakerResaleStore.Application.UseCases.DTO;
using SneakerResaleStore.DataAccess;
using SneakerResaleStore.Domain.Entities;
using SneakerResaleStore.Implementation.Validators;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SneakerResaleStore.Implementation.UseCases.Commands.RoleCommands
{
    public class EfCreateRoleCommand : EfUseCase, ICreateRoleCommand
    {
        private readonly CreateRoleValidator _validator;
        public EfCreateRoleCommand(SneakerResaleStoreContext context, CreateRoleValidator validator) : base(context)
        {
            _validator = validator;
        }

        public int Id => 53;

        public string Name => "Create a Role";

        public string Description => "";

        public void Execute(CreateRoleDTO request)
        {
            _validator.ValidateAndThrow(request);

            Role role = new Role
            {
                Name = request.Name,
                RoleUseCases = request.RoleUseCaseIds.Select(uc => new RoleUseCase
                {
                    UseCaseId = uc
                }).ToList()
            };

            Context.Add(role);
            Context.SaveChanges();
        }
    }
}
