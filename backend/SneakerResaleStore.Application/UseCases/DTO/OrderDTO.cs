using SneakerResaleStore.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SneakerResaleStore.Application.UseCases.DTO
{
    public class OrderDTO
    {
        public int Id { get; set; }
        public IEnumerable<OrderItemDTO> Items { get; set; }
        public OrderUserDTO User { get; set; }
        public string PaymentStatus { get; set; }
        public string PaymentMethod { get; set; }
        public string OrderStatus { get; set; }
        public DateTime CreatedAt { get; set; }

        public decimal Total => Items?.Sum(item => item.Price) ?? 0; 
    }

    public class OrderUserDTO
    {

        public string Name { get; set; }
        public string Address { get; set; }
    }

    public class OrderItemDTO
    {
        public bool IsActive { get; set; }
       public int Id { get; set; }
        public decimal Price { get; set; }
        public string Brand { get; set; }
        public string Model { get; set; }
        public string Colorway { get; set; }
        public string ImagePath { get; set; }

    }
}
