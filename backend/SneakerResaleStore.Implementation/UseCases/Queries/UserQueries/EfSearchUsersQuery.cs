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

namespace SneakerResaleStore.Implementation.UseCases.Queries.UserQueries
{
    public class EfSearchUsersQuery : EfUseCase, ISearchUsersQuery
    {
        public EfSearchUsersQuery(SneakerResaleStoreContext context) : base(context)
        {
        }

        public int Id => 41;

        public string Name => "Search users";

        public string Description => "";

        public PagedResponse<UserDTO> Execute(UserSearch search)
        {
            IQueryable<User> query = Context.Users;

            if (!string.IsNullOrEmpty(search.Name))
            {
                string nameSearchTerm = search.Name.ToLower();
                query = query.Where(u => u.FirstName.ToLower().Contains(nameSearchTerm) || u.LastName.ToLower().Contains(nameSearchTerm));
            }

            if (!string.IsNullOrEmpty(search.Email))
            {
                string emailSearchTerm = search.Email.ToLower();
                query = query.Where(u => u.Email.ToLower().Contains(emailSearchTerm));
            }

            if (!string.IsNullOrEmpty(search.Address))
            {
                string addressSearchTerm = search.Address.ToLower();
                query = query.Where(u => u.Address.StreetAddress.ToLower().Contains(addressSearchTerm)
                || u.Address.City.ToLower().Contains(addressSearchTerm));
            }

            return query.ToPagedResponse(search, x => new UserDTO
            {
                Id = x.Id,
                Email = x.Email,
                FirstName = x.FirstName,
                LastName = x.LastName,
                Address = new AddressDTO
                {
                    AddressId = x.Address.Id,
                    StreetAddress = x.Address.StreetAddress,
                    City = x.Address.City,
                    PostalCode = x.Address.PostalCode
                },
                RoleId = x.RoleId,
                RoleName = x.Role.Name
            }) ; ;
        }
    }
}
