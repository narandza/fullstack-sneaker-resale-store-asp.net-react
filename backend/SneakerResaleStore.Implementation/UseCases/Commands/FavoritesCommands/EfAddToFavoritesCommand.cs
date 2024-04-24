using FluentValidation;
using SneakerResaleStore.Application;
using SneakerResaleStore.Application.UseCases.Commands;
using SneakerResaleStore.DataAccess;
using SneakerResaleStore.Domain.Entities;
using SneakerResaleStore.Implementation.Validators;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SneakerResaleStore.Implementation.UseCases.Commands.FavoritesCommands
{
    public class EfAddToFavoritesCommand : EfUseCase, IAddToFavoritesCommand
    {
        private readonly IApplicationActor _actor;
        private readonly AddToFavouritesValidator _validator;
        public EfAddToFavoritesCommand(SneakerResaleStoreContext context, IApplicationActor actor, AddToFavouritesValidator validator) : base(context)
        {
            _actor = actor;
            _validator = validator;
        }

        public int Id => 63;

        public string Name => "Add to Favorites";

        public string Description => "";

        public void Execute(int request)
        {
            _validator.ValidateAndThrow(request);

            Favorite favorite = new Favorite
            {
                SneakerId = request,
                UserId = _actor.Id
            };

            Context.Add(favorite);
            Context.SaveChanges();
        }
    }
}
