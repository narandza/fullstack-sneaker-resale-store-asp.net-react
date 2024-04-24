using Microsoft.EntityFrameworkCore;
using SneakerResaleStore.Application.Exceptions;
using SneakerResaleStore.Application.UseCases.DTO;
using SneakerResaleStore.Application.UseCases.Queries;
using SneakerResaleStore.DataAccess;
using SneakerResaleStore.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SneakerResaleStore.Implementation.UseCases.Queries.OrderQueries
{
    public class EfFindOrderQuery : EfUseCase, IFindOrderQuery
    {
        public EfFindOrderQuery(SneakerResaleStoreContext context) : base(context)
        {
        }

        public int Id => 72;

        public string Name => "Find a order";

        public string Description => "";

        public ReadOrderDTO Execute(int search)
        {
            Order order = Context.Orders.Include(o => o.User)
                                        .ThenInclude(u => u.Address)
                                        .Include(o => o.Items)
                                        .ThenInclude(oi => oi.Sneaker)                                     
                                        .ThenInclude(s => s.Images)
                                        .ThenInclude(i => i.Image)
                                        .Include(o => o.Items)
                                        .ThenInclude(oi => oi.Sneaker)
                                        .ThenInclude(s => s.Brand)                                    
                                        .FirstOrDefault(o => o.Id == search);
            if (order == null)
            {
                throw new EntityNotFoundException(search, nameof(Order));
            }

            return new ReadOrderDTO
            {
                Id = order.Id,
                Items = order.Items.Select(item => new OrderItemDTO
                {
                    Price = item.Sneaker.Price,
                    Brand = item.Sneaker.Brand.Name,
                    Model = item.Sneaker.Model,
                    Colorway = item.Sneaker.Colorway,
                    ImagePath = item.Sneaker.Images.FirstOrDefault().Image.Path,
                }),
                User = new OrderUserDTO
                {
                    Name = order.User.FirstName + " " + order.User.LastName,
                    Address = $"{order.User.Address.StreetAddress}, {order.User.Address.City}, {order.User.Address.PostalCode}"
                },
                PaymentStatus = order.PaymentStatus,
                PaymentMethod = order.PaymentMethod,
                OrderStatus = order.OrderStatus,
               CreatedAt = order.CreatedAt,
            };  
        }
    }
}
