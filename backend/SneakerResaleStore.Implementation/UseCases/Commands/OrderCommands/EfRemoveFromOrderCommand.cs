using Microsoft.EntityFrameworkCore;
using SneakerResaleStore.Application;
using SneakerResaleStore.Application.UseCases.Queries;
using SneakerResaleStore.DataAccess;
using SneakerResaleStore.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SneakerResaleStore.Implementation.UseCases.Commands.OrderCommands
{
    public class EfRemoveFromOrderCommand : EfUseCase, IRemoveFromOrderCommand
    {
        private readonly IApplicationActor _actor;
        public EfRemoveFromOrderCommand(SneakerResaleStoreContext context, IApplicationActor actor)
            : base(context)
        {
            _actor = actor;
        }

        public int Id => 85;

        public string Name => "Remove Item from an Order";

        public string Description => "";

        public void Execute(int request)
        {
            Order order = Context.Orders.Include(o => o.Items)
                                        .FirstOrDefault(o => o.UserId == _actor.Id &&
                                                            o.OrderStatus == OrderStatus.Pending);

            if (order != null)
            {
                OrderItem item = order.Items.FirstOrDefault(i => i.SneakerId == request);

                if (item != null)
                {
                    Context.Remove(item);
                    Context.SaveChanges();
                }
            }
        }
    }
}
