using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SneakerResaleStore.Application.UseCases.DTO
{
    public class FavoritesDTO
    {
        public int Id { get; set; }
        public int SneakerId { get; set; }
        public string SneakerImage { get; set; }
        public string Model { get; set; }
        public string Colorway { get; set; }
        public string Brand { get; set; }
    }
}
