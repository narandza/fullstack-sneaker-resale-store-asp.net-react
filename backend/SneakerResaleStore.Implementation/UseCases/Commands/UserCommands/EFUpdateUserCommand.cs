using FluentValidation;
using Microsoft.EntityFrameworkCore;
using SneakerResaleStore.Application.UseCases.Commands;
using SneakerResaleStore.Application.UseCases.DTO;
using SneakerResaleStore.DataAccess;
using SneakerResaleStore.Implementation.Validators;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SneakerResaleStore.Implementation.UseCases.Commands.UserCommands
{
    public class EFUpdateUserCommand : EfUseCase, IUpdateUserCommand
    {
        private readonly UpdateUserValidator _validator;
        public EFUpdateUserCommand(SneakerResaleStoreContext context, UpdateUserValidator validator) 
            : base(context)
        {
            _validator = validator;
        }

        public int Id => 44;

        public string Name => "Update a user.";

        public string Description => "";

        public void Execute(UpdateUserDTO request)
        {
            _validator.ValidateAndThrow(request);

            var existingUser = Context.Users
                                      .Include(u => u.Role)
                                      .FirstOrDefault(u => u.Id == request.Id);

            if(existingUser != null)
            {
                existingUser.Id = request.Id;
                existingUser.Email = request.Email;
                existingUser.Password = request.Password;
                existingUser.FirstName = request.FirstName;
                existingUser.LastName = request.LastName;
                existingUser.RoleId = request.RoleId;
                existingUser.ModifiedAt = DateTime.UtcNow;

                Context.Entry(existingUser).State = EntityState.Modified;
                Context.SaveChanges();
            }
        }
    }
}
