using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SneakerResaleStore.Domain.Entities
{
    public class Address : Entity
    {
        public string StreetAddress { get; set; }
        public string City { get; set; }
        public int PostalCode { get; set; }
        
    }
}
