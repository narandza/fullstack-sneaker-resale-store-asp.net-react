using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SneakerResaleStore.Application.UseCases.DTO
{
    public class ReadSneakerDTO
    {
        public int Id { get; set; }
        public string Model { get; set; }
        public string Colorway { get; set; }
        public decimal Price { get; set; }
        public string Description { get; set; }
        public DateTime ReleaseDate { get; set; }
        public ReadBrandDTO Brand { get; set; }
        public List<string> Sizes { get; set; }
        public List<string> Images { get; set; }
    }

    public class ReadBrandDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
    }
}
