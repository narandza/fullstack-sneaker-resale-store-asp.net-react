using Microsoft.EntityFrameworkCore;
using SneakerResaleStore.Application.Exceptions;
using SneakerResaleStore.Application.UseCases.DTO;
using SneakerResaleStore.Application.UseCases.Queries;
using SneakerResaleStore.DataAccess;
using SneakerResaleStore.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SneakerResaleStore.Implementation.UseCases.Queries.UserQueries
{
    public class EfFindUserQuery : EfUseCase, IFindUserQuery
    {
        public EfFindUserQuery(SneakerResaleStoreContext context) : base(context)
        {
        }

        public int Id => 42;

        public string Name => "Find a user";

        public string Description => "";

        public UserDTO Execute(int search)
        {
            User user = Context.Users
                               .Include(u => u.Address)
                               .Include(u => u.Role)
                               .FirstOrDefault(u => u.Id == search);

            if (user == null)
            {
                throw new EntityNotFoundException(search, nameof(User));
            }

            return new UserDTO
            {
                Id = user.Id,
                Email = user.Email,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Address = new AddressDTO
                {
                    AddressId = user.AddressId,
                    StreetAddress = user.Address.StreetAddress,
                    City = user.Address.City,
                    PostalCode = user.Address.PostalCode
                },
                RoleId = user.RoleId,
                RoleName = user.Role.Name
            };
        }
    }
}
