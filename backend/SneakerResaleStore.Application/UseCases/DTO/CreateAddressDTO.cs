﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SneakerResaleStore.Application.UseCases.DTO
{
    public class CreateAddressDTO
    {
        public string StreetAddress { get; set; }
        public string City { get; set; }
        public int PostalCode { get; set; }
    }
}
