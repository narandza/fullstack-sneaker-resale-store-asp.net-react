using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SneakerResaleStore.Domain.Entities
{
    public class SneakerImage
    {
        public int SneakerId { get; set; }
        public int ImageId { get; set; }

        public virtual Sneaker Sneaker { get; set; }
        public virtual Image Image { get; set; }
    }
}
