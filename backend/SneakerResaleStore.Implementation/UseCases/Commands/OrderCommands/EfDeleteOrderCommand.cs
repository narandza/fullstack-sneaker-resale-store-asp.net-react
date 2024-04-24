using SneakerResaleStore.Application.Exceptions;
using SneakerResaleStore.Application.UseCases.Commands;
using SneakerResaleStore.DataAccess;
using SneakerResaleStore.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SneakerResaleStore.Implementation.UseCases.Commands.OrderCommands
{
    public class EfDeleteOrderCommand : EfUseCase, IDeleteOrderCommand
    {
        public EfDeleteOrderCommand(SneakerResaleStoreContext context) : base(context)
        {
        }

        public int Id => throw new NotImplementedException();

        public string Name => throw new NotImplementedException();

        public string Description => throw new NotImplementedException();

        public void Execute(int request)
        {
            var order = Context.Orders.Find(request);

            if (order == null || !order.IsActive || order.DeletedAt.HasValue)
            {
                throw new EntityNotFoundException(request, nameof(order));
            }

            order.OrderStatus = OrderStatus.Canceled;
            order.DeletedAt = DateTime.UtcNow;
            order.IsActive = false;

            Context.SaveChanges();
        }
    }
}
