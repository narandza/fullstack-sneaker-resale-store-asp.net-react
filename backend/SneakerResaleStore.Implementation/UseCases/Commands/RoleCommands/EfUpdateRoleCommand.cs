using FluentValidation;
using Microsoft.EntityFrameworkCore;
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
    public class EfUpdateRoleCommand : EfUseCase, IUpdateRoleCommand
    {
        private readonly UpdateRoleValidator _validator;
        public EfUpdateRoleCommand(SneakerResaleStoreContext context, UpdateRoleValidator validator) : base(context)
        {
            _validator = validator;
        }

        public int Id => 54;

        public string Name => "Update a Role";

        public string Description => "";

        public void Execute(UpdateRoleDTO request)
        {
            _validator.ValidateAndThrow(request);

            var existingRole = Context.Roles.Include(r => r.RoleUseCases).FirstOrDefault(r => r.Id == request.Id);

            if (existingRole != null)
            {
                existingRole.Id = request.Id;
                existingRole.Name = request.Name;
                existingRole.RoleUseCases.Clear();
                foreach (var useCaseId in request.RoleUseCaseIds)
                {
                    existingRole.RoleUseCases.Add(new RoleUseCase
                    {
                        UseCaseId = useCaseId
                    });
                };
                existingRole.ModifiedAt = DateTime.UtcNow;

                Context.Entry(existingRole).State = EntityState.Modified;
                Context.SaveChanges();
            }
        }
    };
}
