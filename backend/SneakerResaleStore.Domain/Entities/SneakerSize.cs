using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SneakerResaleStore.Domain.Entities
{
    public class SneakerSize
    {
        public int SneakerId { get; set; }
        public int SizeId { get; set; }

        public virtual  Sneaker Sneaker { get; set; } 
        public virtual Size Size { get; set; } 
    }
}
