using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SneakerResaleStore.Application.UseCases.DTO
{
    public class CreateRoleDTO
    {
        public string Name { get; set; }
        public IEnumerable<int> RoleUseCaseIds { get; set; }
    }
}
