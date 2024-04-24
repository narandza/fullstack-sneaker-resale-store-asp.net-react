using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SneakerResaleStore.Application.UseCases.Queries.Searches
{
    public class TicketsSearch : PagedSearch
    {
        public string Title { get; set; }
        public string UserEmail { get; set; }
        public string UserName { get; set; }
        public string Status { get; set; }
        public DateTime? CreatedFrom { get; set; }
        public DateTime? CreatedTo { get; set; }
    }
}
