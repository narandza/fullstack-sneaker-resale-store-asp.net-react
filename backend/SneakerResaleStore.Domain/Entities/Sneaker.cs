using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SneakerResaleStore.Domain.Entities
{
    public class Sneaker : Entity
    {
        public string Model { get; set; }
        public string Colorway { get; set; }
        public decimal Price { get; set; }
        public string Description { get; set; }
        public DateTime ReleaseDate { get; set; }
        public int BrandId { get; set; }

        public virtual Brand Brand { get; set; }
        public virtual ICollection<SneakerImage> Images { get; set; } = new HashSet<SneakerImage>();
        public virtual ICollection<Favorite> Favorites { get; set; } = new HashSet<Favorite>();
        public virtual ICollection<OrderItem> OrderItems { get; set; } = new HashSet<OrderItem>();
        public virtual ICollection<SneakerSize> Sizes { get; set; } = new HashSet<SneakerSize>();
    }
}
