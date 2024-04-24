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

namespace SneakerResaleStore.Implementation.UseCases.Queries.RoleQueries
{
    public class EfFindRoleQuery : EfUseCase, IFindRoleQuery
    {
        public EfFindRoleQuery(SneakerResaleStoreContext context) : base(context)
        {
        }

        public int Id => 52;

        public string Name => "Find a role";

        public string Description => "";

        public ReadRoleDTO Execute(int search)
        {
            Role role = Context.Roles
                               .Include(r => r.Users)
                               .Include(r => r.RoleUseCases)
                               .FirstOrDefault(r => r.Id == search);

            if (role == null)
            {
                throw new EntityNotFoundException(search, nameof(Role));
            }

            return new ReadRoleDTO
            {
                Id = role.Id,
                Name = role.Name,
                RoleUseCases = role.RoleUseCases.Select(rc => rc.UseCaseId),
                RoleUsers = new RoleUsersDTO
                {
                    Ids = role.Users.Select(u => u.Id),
                    Emails = role.Users.Select(u => u.Email)
                }
            };
        }
    }
}
