using FluentValidation;
using SneakerResaleStore.Application.UseCases.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SneakerResaleStore.Implementation.Validators
{
    public class UpdateSneakerValidator : AbstractValidator<UpdateSneakerDTO>
    {
       public UpdateSneakerValidator()
        {
            RuleLevelCascadeMode = CascadeMode.Stop;

            RuleFor(sneaker => sneaker.Model)
            .NotEmpty().WithMessage("Model is required.");

            RuleFor(sneaker => sneaker.Colorway)
                .NotEmpty().WithMessage("Colorway is required.");

            RuleFor(sneaker => sneaker.Price)
                .GreaterThan(0).WithMessage("Price must be greater than zero.");

            RuleFor(sneaker => sneaker.Description)
                .NotEmpty().WithMessage("Description is required.");

            RuleFor(sneaker => sneaker.ReleaseDate)
                .NotEmpty().WithMessage("Release date is required.");

            RuleFor(sneaker => sneaker.BrandId)
                .GreaterThan(0).WithMessage("Brand Id must be greater than zero.");

            RuleFor(sneaker => sneaker.Sizes)
                .NotEmpty().WithMessage("At least one size must be selected.");

            RuleForEach(sneaker => sneaker.Sizes)
                .NotEmpty().WithMessage("Size must not be empty."); ;

         

            //RuleForEach(sneaker => sneaker.Images)
            //    .Must(img => img.Split(".").Count() == 2)
            //    .WithMessage("Invalid file path")
            //    .Must(x => ValidationExtensions)
        }
    }
}
