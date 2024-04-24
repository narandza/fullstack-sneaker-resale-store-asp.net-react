using FluentValidation;
using SneakerResaleStore.Application.UseCases.Commands;
using SneakerResaleStore.Application.UseCases.DTO;
using SneakerResaleStore.DataAccess;
using SneakerResaleStore.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SneakerResaleStore.Implementation.UseCases.Commands.UserCommands
{
    public class EfRegisterUserCommand : EfUseCase, IRegisterUserCommand
    {
        private readonly RegisterUserValidator _validator;
        public EfRegisterUserCommand(SneakerResaleStoreContext context, RegisterUserValidator validator) 
            : base(context)
        {
            _validator = validator;
        }

        public int Id => 43;

        public string Name => "Create a user";

        public string Description => "";

        public void Execute(RegisterUserDTO request)
        {
            _validator.ValidateAndThrow(request);

            Role defaultRole = Context.Roles.FirstOrDefault(x => x.IsDefault);

            if (defaultRole == null)
            {
                throw new InvalidOperationException("Default role doesn't exist.");
            }

            string passwordHash = BCrypt.Net.BCrypt.HashPassword(request.Password);

            User user = new User();
            user.Email = request.Email;
            user.Password = passwordHash;
            user.FirstName = request.FirstName;
            user.LastName = request.LastName;
            user.Role = defaultRole;
            user.Address = new Address
            {
                StreetAddress = request.Address.StreetAddress,
                City = request.Address.City,
                PostalCode = request.Address.PostalCode
            };

            Context.Users.Add(user);
            Context.SaveChanges();
        }
    }
}
