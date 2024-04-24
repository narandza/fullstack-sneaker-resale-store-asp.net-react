using SneakerResaleStore.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SneakerResaleStore.Application.UseCases.Queries.Searches
{
    public class SneakerSearch : PagedSearch
    {
        public string Brand { get; set; }

        public string Brands { get; set; }
        public decimal? PriceFrom { get; set; }
        public decimal? PriceTo { get; set; }
        public  DateTime? ReleaseDateFrom { get; set; }
        public  DateTime? ReleaseDateTo { get; set; }
        public string Model { get; set; }
        public string Colorway { get; set; }
        public string Sizes { get; set; }
        public string Q { get; set; }
        public SortOption Sort { get; set; }
    }
}
