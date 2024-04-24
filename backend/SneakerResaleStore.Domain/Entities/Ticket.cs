using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SneakerResaleStore.Domain.Entities
{
    public class Ticket : Entity
    {
        public int UserId { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public TicketStatus Status { get; set; } 

        public virtual User User { get; set; } 
        public virtual ICollection<TicketMessage> TicketMessages { get; set; } = new HashSet<TicketMessage>();
    }
}
