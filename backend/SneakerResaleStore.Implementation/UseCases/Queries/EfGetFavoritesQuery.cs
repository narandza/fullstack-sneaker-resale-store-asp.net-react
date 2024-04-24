using Microsoft.EntityFrameworkCore;
using SneakerResaleStore.Application;
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

namespace SneakerResaleStore.Implementation.UseCases.Queries
{
    public class EfGetFavoritesQuery : EfUseCase, IGetFavoritesQuery
    {
        private readonly IApplicationActor _actor;
        public EfGetFavoritesQuery(SneakerResaleStoreContext context, IApplicationActor actor)
            : base(context)
        {
            _actor = actor;
        }

        public int Id => 61;

        public string Name => "Search favorite sneakers.";

        public string Description => "";

        public PagedResponse<FavoritesDTO> Execute(FavoritesSearch search)
        {
            IQueryable<Favorite> query = Context.Favorites
                                                .Include(f => f.User)
                                                .Include(f => f.Sneaker)
                                                .Where(f => f.UserId == _actor.Id && f.IsActive);

            return query.ToPagedResponse(search, x => new FavoritesDTO
            {
                Id = x.Id,
                SneakerId = x.SneakerId,
                SneakerImage = x.Sneaker.Images.FirstOrDefault().Image.Path,
                Brand = x.Sneaker.Brand.Name,
                Model = x.Sneaker.Model,
                Colorway = x.Sneaker.Colorway
            });
        }
    }
}
