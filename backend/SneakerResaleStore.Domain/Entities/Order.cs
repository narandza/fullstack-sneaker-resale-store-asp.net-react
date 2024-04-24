using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SneakerResaleStore.Domain.Entities
{
    public class Order : Entity
    {
        public int UserId { get; set; }
        public string DiscountCode { get; set; }
        public PaymentStatus PaymentStatus { get; set; }
        public PaymentMethod PaymentMethod { get; set; }
        public OrderStatus OrderStatus { get; set; }

        public virtual User User { get; set; }
        public virtual ICollection<OrderItem> Items { get; set; }
    }
}
