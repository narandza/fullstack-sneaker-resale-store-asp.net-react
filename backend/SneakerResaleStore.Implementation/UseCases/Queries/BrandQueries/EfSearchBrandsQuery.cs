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

namespace SneakerResaleStore.Implementation.UseCases.Queries.BrandQueries
{
    public class EfSearchBrandsQuery : EfUseCase, ISearchBrandsQuery
    {
        public EfSearchBrandsQuery(SneakerResaleStoreContext context) : base(context)
        {
        }

        public int Id => 21;

        public string Name => "Search Brands";

        public string Description => "";

        public PagedResponse<BrandDTO> Execute(BrandSearch search)
        {
            IQueryable<Brand> query = Context.Brands.Where(x => x.IsActive &&
                                                x.DeletedAt == null);

            if (!string.IsNullOrEmpty(search.Name))
            {
                string nameSearchTerm = search.Name.ToLower();
                query = query.Where(s => s.Name.ToLower().Contains(nameSearchTerm));
            }



            return query.ToPagedResponse(search, x => new BrandDTO
            {
                Id = x.Id,
                Name = x.Name,
                Description = x.Description,
                Logo = new ImageDTO
                {
                    Id = x.LogoId,
                    Path = x.Logo.Path
                }
            });
        }
    }
}
