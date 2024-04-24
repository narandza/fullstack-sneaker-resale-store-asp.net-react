using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SneakerResaleStore.Domain.Entities
{
    public class Favorite  : Entity
    {
        public int SneakerId { get; set; }
        public int UserId { get; set; }

        public virtual Sneaker Sneaker { get; set; } 
        public virtual User User{ get; set; } 
    }
}
