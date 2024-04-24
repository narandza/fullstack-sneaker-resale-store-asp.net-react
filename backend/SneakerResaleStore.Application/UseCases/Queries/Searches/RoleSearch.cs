using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SneakerResaleStore.Application.UseCases.Queries.Searches
{
    public class RoleSearch : PagedSearch
    {
        public string Name { get; set; }
        public int Id { get; set; }
        public int UseCaseId { get; set; }
        public string UserEmail { get; set; }
    }
}
