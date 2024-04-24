using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SneakerResaleStore.Application.UseCases.DTO
{
    public class ReadRoleDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public IEnumerable<int> RoleUseCases { get; set; }
        public RoleUsersDTO RoleUsers { get; set; }
    }
}
