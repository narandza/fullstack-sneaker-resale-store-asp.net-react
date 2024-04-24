using SneakerResaleStore.Application.Exceptions;
using SneakerResaleStore.Application.UseCases.Commands;
using SneakerResaleStore.DataAccess;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SneakerResaleStore.Implementation.UseCases.Commands.RoleCommands
{
    public class EfDeleteRoleCommand : EfUseCase, IDeleteRoleCommand
    {
        public EfDeleteRoleCommand(SneakerResaleStoreContext context)
            : base(context)
        {
        }

        public int Id => 55;

        public string Name => "Delete a Role";

        public string Description => "";

        public void Execute(int request)
        {
            var role = Context.Roles.Find(request);

            if (role == null || !role.IsActive || role.DeletedAt.HasValue)
            {
                throw new EntityNotFoundException(request, nameof(role));
            }

            role.DeletedAt = DateTime.UtcNow;
            role.IsActive = false;

            Context.SaveChanges();
        }
    }
}
