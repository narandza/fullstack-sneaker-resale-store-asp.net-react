using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SneakerResaleStore.Application.UseCases.DTO
{
    public class SneakerDTO
    {
        public int Id { get; set; }
        public string Model { get; set; }
        public string Colorway { get; set; }    
        public decimal Price { get; set; }
        public string Description { get; set; }
        public DateTime ReleaseDate { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime? Modified { get; set; }

   
        public BrandDTO Brand { get; set; }
        public IEnumerable<ImageDTO> Images { get; set; }
        public IEnumerable<SizeDTO> Sizes { get; set; }

    }

    public class SizeDTO
    {
        public int Id { get; set; }
        public string Number { get; set; }
    }

    public class BrandDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public ImageDTO Logo { get; set; }
    
    }

    public class ImageDTO
    {
        public int Id { get; set; }
        public string Path { get; set; }
        public string Extension
        {
            get
            {
                if (string.IsNullOrEmpty(Path))
                {
                    return "Unknown";
                }

                if (!Path.Contains("."))
                {
                    return "Unkown";
                }
                var extension = Path.Split(".")[1].ToLower();

                if (AllowedImageTypes.Contains(extension)){
                    return extension;
                }

                return "Unknown";
            }
        }

        private IEnumerable<string> AllowedImageTypes = new List<string>
        {
            "jpg", "jpeg", "png"
        };
    }
}
