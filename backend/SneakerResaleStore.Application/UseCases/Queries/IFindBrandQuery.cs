using SneakerResaleStore.Application.UseCases.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SneakerResaleStore.Application.UseCases.Queries
{
    public interface IFindBrandQuery : IQuery<int,BrandDTO>
    {
    }
}
