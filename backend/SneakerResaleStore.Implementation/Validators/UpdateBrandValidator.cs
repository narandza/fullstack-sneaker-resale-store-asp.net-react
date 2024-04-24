using FluentValidation;
using SneakerResaleStore.Application.Uploads;
using SneakerResaleStore.Application.UseCases.DTO;
using SneakerResaleStore.DataAccess;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SneakerResaleStore.Implementation.Validators
{
    public class UpdateBrandValidator : AbstractValidator<UpdateBrandDTO>
    {
        public UpdateBrandValidator(SneakerResaleStoreContext context, IBase64FileUploader uploader)
        {
            RuleLevelCascadeMode = CascadeMode.Stop;

            RuleFor(brand => brand.Name)
    .NotEmpty().WithMessage("Name is required.")
    .Must((brand, name) => !context.Brands.Any(otherBrand => otherBrand.Name == name && otherBrand.Id != brand.Id))
    .WithMessage("Brand already exists.");

            RuleFor(brand => brand.Description)
                .NotEmpty().WithMessage("Description is required");

            RuleFor(brand => brand.LogoPath)
                .NotEmpty().WithMessage("Logo is required.")
                .Must(x => uploader.IsExtensionValid(x) &&
                                                   new List<string> { "jpg", "png" }.Contains(uploader.GetExtension(x)))
                .When(x => x.LogoPath != null)
                .WithMessage("Invalid image type.");
        }
    }
}
