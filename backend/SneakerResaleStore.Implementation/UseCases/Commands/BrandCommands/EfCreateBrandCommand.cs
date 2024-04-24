using FluentValidation;
using SneakerResaleStore.Application.Uploads;
using SneakerResaleStore.Application.UseCases.Commands;
using SneakerResaleStore.Application.UseCases.DTO;
using SneakerResaleStore.DataAccess;
using SneakerResaleStore.Domain.Entities;
using SneakerResaleStore.Implementation.Validators;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SneakerResaleStore.Implementation.UseCases.Commands.BrandCommands
{
    public class EfCreateBrandCommand : EfUseCase, ICreateBrandCommand
    {
        private readonly CreateBrandValidator _validator;
        private readonly IBase64FileUploader _fileUploader;

        public EfCreateBrandCommand(SneakerResaleStoreContext context, CreateBrandValidator validator, IBase64FileUploader fileUploader)
            : base(context)
        {
            _validator = validator;
            _fileUploader = fileUploader;
        }

        public int Id => 23;

        public string Name => "Create a brand";

        public string Description => "";

        public void Execute(CreateBrandDTO request)
        {
            _validator.ValidateAndThrow(request);

            var filePath = "default.jpg";

            if(request.LogoPath != null)
            {
                filePath = _fileUploader.Upload(request.LogoPath, UploadType.BrandLogo);
            }

            Brand brand = new Brand();
            brand.Name = request.Name;
            brand.Description = request.Description;
            brand.Logo = new Image
            {
                Path = filePath
            };

            Context.Brands.Add(brand);
            Context.SaveChanges();
        }
    }
}
