﻿using SneakerResaleStore.Application.UseCases.DTO;
using SneakerResaleStore.Application.UseCases.Queries.Searches;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SneakerResaleStore.Application.UseCases.Queries
{
    public interface ISearchUsersQuery : IQuery<UserSearch, PagedResponse<UserDTO>>
    {
    }
}
