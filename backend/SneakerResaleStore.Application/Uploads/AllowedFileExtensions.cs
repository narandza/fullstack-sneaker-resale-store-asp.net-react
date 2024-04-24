using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SneakerResaleStore.Application.Uploads
{
    public class AllowedFileExtensions
    {
        public IEnumerable<string> Extensions => new List<string>
        {
            "jpg", "jpeg", "png"
        };
    }
}
