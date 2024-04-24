using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SneakerResaleStore.Application.Exceptions
{
    public class UnauthorizedUseCaseExecutionException : Exception
    {
        public UnauthorizedUseCaseExecutionException(string user, string useCaseName)
            :base ($"There was an unathorized access attempt by {user} for {useCaseName} use case.")
        {

        }
    }
}
