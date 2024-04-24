using SneakerResaleStore.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SneakerResaleStore.Application.UseCases.DTO
{
    public class UpdateOrderDTO
    {
        public int Id { get; set; }
        public List<CreateOrderItemDTO> Items {get;set;}
        public PaymentMethod PaymentMethod { get;set;} 
        public PaymentStatus PaymentStatus { get;set;}
        public OrderStatus OrderStatus { get;set;}

    }
}
    