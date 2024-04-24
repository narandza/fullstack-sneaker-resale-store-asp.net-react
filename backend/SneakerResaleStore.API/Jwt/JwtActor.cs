using SneakerResaleStore.Application;
using System.Collections.Generic;

namespace SneakerResaleStore.API.Jwt
{
    public class JwtActor : IApplicationActor
    {
        public int Id { get; set; }

        public string Email { get; set; }

        public IEnumerable<int> AllowedUseCases { get; set; }
    }
}
