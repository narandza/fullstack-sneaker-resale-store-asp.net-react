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

namespace SneakerResaleStore.Implementation.UseCases.Queries.AddressQueries
{
    public class EfFindAddressQuery : EfUseCase, IFindAddressQuery
    {
        public EfFindAddressQuery(SneakerResaleStoreContext context) : base(context)
        {
        }

        public int Id => 32;

        public string Name => "Find an address";

        public string Description => "";

        public ReadAddressDTO Execute(int search)
        {
            Address address = Context.Addresses.FirstOrDefault(a => a.Id == search);

            if (address == null)
            {
                throw new EntityNotFoundException(search, nameof(Address));
            }

            return new ReadAddressDTO
            {
                Id = address.Id,
                StreetAddress = address.StreetAddress,
                City = address.City,
                PostalCode = address.PostalCode
            };
        }
    }
}
