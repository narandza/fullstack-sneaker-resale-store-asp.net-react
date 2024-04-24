using SneakerResaleStore.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SneakerResaleStore.Application.UseCases.DTO
{
    public class UpdateTicketDTO
    {
        public int Id { get; set; }
        public TicketStatus Status { get; set; }
    }
}
