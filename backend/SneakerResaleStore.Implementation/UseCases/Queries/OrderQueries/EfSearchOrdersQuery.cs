using Microsoft.EntityFrameworkCore;
using SneakerResaleStore.Application.UseCases.DTO;
using SneakerResaleStore.Application.UseCases.Queries;
using SneakerResaleStore.Application.UseCases.Queries.Searches;
using SneakerResaleStore.DataAccess;
using SneakerResaleStore.Domain.Entities;
using SneakerResaleStore.Implementation.Extensions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SneakerResaleStore.Implementation.UseCases.Queries.OrderQueries
{
    public class EfSearchOrdersQuery : EfUseCase, ISearchOrdersQuery
    {
        public EfSearchOrdersQuery(SneakerResaleStoreContext context)
            : base(context)
        {
        }

        public int Id => 71;

        public string Name => "Search orders";

        public string Description => "";

        public PagedResponse<OrderDTO> Execute(OrderSearch search)
        {
            IQueryable<Order> query = Context.Orders
                                             .Include(o => o.Items.Where(i => i.IsActive && i.DeletedAt == null))
                                             .ThenInclude(oi => oi.Sneaker)                                         
                                             .ThenInclude(s => s.Brand)
                                             .Include(o => o.User)
                                             .ThenInclude(u => u.Address)
                                             .Where(o => o.IsActive && o.DeletedAt == null);

         

            if (!string.IsNullOrEmpty(search.Email))
            {
                query = query.Where(o => o.User.Email.ToLower().Contains(search.Email));
            }

            if (!string.IsNullOrEmpty(search.Name))
            {
                string nameSearchTerm = search.Name.ToLower();
                query = query.Where(o => o.User.FirstName.ToLower().Contains(nameSearchTerm) ||
                                         o.User.LastName.ToLower().Contains(nameSearchTerm));
            }

            if (!string.IsNullOrEmpty(search.Address))
            {
                string addressSearchTerm = search.Address.ToLower();
                query = query.Where(o => o.User.Address.StreetAddress.ToLower().Contains(addressSearchTerm) ||
                                         o.User.Address.City.ToLower().Contains(addressSearchTerm) ||
                                         o.User.Address.PostalCode.ToString().Contains(addressSearchTerm));
            }

            if (!string.IsNullOrEmpty(search.Sneaker))
            {
                string sneakerSearchTerm = search.Sneaker.ToLower();
                query = query.Where(o => o.Items.Any
                                                (oi => oi.Sneaker.Brand.Name.ToLower().Contains(sneakerSearchTerm) ||
                                                       oi.Sneaker.Model.ToLower().Contains(sneakerSearchTerm) ||
                                                       oi.Sneaker.Colorway.ToLower().Contains(sneakerSearchTerm)));
            }

            if (!string.IsNullOrEmpty(search.PaymentMethod))
            {
                if (Enum.TryParse<PaymentMethod>(search.PaymentMethod, out var paymentMethod))
                {
                    query = query.Where(o => o.PaymentMethod == paymentMethod);
                }
            }

            if (!string.IsNullOrEmpty(search.PaymentStatus))
            {
                if (Enum.TryParse<PaymentMethod>(search.PaymentStatus, out var paymentStatus))
                {
                    query = query.Where(o => o.PaymentMethod == paymentStatus);
                }
            }

            if(!string.IsNullOrEmpty(search.OrderStatus))
            {
                if(Enum.TryParse<OrderStatus>(search.OrderStatus, out var orderStatus))
                {
                    query = query.Where(o => o.OrderStatus == orderStatus);
                }
            }

            if (search.CreatedFrom.HasValue)
            {
                query = query.Where(o => o.CreatedAt >= search.CreatedFrom.Value);
            }

            if (search.CreatedTo.HasValue)
            {
                query = query.Where(o => o.CreatedAt <= search.CreatedTo.Value);
            }

            if (search.TotalPriceFrom.HasValue)
            {
                query = query.Where(o => o.Items.Any(item => item.Sneaker.Price >= search.TotalPriceFrom.Value));
            }

            if (search.TotalPriceTo.HasValue)
            {
                query = query.Where(o => o.Items.Any(item => item.Sneaker.Price <= search.TotalPriceFrom.Value));
            }



            return query.ToPagedResponse(search, x => new OrderDTO
            {
                Id = x.Id,
                Items = x.Items.Select(item => new OrderItemDTO
                {
                    IsActive = item.IsActive,
                    Id = item.Sneaker.Id,
                    Price = item.Sneaker.Price,
                    Brand = item.Sneaker.Brand.Name,
                    Model = item.Sneaker.Model,
                    Colorway = item.Sneaker.Colorway,
                    ImagePath = item.Sneaker.Images.FirstOrDefault().Image.Path,
        }),
                User = new OrderUserDTO
                {

                    Name = x.User.FirstName + " " + x.User.LastName,
                    Address = $"{x.User.Address.StreetAddress}, {x.User.Address.City}, {x.User.Address.PostalCode}"
                },
                PaymentStatus = x.PaymentStatus.ToString(),
                PaymentMethod = x.PaymentMethod.ToString(),
                OrderStatus = x.OrderStatus.ToString(),
                CreatedAt = x.CreatedAt
            }); ; ;   
        }
    }
}

