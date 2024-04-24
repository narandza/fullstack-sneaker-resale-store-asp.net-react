using FluentValidation;
using Microsoft.EntityFrameworkCore;
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
    public class EfUpdateBrandCommand : EfUseCase, IUpdateBrandCommand
    {      
        private  readonly UpdateBrandValidator _validator;
        private readonly IBase64FileUploader _fileUploader;

        public EfUpdateBrandCommand(SneakerResaleStoreContext context, UpdateBrandValidator validator, IBase64FileUploader fileUploader)
            : base(context)
        {
            _validator = validator;
            _fileUploader = fileUploader;
        }

        public int Id => 24;

        public string Name =>"Update a brand";

        public string Description => "";

        public void Execute(UpdateBrandDTO request)
        {
            _validator.ValidateAndThrow(request);

            var existingBrand = Context.Brands.Include(b => b.Logo)
                                                .FirstOrDefault(b => b.Id == request.Id);

            if(existingBrand != null)
            {
                var filePath = "default.jpg";

                if (request.LogoPath != null)
                {
                    filePath = _fileUploader.Upload(request.LogoPath, UploadType.BrandLogo);
                }
                existingBrand.Name = request.Name;
                existingBrand.Description = request.Description;
                existingBrand.Logo.Path = filePath;
                existingBrand.ModifiedAt = DateTime.UtcNow;

                Context.Entry(existingBrand).State = EntityState.Modified;
                Context.SaveChanges();
            }
        }
    }
}
