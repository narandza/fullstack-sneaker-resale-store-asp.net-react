using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SneakerResaleStore.Application.UseCases.Queries.Searches
{
    public class UserSearch : PagedSearch
    {
        public string Email { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        
    }
}
