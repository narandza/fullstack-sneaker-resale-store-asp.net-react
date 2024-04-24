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
    public class EfCreateOrderCommand : EfUseCase, ICreateOrderCommand
    {
        private readonly IApplicationActor _actor;
        private readonly CreateOrderValidator _validator;
        public EfCreateOrderCommand(SneakerResaleStoreContext context, IApplicationActor actor, CreateOrderValidator validator)
            : base(context)
        {
            _actor = actor;
            _validator = validator;
        }

        public int Id => 73;

        public string Name => "Create an order";

        public string Description => "";

        public void Execute(CreateOrderDTO request)
        {
            _validator.ValidateAndThrow(request);

            Order order = new Order
            {
                UserId = _actor.Id,
                PaymentMethod = request.PaymentMethod,
                Items = request.Items.Select(item => new OrderItem
                {
                    SneakerId = item.SneakerId,
                   
                }).ToList()
            };

            Context.Orders.Add(order);
            Context.SaveChanges();
        }
    }
}
