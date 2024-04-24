using SneakerResaleStore.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SneakerResaleStore.Application.UseCases.DTO
{
    public class CreateTicketDTO
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public TicketStatus Status { get; set; } = TicketStatus.Open;

    }
}
