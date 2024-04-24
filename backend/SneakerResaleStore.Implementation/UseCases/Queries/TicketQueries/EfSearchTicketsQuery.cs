using Microsoft.EntityFrameworkCore;
using SneakerResaleStore.Application.UseCases.DTO;
using SneakerResaleStore.Application.UseCases.Queries;
using SneakerResaleStore.Application.UseCases.Queries.Searches;
using SneakerResaleStore.DataAccess;
using SneakerResaleStore.Domain.Entities;
using SneakerResaleStore.Implementation.Extensions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SneakerResaleStore.Implementation.UseCases.Queries.TicketQueries
{
    public class EfSearchTicketsQuery : EfUseCase, ISearchTicketsQuery
    {
        public EfSearchTicketsQuery(SneakerResaleStoreContext context)
            : base(context)
        {
        }

        public int Id => 91;

        public string Name => "Search tickets";

        public string Description => "";

        public PagedResponse<GetTicketsDTO> Execute(TicketsSearch search)
        {
            IQueryable<Ticket> tickets = Context.Tickets
                                                 .Include(t => t.User)
                                                 .Where(t => t.IsActive && t.DeletedAt == null);

            if (!string.IsNullOrEmpty(search.Title))
            {
                tickets = tickets.Where(t => t.Title.ToLower().Contains(search.Title.ToLower()));
            }

            if (!string.IsNullOrEmpty(search.UserEmail))
            {
                tickets = tickets.Where(t => t.User.Email == search.UserEmail);
            }

            if (!string.IsNullOrEmpty(search.UserName))
            {
                var nameSearchTerm = search.UserName.ToLower();
                tickets = tickets.Where(t => t.User.FirstName.ToLower().Contains(nameSearchTerm) ||
                                             t.User.LastName.ToLower().Contains(nameSearchTerm));
            }

            if (!string.IsNullOrEmpty(search.Status))
            {
                if (Enum.TryParse<TicketStatus>(search.Status, out var ticketStatus))
                {
                    tickets = tickets.Where(t => t.Status == ticketStatus);
                }
            }

            if (search.CreatedFrom.HasValue)
            {
                tickets = tickets.Where(o => o.CreatedAt >= search.CreatedFrom.Value);
            }

            if (search.CreatedTo.HasValue)
            {
                tickets = tickets.Where(o => o.CreatedAt <= search.CreatedTo.Value);
            }

            return tickets.ToPagedResponse(search, x => new GetTicketsDTO
            {
                Id = x.Id,
                Title = x.Title,
                Description = x.Description,
                User = new TicketSenderDTO
                {
                    Email = x.User.Email,
                    FirstName = x.User.FirstName,
                    LastName = x.User.LastName
                },
                Status = x.Status.ToString()
            }) ;
        }
    }
}
