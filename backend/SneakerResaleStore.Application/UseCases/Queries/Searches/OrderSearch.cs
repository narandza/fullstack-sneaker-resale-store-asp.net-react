using SneakerResaleStore.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SneakerResaleStore.Application.UseCases.Queries.Searches
{
    public class OrderSearch : PagedSearch
    {
        public string Email { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        public string Sneaker { get; set; }
        public string PaymentMethod { get; set; }
        public string PaymentStatus { get; set; }
        public string OrderStatus { get; set; }
        public DateTime? CreatedFrom { get; set; }
        public DateTime? CreatedTo { get; set; }
        public decimal? TotalPriceFrom { get; set; }
        public decimal? TotalPriceTo { get; set; }
    }
}
