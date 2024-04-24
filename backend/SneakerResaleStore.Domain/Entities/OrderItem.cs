using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SneakerResaleStore.Domain.Entities
{
    public class OrderItem : Entity
    {
        public int OrderId { get; set; }
        public int SneakerId { get; set; }  

        public virtual Order Order { get; set; }
        public virtual Sneaker Sneaker { get; set; }
    }
}
