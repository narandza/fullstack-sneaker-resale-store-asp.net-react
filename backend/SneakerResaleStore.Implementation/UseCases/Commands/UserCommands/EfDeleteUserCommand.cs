using SneakerResaleStore.Application.Exceptions;
using SneakerResaleStore.Application.UseCases.Commands;
using SneakerResaleStore.DataAccess;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SneakerResaleStore.Implementation.UseCases.Commands.UserCommands
{
    public class EfDeleteUserCommand : EfUseCase, IDeleteUserCommand
    {
        public EfDeleteUserCommand(SneakerResaleStoreContext context) : base(context)
        {
        }

        public int Id => 45;

        public string Name => "Delete a user";

        public string Description => "";

        public void Execute(int request)
        {
            var user = Context.Users.Find(request);

            if(user == null || !user.IsActive || user.DeletedAt.HasValue)
            {
                throw new EntityNotFoundException(request, nameof(user));
            }
            user.DeletedAt = DateTime.UtcNow;
            user.IsActive = false;

            Context.SaveChanges();
        }
    }
}
