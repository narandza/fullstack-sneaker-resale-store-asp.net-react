using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SneakerResaleStore.Application.UseCases.Queries.Searches
{
    public class AddressesSearch : PagedSearch
    {
        public string StreetAddress { get; set; }
        public string City { get; set; }
        public int PostalCode { get; set; }

        public int UserId { get; set; }
    }
}
