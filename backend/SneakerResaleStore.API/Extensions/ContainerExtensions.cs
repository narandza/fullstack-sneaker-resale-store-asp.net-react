using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using SneakerResaleStore.API.DTO;
using SneakerResaleStore.API.ErrorLogging;
using SneakerResaleStore.API.Jwt;
using SneakerResaleStore.Application.Logging.ErrorLogging;
using SneakerResaleStore.Application.UseCases.Commands;
using SneakerResaleStore.Application.UseCases.Queries;
using SneakerResaleStore.Implementation.UseCases.Commands.AddressCommands;
using SneakerResaleStore.Implementation.UseCases.Commands.BrandCommands;
using SneakerResaleStore.Implementation.UseCases.Commands.FavoritesCommands;
using SneakerResaleStore.Implementation.UseCases.Commands.OrderCommands;
using SneakerResaleStore.Implementation.UseCases.Commands.RoleCommands;
using SneakerResaleStore.Implementation.UseCases.Commands.SneakerCommands;
using SneakerResaleStore.Implementation.UseCases.Commands.TicketCommands;
using SneakerResaleStore.Implementation.UseCases.Commands.UserCommands;
using SneakerResaleStore.Implementation.UseCases.Queries;
using SneakerResaleStore.Implementation.UseCases.Queries.AddressQueries;
using SneakerResaleStore.Implementation.UseCases.Queries.BrandQueries;
using SneakerResaleStore.Implementation.UseCases.Queries.OrderQueries;
using SneakerResaleStore.Implementation.UseCases.Queries.RoleQueries;
using SneakerResaleStore.Implementation.UseCases.Queries.SneakerQueries;
using SneakerResaleStore.Implementation.UseCases.Queries.TicketQueries;
using SneakerResaleStore.Implementation.UseCases.Queries.UserQueries;
using SneakerResaleStore.Implementation.Validators;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SneakerResaleStore.API.Extensions
{
    public static class ContainerExtensions
    {
        public static void AddLogger(this IServiceCollection services)
        {
            services.AddTransient<IErrorLogger>(x =>
            {
                var accesor = x.GetService<IHttpContextAccessor>();

                if (accesor == null || accesor.HttpContext == null)
                {
                    return new ConsoleErrorLogger();
                }

                var logger = accesor.HttpContext.Request.Headers["Logger"].FirstOrDefault();

                return new ConsoleErrorLogger();
            });
        }

        public static void AddValidators(this IServiceCollection services)
        {
            services.AddTransient<CreateSneakerValidator>();
            services.AddTransient<UpdateSneakerValidator>();

            services.AddTransient<CreateBrandValidator>();
            services.AddTransient<UpdateBrandValidator>();
            
            services.AddTransient<CreateAddressValidator>();
            services.AddTransient<UpdateAddressValidator>();
           
            services.AddTransient<RegisterUserValidator>();
            services.AddTransient<UpdateUserValidator>();
            services.AddTransient<PasswordValidator>();
            
            services.AddTransient<CreateRoleValidator>();
            services.AddTransient<UpdateRoleValidator>();
            
            services.AddTransient<AddToFavouritesValidator>();

            services.AddTransient<CreateOrderValidator>();
            services.AddTransient<UpdateOrderValidator>();
            services.AddTransient<AddOrderItemValidator>();
            
            services.AddTransient<CreateTicketValidator>();
            services.AddTransient<UpdateTicketValidator>();
        }

        public static void AddQueries(this IServiceCollection services)
        {
            services.AddTransient<ISearchSneakersQuery, EfSearchSneakersQuery>();
            services.AddTransient<IFindSneakerQuery, EfFindSneakerQuery>();

            services.AddTransient<ISearchBrandsQuery, EfSearchBrandsQuery>();
            services.AddTransient<IFindBrandQuery, EfFindBrandQuery>();
           
            services.AddTransient<ISearchAddressesQuery, EfSearchAddressesQuery>();
            services.AddTransient<IFindAddressQuery, EfFindAddressQuery>();
            
            services.AddTransient<ISearchUsersQuery, EfSearchUsersQuery>();
            services.AddTransient<IFindUserQuery, EfFindUserQuery>();

            services.AddTransient<ISearchRolesQuery, EfSearchRolesQuery>();
            services.AddTransient<IFindRoleQuery, EfFindRoleQuery>();

            services.AddTransient<IGetFavoritesQuery, EfGetFavoritesQuery>();

            services.AddTransient<ISearchOrdersQuery, EfSearchOrdersQuery>();
            services.AddTransient<IFindOrderQuery, EfFindOrderQuery>(); 
            
            services.AddTransient<ISearchTicketsQuery, EfSearchTicketsQuery>();
            services.AddTransient<IFindTicketQuery, EfFindTicketQuery>();
        }

        public static void AddCommands(this IServiceCollection services)
        {
            services.AddTransient<ICreateSneakerCommand, EfCreateSneakerCommand>();
            services.AddTransient<IUpdateSneakerCommand, EfUpdateSneakerCommand>();
            services.AddTransient<IDeleteSneakerCommand, EfDeleteSneakerCommand>();
            
            services.AddTransient<ICreateBrandCommand, EfCreateBrandCommand>();
            services.AddTransient<IUpdateBrandCommand, EfUpdateBrandCommand>();
            services.AddTransient<IDeleteBrandCommand, EfDeleteBrandCommand>();
            
            services.AddTransient<ICreateAddressCommand, EfCreateAddressCommand>();
            services.AddTransient<IUpdateAddressCommand, EFUpdateAddressCommand>();
            services.AddTransient<IDeleteAddressCommand, EfDeleteAddressCommand>();

            services.AddTransient<IRegisterUserCommand, EfRegisterUserCommand>();
            services.AddTransient<IUpdateUserCommand, EFUpdateUserCommand>();
            services.AddTransient<IDeleteUserCommand, EfDeleteUserCommand>();
            
            services.AddTransient<ICreateRoleCommand, EfCreateRoleCommand>();
            services.AddTransient<IUpdateRoleCommand, EfUpdateRoleCommand>();
            services.AddTransient<IDeleteRoleCommand, EfDeleteRoleCommand>();
            
            services.AddTransient<IAddToFavoritesCommand, EfAddToFavoritesCommand>();
            services.AddTransient<IRemoveFromFavorites, EfRemoveFromFavorites>();
            
            services.AddTransient<ICreateOrderCommand, EfCreateOrderCommand>();
            services.AddTransient<IUpdateOrderCommand, EfUpdateOrderCommand>();
            services.AddTransient<IDeleteOrderCommand, EfDeleteOrderCommand>();
            services.AddTransient<IAddToOrderCommand, EfAddToOrderCommand>();
            services.AddTransient<IRemoveFromOrderCommand, EfRemoveFromOrderCommand>();
            
            
            services.AddTransient<ICreateTicketCommand, EFCreateTicketCommand>();
            services.AddTransient<IUpdateTicketCommand, EFUpdateTicketCommand>(); 
            services.AddTransient<IDeleteTicketCommand, EfDeleteTicketCommand>();
        }

        public static void AddJwt(this IServiceCollection services, AppSettings settings)
        {
            services.AddAuthentication(options =>
            {
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultSignInScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
            }
            ).AddJwtBearer(cfg =>
            {
                cfg.RequireHttpsMetadata = false;
                cfg.SaveToken = true;
                cfg.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidIssuer = settings.Jwt.Issuer,            
                    ValidateIssuer = true,
                    ValidAudience = settings.Jwt.Audience,
                    ValidateAudience = true,
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(settings.Jwt.SecretKey)),
                    ValidateIssuerSigningKey = false, 
                    ValidateLifetime = true,
                    ClockSkew = TimeSpan.Zero,
                };

                cfg.Events = new JwtBearerEvents
                {
                    OnTokenValidated = context =>
                    {
                        var header = context.Request.Headers["Authorization"];

                        var token = header.ToString().Split("Bearer ")[1];

                        var handler = new JwtSecurityTokenHandler();

                        var tokenObj = handler.ReadJwtToken(token);

                        var jti = tokenObj.Claims.FirstOrDefault(x => x.Type == "jti").Value;

                        ITokenStorage storage = context.HttpContext.RequestServices.GetService<ITokenStorage>();

                        bool isValid = storage.TokenExists(jti);

                        if (!isValid)
                        {
                            context.Fail("Token is not valid");
                        }
                        return Task.CompletedTask;
                    }
                };
            });
        }
    } 
}
