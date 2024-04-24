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

namespace SneakerResaleStore.Implementation.UseCases.Commands.SneakerCommands
{
    public class EfUpdateSneakerCommand : EfUseCase, IUpdateSneakerCommand
    {
        private readonly UpdateSneakerValidator _validator;
        private readonly IBase64FileUploader _fileUploader;
        public EfUpdateSneakerCommand(SneakerResaleStoreContext context, UpdateSneakerValidator validator, IBase64FileUploader fileUploader)
            : base(context)
        {
            _validator = validator;
            _fileUploader = fileUploader;
        }

        public int Id => 14;

        public string Name => "Update a sneaker";

        public string Description => "";

        public void Execute(UpdateSneakerDTO request)
        {
            _validator.ValidateAndThrow(request);

            var existingSneaker = Context.Sneakers.Include(s => s.Brand)
                                                   .Include(s => s.Sizes)
                                                   .Include(s => s.Images)
                                                   .FirstOrDefault(s => s.Id == request.Id);

            if (existingSneaker != null)
            {
                existingSneaker.Model = request.Model;
                existingSneaker.Colorway = request.Colorway;
                existingSneaker.Price = request.Price;
                existingSneaker.Description = request.Description;
                existingSneaker.ReleaseDate = request.ReleaseDate;
                existingSneaker.ModifiedAt = DateTime.UtcNow;

                if (existingSneaker.BrandId != request.BrandId)
                {
                    var brand = Context.Brands.FirstOrDefault(b => b.Id == request.BrandId);
                    existingSneaker.Brand = brand;
                }

                List<Size> sizes = new List<Size>();
                foreach (var size in request.Sizes)
                {
                    Size existingSize = Context.Sizes.FirstOrDefault(x => x.Number == size && x.IsActive);

                    if (existingSize == null)
                    {
                        existingSize = new Size
                        {
                            Number = size,
                            IsActive = true
                        };
                        Context.Sizes.Add(existingSize);
                    }

                    sizes.Add(existingSize);
                }

                existingSneaker.Sizes = sizes.Select(size => new SneakerSize
                {
                    Size = size,
                    Sneaker = existingSneaker
                }).ToList();

                var filePaths = new List<string>();
                if (request.Images != null && request.Images.Any())
                {
                    filePaths = _fileUploader.Upload(request.Images, UploadType.SneakerImage).ToList();

                    List<Image> images = new List<Image>();
                    foreach (var imagePath in filePaths)
                    {
                        Image existingImage = Context.Images.FirstOrDefault(i => i.Path == imagePath);

                        if (existingImage == null)
                        {
                            existingImage = new Image
                            {
                                Path = imagePath,
                                ModifiedAt = DateTime.UtcNow,
                            };
                            Context.Images.Add(existingImage);
                        }

                        images.Add(existingImage);
                    }

                    existingSneaker.Images = images.Select(image => new SneakerImage
                    {
                        Image = image,
                        Sneaker = existingSneaker
                    }).ToList();
                }

                Context.Entry(existingSneaker).State = EntityState.Modified;
                Context.SaveChanges();
            }
        }
    }
}
