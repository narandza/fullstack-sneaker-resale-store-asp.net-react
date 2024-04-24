using FluentValidation.Results;
using Microsoft.AspNetCore.Mvc;
using SneakerResaleStore.API.DTO;
using System.Collections.Generic;
using System.Linq;

namespace SneakerResaleStore.API.Extensions
{
    public static class ValidationExtensions
    {
        public static UnprocessableEntityObjectResult ToUnprocessableEntity(this ValidationResult result)
        {
            var errors = result.Errors.Select(error => new ClientErrorDto
            {
                Error = error.ErrorMessage,
                Property = error.PropertyName
            });

            return new UnprocessableEntityObjectResult(errors);
        }

        public static IEnumerable<string> AllowedImageTypes = new List<string>
        {
            "jpg", "jpeg", "png"
        };
    }
}
