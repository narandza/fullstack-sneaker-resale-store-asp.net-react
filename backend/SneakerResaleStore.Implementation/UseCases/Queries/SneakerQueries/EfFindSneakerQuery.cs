using Microsoft.EntityFrameworkCore;
using SneakerResaleStore.Application.Exceptions;
using SneakerResaleStore.Application.UseCases.DTO;
using SneakerResaleStore.Application.UseCases.Queries;
using SneakerResaleStore.DataAccess;
using SneakerResaleStore.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SneakerResaleStore.Implementation.UseCases.Queries.SneakerQueries
{
    public class EfFindSneakerQuery : EfUseCase, IFindSneakerQuery
    {
        public EfFindSneakerQuery(SneakerResaleStoreContext context) : base(context)
        {
        }

        public int Id => 12;

        public string Name => "Find a sneaker by Id";

        public string Description => "";

        public ReadSneakerDTO Execute(int search)
        {
            Sneaker sneaker = Context.Sneakers
                                      .Include(s => s.Brand)
                                      .Include(s => s.Sizes)
                                      .ThenInclude(ss => ss.Size)
                                      .Include(s => s.Images)
                                      .ThenInclude(i => i.Image)
                                      .FirstOrDefault(s => s.Id == search);

            if (sneaker == null)
            {
                throw new EntityNotFoundException(search, nameof(Sneaker));
            }

            return new ReadSneakerDTO
            {
                Id = sneaker.Id,
                Model = sneaker.Model,
                Colorway = sneaker.Colorway,
                Price = sneaker.Price,
                Description = sneaker.Description,
                ReleaseDate = sneaker.ReleaseDate,
                Brand = new ReadBrandDTO
                {
                    Id = sneaker.BrandId,
                    Name = sneaker.Brand.Name
                },
                Sizes = sneaker.Sizes.Select(s => s.Size.Number).ToList(),
                Images = sneaker.Images.Select(i => i.Image.Path).ToList()
            };
        }
    }
}
