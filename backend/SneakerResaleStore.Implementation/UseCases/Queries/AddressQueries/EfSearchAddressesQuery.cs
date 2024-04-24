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

namespace SneakerResaleStore.Implementation.UseCases.Queries.AddressQueries
{
    public class EfSearchAddressesQuery : EfUseCase, ISearchAddressesQuery
    {
        public EfSearchAddressesQuery(SneakerResaleStoreContext context) : base(context)
        {
        }

        public int Id => 31;

        public string Name => "Addresses search";

        public string Description => "";

        public PagedResponse<AddressDTO> Execute(AddressesSearch search)
        {
            IQueryable<Address> query = Context.Addresses
                .Where(x => x.IsActive && x.DeletedAt == null);


            if (!string.IsNullOrEmpty(search.StreetAddress))
            {
                var streetTermSearch = search.StreetAddress.ToLower();
                query = query.Where(a => a.StreetAddress.ToLower().Contains(streetTermSearch));
            }

            if (!string.IsNullOrEmpty(search.City))
            {
                var cityTermSearch = search.City.ToLower();
                query = query.Where(a => a.City.ToLower().Contains(cityTermSearch));
            }

            if (search.PostalCode != 0)
            {
                var postaCodeTermSearch = search.PostalCode;
                query = query.Where(a => a.PostalCode == search.PostalCode);
            }

            IEnumerable<AddressDTO> result = query.Select(a => new AddressDTO
            {
                City = a.City,
                PostalCode = a.PostalCode,
                StreetAddress = a.StreetAddress
            }).ToList();

            return query.ToPagedResponse(search, a => new AddressDTO
            {
                City = a.City,
                PostalCode = a.PostalCode,
                StreetAddress = a.StreetAddress
            });
        }
    }
}
