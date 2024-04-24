using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SneakerResaleStore.Domain.Entities
{
    public class Brand : Entity
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public int LogoId { get; set; }

        public virtual Image Logo { get; set; }
        public virtual ICollection<Sneaker> Sneakers { get; set; } = new HashSet<Sneaker>();
    }
}
