using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SneakerResaleStore.Application
{
    public interface IApplicationActor
    {
        int Id { get; }
        string Email { get; }
        IEnumerable<int> AllowedUseCases { get; }
    }
}
