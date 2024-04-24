using SneakerResaleStore.DataAccess;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SneakerResaleStore.Implementation.UseCases
{
    public abstract class EfUseCase
    {
        protected SneakerResaleStoreContext Context { get;}

        protected EfUseCase(SneakerResaleStoreContext context)
        {
            Context = context;
        }
    }
}
