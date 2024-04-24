using SneakerResaleStore.Application.Exceptions;
using SneakerResaleStore.Application.UseCases.Commands;
using SneakerResaleStore.DataAccess;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SneakerResaleStore.Implementation.UseCases.Commands.AddressCommands
{

    public class EfDeleteAddressCommand : EfUseCase, IDeleteAddressCommand
    {
        public EfDeleteAddressCommand(SneakerResaleStoreContext context)
            : base(context)
        {
           
        }
        public int Id => 35;

        public string Name => "Delete an address";

        public string Description => "";

        public void Execute(int request)
        {
            var address = Context.Addresses.Find(request);

            if(address == null || !address.IsActive || address.DeletedAt.HasValue)
            {
                throw new EntityNotFoundException(request, nameof(address));
            }

            address.DeletedAt = DateTime.UtcNow;
            address.IsActive = false;

            Context.SaveChanges();
        }
    }
}
