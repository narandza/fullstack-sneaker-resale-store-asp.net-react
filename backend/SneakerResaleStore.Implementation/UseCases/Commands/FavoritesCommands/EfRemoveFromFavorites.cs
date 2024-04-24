using SneakerResaleStore.Application.Exceptions;
using SneakerResaleStore.Application.UseCases.Commands;
using SneakerResaleStore.DataAccess;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SneakerResaleStore.Implementation.UseCases.Commands.FavoritesCommands
{
    public class EfRemoveFromFavorites : EfUseCase, IRemoveFromFavorites
    {
        public EfRemoveFromFavorites(SneakerResaleStoreContext context) : base(context)
        {
        }

        public int Id => 65;

        public string Name => "Remove from Favorites";

        public string Description => "";

        public void Execute(int request)
        {
            var favorite = Context.Favorites.FirstOrDefault(fav => fav.SneakerId == request);

            Context.Remove(favorite);
            Context.SaveChanges();
        }
    }
}
