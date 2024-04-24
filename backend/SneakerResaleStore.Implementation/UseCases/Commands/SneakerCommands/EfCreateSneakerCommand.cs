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

namespace SneakerResaleStore.Implementation.UseCases.Commands.SneakerCommands
{
    public class EfCreateSneakerCommand : EfUseCase, ICreateSneakerCommand
    {
        private readonly CreateSneakerValidator _validator;
        private readonly IBase64FileUploader _fileUploader;

        public EfCreateSneakerCommand(SneakerResaleStoreContext context, CreateSneakerValidator validator, IBase64FileUploader fileUploader)
            : base(context)
        {
            _validator = validator;
            _fileUploader = fileUploader;
        }

        public int Id => 13;

        public string Name => "Create a sneaker";

        public string Description => "";

        public void Execute(CreateSneakerDTO request)
        {
            _validator.ValidateAndThrow(request);

            var filePaths =  new List<string>();

            if(request.Images != null && request.Images.Any())
            {
                filePaths = _fileUploader.Upload(request.Images, UploadType.SneakerImage).ToList();
            }

            Sneaker sneaker = new Sneaker();
            sneaker.Model = request.Model;
            sneaker.Colorway = request.Colorway;
            sneaker.BrandId = request.BrandId;
            sneaker.Price = request.Price;
            sneaker.Description = request.Description;

            sneaker.Images =filePaths.Select(filePath => new SneakerImage
            {
                Sneaker = sneaker,
                Image = new Image
                {
                    Path = filePath
                }
            }).ToList();

            Context.Sneakers.Add(sneaker);
            Context.SaveChanges();
      
            foreach (var size in request.Sizes)
            {             
                Size existingSize = Context.Sizes.FirstOrDefault(s => s.Number == size && s.IsActive);

                if (existingSize == null)
                {
                    existingSize = new Size
                    {
                        Number = size,
                        IsActive = true
                    };

                    Context.Sizes.Add(existingSize);
                    Context.SaveChanges();
                }
              
                SneakerSize sneakerSize = new SneakerSize
                {
                    SneakerId = sneaker.Id,
                    SizeId = existingSize.Id
                };

                Context.SneakerSizes.Add(sneakerSize);
            }

            Context.SaveChanges();
        }
    }
}
