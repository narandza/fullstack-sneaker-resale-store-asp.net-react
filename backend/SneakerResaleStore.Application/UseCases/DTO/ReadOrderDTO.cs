using SneakerResaleStore.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SneakerResaleStore.Application.UseCases.DTO
{
    public class ReadOrderDTO
    {
        public int Id { get; set; }
        public IEnumerable<OrderItemDTO> Items { get; set; }
        public OrderUserDTO User { get; set; }
        public PaymentStatus PaymentStatus { get; set; }
        public PaymentMethod PaymentMethod { get; set; }
        public OrderStatus OrderStatus { get; set; }

        public DateTime CreatedAt { get; set; }

        public decimal Total => Items?.Sum(item => item.Price) ?? 0;
    }
}
