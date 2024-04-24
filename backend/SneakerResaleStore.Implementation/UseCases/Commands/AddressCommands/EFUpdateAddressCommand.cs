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

namespace SneakerResaleStore.Implementation.UseCases.Commands.AddressCommands
{
    public class EFUpdateAddressCommand : EfUseCase ,IUpdateAddressCommand
    {
        private readonly UpdateAddressValidator _validator;

        public EFUpdateAddressCommand(SneakerResaleStoreContext context, UpdateAddressValidator validator)
            :base(context)
        {
            _validator = validator;
        }
        public int Id => 34;

        public string Name => "Update an address";

        public string Description => "";

        public void Execute(UpdateAddressDTO request)
        {
            _validator.ValidateAndThrow(request);

            var existingAddress = Context.Addresses.FirstOrDefault(a => a.Id == request.Id);

            if(existingAddress != null)
            {
                existingAddress.StreetAddress = request.StreetAddress;
                existingAddress.City = request.City;
                existingAddress.PostalCode = request.PostalCode;
                existingAddress.ModifiedAt = DateTime.UtcNow;

                Context.Entry(existingAddress).State = EntityState.Modified;
                Context.SaveChanges();
            }
        }
    }
}
