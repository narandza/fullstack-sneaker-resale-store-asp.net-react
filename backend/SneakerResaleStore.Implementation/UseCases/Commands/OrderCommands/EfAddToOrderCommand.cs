using FluentValidation;
using SneakerResaleStore.Application;
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

namespace SneakerResaleStore.Implementation.UseCases.Commands.OrderCommands
{
    public class EfAddToOrderCommand : EfUseCase, IAddToOrderCommand
    {
        private readonly IApplicationActor _actor;
        private readonly AddOrderItemValidator _validator;
        public EfAddToOrderCommand(SneakerResaleStoreContext context, IApplicationActor actor, AddOrderItemValidator validator)
            : base(context)
        {
            _actor = actor;
            _validator = validator;
        }

        public int Id => 83;

        public string Name => "Add Item to an Order";

        public string Description => "";

        public void Execute(AddOrderItemDTO request)
        {
            _validator.ValidateAndThrow(request);


            Order order = Context.Orders.FirstOrDefault(o => o.UserId == _actor.Id
                                                        && o.OrderStatus == OrderStatus.Pending);

            if (order == null)
            {
                order = new Order
                {
                    UserId = _actor.Id,
                    OrderStatus = OrderStatus.Pending,
                    Items = new List<OrderItem>()
                };

                OrderItem orderItem = new OrderItem
                {
                    Order = order,
                    SneakerId = request.SneakerId
                };

                order.Items.Add(orderItem);

                Context.Orders.Add(order);
            }
            else
            {
                OrderItem orderItem = new OrderItem
                {
                    Order = order,
                    SneakerId = request.SneakerId
                };

                Context.OrderItems.Add(orderItem);
            }
            Context.SaveChanges();
        }
    }
}


