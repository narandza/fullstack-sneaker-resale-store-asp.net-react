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

namespace SneakerResaleStore.Implementation.UseCases.Queries.BrandQueries
{
    public class EfFindBrandQuery : EfUseCase, IFindBrandQuery
    {
        public EfFindBrandQuery(SneakerResaleStoreContext context) : base(context)
        {
        }

        public int Id => 22;

        public string Name => "Find a brand";

        public string Description => "";

        public BrandDTO Execute(int search)
        {
            Brand brand = Context.Brands
                                  .Include(b => b.Logo)
                                  .FirstOrDefault(b => b.Id == search);

            if (brand == null)
            {
                throw new EntityNotFoundException(search, nameof(Brand));
            }

            return new BrandDTO
            {
                Id = brand.Id,
                Name = brand.Name,
                Description = brand.Description,
                Logo = new ImageDTO
                {
                    Id = brand.LogoId,
                    Path = brand.Logo.Path
                }
            };
        }
    }
}
