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
    public class CreateSneakerValidator : AbstractValidator<CreateSneakerDTO>
    {
        public CreateSneakerValidator(SneakerResaleStoreContext context, IBase64FileUploader uploader)
        {
            RuleLevelCascadeMode = CascadeMode.Stop;

            RuleFor(sneaker => sneaker.Model)
                .NotEmpty().WithMessage("Model is required.");

            RuleFor(sneaker => sneaker.Colorway)
                .NotEmpty().WithMessage("Colorway is required.");

            RuleFor(sneaker => sneaker.Price)
                .GreaterThan(0).WithMessage("Price must be greater than zero.");

            RuleFor(sneaker => sneaker.Description)
                .NotEmpty().WithMessage("Description is required");

            RuleFor(sneaker => sneaker.ReleaseDate)
                .NotEmpty().WithMessage("Relase date is required.")
                .LessThanOrEqualTo(DateTime.Now).WithMessage("Release date must be in the past");

            //RuleFor(sneaker => sneaker.BrandId)
            //    .NotEmpty().WithMessage("Brand is required.")
            //    .Must((sneaker, brandId) =>
            //    {
            //        var brand = context.Brands
            //                            .FirstOrDefault(brand => brand.Id == brandId &&
            //                                                     brand.IsActive &&
            //                                                     brand.DeletedAt == null);
            //        return brand != null;
            //    })
            //    .WithMessage("Invalid brand or brand is inactive.");

            RuleFor(sneaker => sneaker.Images)
                .NotEmpty().WithMessage("At least one image must be selected.")
                .ForEach(image => image.NotNull().WithMessage("Image path must not be null.")
                       .NotEmpty().WithMessage("Image path must not be empty.")
                       .Must(x => uploader.IsExtensionValid(x) &&
                                  new List<string> { "jpg", "png" }.Contains(uploader.GetExtension(x)))
                       .When(x => x != null)
                       .WithMessage("Invalid image type."));

            RuleFor(sneaker => sneaker.Sizes)
                .NotEmpty().WithMessage("At least one size must be selected.")
                .ForEach(size => size.NotNull().WithMessage("Size must not be null.")
                .NotEmpty().WithMessage("Size must not be empty."));
                                 
        }
    }
}
