using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SneakerResaleStore.Domain.Entities
{
    public class TicketMessage : Entity
    {
        public int TicketId { get; set; }
        public string Message { get; set; }

        public virtual Ticket Ticket { get; set; }
    }
}
