using Microsoft.EntityFrameworkCore;
using SneakerResaleStore.Application.UseCases.DTO;
using SneakerResaleStore.Application.UseCases.Queries;
using SneakerResaleStore.Application.UseCases.Queries.Searches;
using SneakerResaleStore.DataAccess;
using SneakerResaleStore.Domain.Entities;
using SneakerResaleStore.Implementation.Extensions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SneakerResaleStore.Implementation.UseCases.Queries.SneakerQueries
{
    public class EfSearchSneakersQuery : EfUseCase, ISearchSneakersQuery
    {
        public EfSearchSneakersQuery(SneakerResaleStoreContext context) : base(context)
        {
        }

        public int Id => 11;

        public string Name => "Search sneakers";

        public string Description => "";

        public PagedResponse<SneakerDTO> Execute(SneakerSearch search)
        {
            IQueryable<Sneaker> query = Context.Sneakers
                                .Include(x => x.Brand)
                                .Include(x => x.Sizes)
                                .ThenInclude(x => x.Size)
                                .Where(x => x.IsActive &&
                                             x.DeletedAt == null);

            if (!string.IsNullOrEmpty(search.Brand))
            {
                query = query.Where(s => s.Brand.Name.ToLower() == search.Brand.ToLower());
            }

          if (!string.IsNullOrEmpty(search.Brands))
{
    var brandNames = search.Brands.Split(',');
    var lowerCaseBrandNames = brandNames.Select(brand => brand.ToLower().Trim());
    query = query.Where(s => lowerCaseBrandNames.Contains(s.Brand.Name.ToLower()));
}


            if (search.PriceFrom.HasValue)
            {
                query = query.Where(x => x.Price >= search.PriceFrom.Value);
            }

            if (search.PriceTo.HasValue)
            {
                query = query.Where(x => x.Price <= search.PriceTo.Value);
            }

            if (search.ReleaseDateFrom.HasValue)
            {
                query = query.Where(x => x.ReleaseDate >= search.ReleaseDateFrom.Value);
            }

            if (search.ReleaseDateTo.HasValue)
            {
                query = query.Where(x => x.ReleaseDate <= search.ReleaseDateTo.Value);
            }

            if (!string.IsNullOrEmpty(search.Model))
            {
                string modelSearchTerm = search.Model.ToLower();
                query = query.Where(x => x.Model.ToLower().Contains(modelSearchTerm));
            }

            if (!string.IsNullOrEmpty(search.Colorway))
            {
                string colorwaySearchTerm = search.Colorway.ToLower();
                query = query.Where(x => x.Colorway.ToLower().Contains(colorwaySearchTerm));
            }

            if (!string.IsNullOrEmpty(search.Sizes))
            {
                var sizes = search.Sizes.Split(',');

                query = query.Where(x => x.Sizes.Any(ss => sizes.Contains(ss.Size.Number)));
            }


            if (!string.IsNullOrEmpty(search.Q))
            {
                string searchTerm = search.Q.ToLower();
                query = query.Where(x =>
                    x.Model.ToLower().Contains(searchTerm) ||
                    x.Brand.Name.ToLower().Contains(searchTerm) ||
                    x.Colorway.ToLower().Contains(searchTerm)
                );
            }

            switch (search.Sort)
            {
                case SortOption.Newest:
                    query = query.OrderByDescending(x => x.ReleaseDate);
                    break;
                case SortOption.PriceAscending:
                    query = query.OrderBy(x => x.Price);
                    break;
                case SortOption.PriceDescending:
                    query = query.OrderByDescending(x => x.Price);
                    break;
                default:
                    break;
            }


            return query.ToPagedResponse(search, x => new SneakerDTO
            {
                Id = x.Id,
                Model = x.Model,
                Colorway = x.Colorway,
                Price = x.Price,
                ReleaseDate = x.ReleaseDate,
                CreatedAt = x.CreatedAt,
                Description = x.Description,
                Brand = new BrandDTO
                {
                    Id = x.BrandId,
                    Name = x.Brand.Name,
                    Description = x.Brand.Description,
                    Logo = new ImageDTO
                    {
                        Id = x.Brand.LogoId,
                        Path = x.Brand.Logo.Path
                    }
                },
                Images = x.Images.Select(i => new ImageDTO
                {
                    Id = i.ImageId,
                    Path = i.Image.Path
                }),
                Sizes = x.Sizes.Select(s => new SizeDTO
                {
                    Id = s.SizeId,
                    Number = s.Size.Number
                })
            });
        }
    }
}
