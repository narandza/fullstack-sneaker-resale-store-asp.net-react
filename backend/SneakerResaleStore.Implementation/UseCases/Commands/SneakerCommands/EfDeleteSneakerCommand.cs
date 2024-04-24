using SneakerResaleStore.Application.Exceptions;
using SneakerResaleStore.Application.UseCases.Commands;
using SneakerResaleStore.DataAccess;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SneakerResaleStore.Implementation.UseCases.Commands.SneakerCommands
{
    public class EfDeleteSneakerCommand : EfUseCase, IDeleteSneakerCommand
    {   

        public EfDeleteSneakerCommand(SneakerResaleStoreContext context)
            : base(context)
        {           
        }

        public int Id => 15;

        public string Name => "Delete a sneaker";

        public string Description => "";

        public void Execute(int request)
        {
            var sneaker = Context.Sneakers.Find(request);

            if (sneaker == null || !sneaker.IsActive || sneaker.DeletedAt.HasValue)
            {
                throw new EntityNotFoundException(request, sneaker.Model + sneaker.Colorway);
            }

            sneaker.DeletedAt = DateTime.UtcNow;
            sneaker.IsActive = false;

            Context.SaveChanges();
        }

    }
}

