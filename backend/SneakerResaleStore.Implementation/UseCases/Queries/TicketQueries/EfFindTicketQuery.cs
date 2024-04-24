using Microsoft.EntityFrameworkCore;
using SneakerResaleStore.Application.Exceptions;
using SneakerResaleStore.Application.UseCases;
using SneakerResaleStore.Application.UseCases.DTO;
using SneakerResaleStore.Application.UseCases.Queries;
using SneakerResaleStore.DataAccess;
using SneakerResaleStore.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SneakerResaleStore.Implementation.UseCases.Queries.TicketQueries
{
    public class EfFindTicketQuery : EfUseCase, IFindTicketQuery
    {
        public EfFindTicketQuery(SneakerResaleStoreContext context) : base(context)
        {
        }

        public int Id => 92;

        public string Name => "Find a ticket";

        public string Description => "";

        public ReadTicketDTO Execute(int search)
        {
            Ticket ticket = Context.Tickets.Include(t => t.User)
                                    .FirstOrDefault(t => t.Id == search);

            if (ticket == null)
            {
                throw new EntityNotFoundException(search, nameof(Ticket));
            }

            return new ReadTicketDTO
            {
                Id = ticket.Id,
                Title = ticket.Title,
                Description = ticket.Description,
                User = new TicketSenderDTO
                {
                    Email = ticket.User.Email,
                    LastName = ticket.User.LastName,
                    FirstName = ticket.User.FirstName,
                },
                Status = ticket.Status.ToString()
            };
        }
    }
}
