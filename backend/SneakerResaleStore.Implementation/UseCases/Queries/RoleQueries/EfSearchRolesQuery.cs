using Microsoft.EntityFrameworkCore;
using SneakerResaleStore.Application.UseCases.DTO;
using SneakerResaleStore.Application.UseCases.Queries;
using SneakerResaleStore.Application.UseCases.Queries.Searches;
using SneakerResaleStore.DataAccess;
using SneakerResaleStore.Domain.Entities;
using SneakerResaleStore.Implementation.Extensions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SneakerResaleStore.Implementation.UseCases.Queries.RoleQueries
{
    public class EfSearchRolesQuery : EfUseCase, ISearchRolesQuery
    {
        public EfSearchRolesQuery(SneakerResaleStoreContext context) : base(context)
        {
        }

        public int Id => 51;

        public string Name => "Search roles";

        public string Description => "";
        public PagedResponse<RoleDTO> Execute(RoleSearch search)
        {
            IQueryable<Role> query = Context.Roles
                                            .Include(r => r.RoleUseCases)
                                            .Include(r => r.Users)
                                            .Where(r => r.IsActive &&
                                             r.DeletedAt == null);


            if (!string.IsNullOrEmpty(search.Name))
            {
                string nameSearchTerm = search.Name;
                query = query.Where(r => r.Name.ToLower().Contains(nameSearchTerm));
            }

            if (search.Id != 0)
            {
                query = query.Where(r => r.Id == search.Id);
            }

            if (search.UseCaseId != 0)
            {
                query = query.Where(r => r.RoleUseCases.Any(rc => rc.UseCaseId == search.UseCaseId));
            }

            if (!string.IsNullOrEmpty(search.UserEmail))
            {
                string userEmailSearchTerm = search.UserEmail;
                query = query.Where(r => r.Users.Any(u => u.Email.ToLower().Contains(userEmailSearchTerm)));
            }


            return query.ToPagedResponse(search, x => new RoleDTO
            {
                Id = x.Id,
                Name = x.Name,
                RoleUseCases = x.RoleUseCases.Select(rc => rc.UseCaseId),
                RoleUsers = new RoleUsersDTO
                {
                    Ids = x.Users.Select(u => u.Id),
                    Emails = x.Users.Select(u => u.Email)
                }
            });
        }
    }
}

