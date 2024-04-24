using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SneakerResaleStore.Application.UseCases.Queries.Searches
{
    public class BrandSearch : PagedSearch
    {
        public string Name { get; set; }
    }
}
