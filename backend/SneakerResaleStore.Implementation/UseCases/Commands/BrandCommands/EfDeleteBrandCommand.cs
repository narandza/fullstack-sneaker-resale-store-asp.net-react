using SneakerResaleStore.Application.Exceptions;
using SneakerResaleStore.Application.UseCases.Commands;
using SneakerResaleStore.DataAccess;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SneakerResaleStore.Implementation.UseCases.Commands.BrandCommands
{
    public class EfDeleteBrandCommand : EfUseCase , IDeleteBrandCommand
    {
        public EfDeleteBrandCommand(SneakerResaleStoreContext context) : base(context)
        {
        }

        public int Id => 25;

        public string Name => "Deleta a brand";

        public string Description => "";

        public void Execute(int request)
        {
            var brand = Context.Brands.Find(request);

            if(brand == null || !brand.IsActive || brand.DeletedAt.HasValue)
            {
                throw new EntityNotFoundException(request, nameof(brand));
            }

            brand.DeletedAt = DateTime.UtcNow;
            brand.IsActive = false;

            Context.SaveChanges();
        }
    }
}
