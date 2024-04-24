using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SneakerResaleStore.Application.UseCases.DTO
{
    public class RoleDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public IEnumerable<int> RoleUseCases { get; set; }
        public RoleUsersDTO RoleUsers { get; set; }
    }

    public class RoleUsersDTO
    {
        public IEnumerable<int> Ids { get; set; }
        public IEnumerable<string> Emails { get; set; }
    }
}
