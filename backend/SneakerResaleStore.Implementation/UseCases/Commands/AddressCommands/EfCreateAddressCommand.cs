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

namespace SneakerResaleStore.Implementation.UseCases.Commands.AddressCommands
{
    public class EfCreateAddressCommand : EfUseCase, ICreateAddressCommand
    {
        private readonly CreateAddressValidator _validator;

        public EfCreateAddressCommand(SneakerResaleStoreContext context, CreateAddressValidator validator)
            :base(context)
        {
            _validator = validator;
        }
        public int Id => 33;

        public string Name =>"Create an address";

        public string Description => "";

        public void Execute(CreateAddressDTO request)
        {
            _validator.ValidateAndThrow(request);

            Address address = new Address();
            address.StreetAddress = request.StreetAddress;
            address.City = request.City;
            address.PostalCode = request.PostalCode;

            Context.Addresses.Add(address);
            Context.SaveChanges();
        }
    }
}
