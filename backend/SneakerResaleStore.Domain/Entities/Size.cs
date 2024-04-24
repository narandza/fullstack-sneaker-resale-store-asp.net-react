using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SneakerResaleStore.Domain.Entities
{
    public class Size : Entity
    {
        public string Number { get; set; }

        public virtual ICollection<SneakerSize> SneakerSizes { get; set; } = new HashSet<SneakerSize>();
    }
}
