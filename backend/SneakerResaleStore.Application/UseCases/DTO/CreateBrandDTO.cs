using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SneakerResaleStore.Application.UseCases.DTO
{
    public class CreateBrandDTO
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public string LogoPath { get; set; }
    }
}
