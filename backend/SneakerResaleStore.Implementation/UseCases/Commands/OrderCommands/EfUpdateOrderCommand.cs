using FluentValidation;
using Microsoft.EntityFrameworkCore;
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
    public class EfUpdateOrderCommand : EfUseCase, IUpdateOrderCommand
    {
        private readonly UpdateOrderValidator _validator;
        public EfUpdateOrderCommand(SneakerResaleStoreContext context, UpdateOrderValidator validator) : base(context)
        {
            _validator = validator;
        }

        public int Id => 74;

        public string Name => "Update an order";

        public string Description => "";

        public void Execute(UpdateOrderDTO   request)
        {
            _validator.ValidateAndThrow(request);

            var existingOrder = Context.Orders.FirstOrDefault(o => o.Id == request.Id);

            if (existingOrder != null)
            {
                existingOrder.PaymentMethod = request.PaymentMethod;
                existingOrder.PaymentStatus = request.PaymentStatus;
                existingOrder.OrderStatus = request.OrderStatus;
                existingOrder.ModifiedAt = DateTime.UtcNow;

                Context.Entry(existingOrder).State = EntityState.Modified;
                Context.SaveChanges();
            }
        }
    }
}
