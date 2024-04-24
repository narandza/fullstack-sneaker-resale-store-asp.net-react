using SneakerResaleStore.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SneakerResaleStore.Application.UseCases.DTO
{
    public class CreateOrderDTO
    {
        public PaymentMethod PaymentMethod { get; set; }
        public PaymentStatus PaymentStatus { get; set; } = PaymentStatus.Pending;
        public OrderStatus OrderStatus { get; set; } = OrderStatus.Pending;
        public List<CreateOrderItemDTO> Items { get; set; }

    }

    public class CreateOrderItemDTO
    {
        public int SneakerId { get; set; }
    }
}
