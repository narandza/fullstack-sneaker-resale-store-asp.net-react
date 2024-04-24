using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SneakerResaleStore.Domain.Entities
{
    public enum OrderStatus
    {
        Pending,
        Created,
        Completed,
        Shipped,
        Canceled,
        Refunded,
    }
}
