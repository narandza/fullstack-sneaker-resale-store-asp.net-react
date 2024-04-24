using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.OpenApi.Models;
using Newtonsoft.Json;
using SneakerResaleStore.API.DTO;
using SneakerResaleStore.API.ErrorLogging;
using SneakerResaleStore.API.Extensions;
using SneakerResaleStore.API.Jwt;
using SneakerResaleStore.API.Jwt.TokenStorage;
using SneakerResaleStore.API.Middleware;
using SneakerResaleStore.Application;
using SneakerResaleStore.Application.Logging;
using SneakerResaleStore.Application.Logging.ErrorLogging;
using SneakerResaleStore.Application.Uploads;
using SneakerResaleStore.Application.UseCaseHandling;
using SneakerResaleStore.DataAccess;
using SneakerResaleStore.Implementation.Logging;
using SneakerResaleStore.Implementation.Uploads;
using SneakerResaleStore.Implementation.UseCases.Commands.SneakerCommands;
using SneakerResaleStore.Implementation.UseCases.Queries;
using SneakerResaleStore.Implementation.Validators;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Threading.Tasks;

namespace SneakerResaleStore.API
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            var appSettings = new AppSettings();
            Configuration.Bind(appSettings);

            services.AddTransient<ITokenStorage, InMemoryTokenStorage>();
            services.AddTransient<JwtManager>(x =>
            {
                var context = x.GetService<SneakerResaleStoreContext>();
                var tokenStorage = x.GetService<ITokenStorage>();
                return new JwtManager(context, appSettings.Jwt.Issuer, appSettings.Jwt.SecretKey, appSettings.Jwt.DurationSeconds, appSettings.Jwt.Audience, tokenStorage);
            });

            services.AddTransient<SneakerResaleStoreContext>(x =>
            {
                DbContextOptionsBuilder builder = new DbContextOptionsBuilder();
                builder.UseSqlServer(@"Data Source=DIMITRIJE\SQLEXPRESS;Initial Catalog=asp03-23;Integrated Security=True");
                return new SneakerResaleStoreContext(builder.Options);
            });

          
            services.AddLogger();
            services.AddValidators();
            services.AddQueries();
            services.AddCommands();
            services.AddTransient<IUseCaseLogger, EfUseCaseLogger>();
            services.AddTransient<ICommandHandler, CommandHandler>();

            services.AddTransient<IBase64FileUploader, Base64FileUploader>();

            services.AddHttpContextAccessor();
            services.AddScoped<IApplicationActor>(x =>
            {
                var accessor = x.GetService<IHttpContextAccessor>();
                var header = accessor.HttpContext.Request.Headers["Authorization"];

                var data = header.ToString().Split("Bearer ");

                if (data.Length < 2)
                {
                    return new UnauthorizedActor();
                }

                var handler = new JwtSecurityTokenHandler();

                var tokenObj = handler.ReadJwtToken(data[1].ToString());

                var claims = tokenObj.Claims;

                var email = claims.First(x => x.Type == "Email").Value;
                var id = claims.First(x => x.Type == "Id").Value;
                var useCases = claims.First(x => x.Type == "UseCases").Value;

                List<int> useCaseIds = JsonConvert.DeserializeObject<List<int>>(useCases);

                return new JwtActor
                {
                    Id = int.Parse(id),
                    Email = email,
                    AllowedUseCases = useCaseIds
                };
            });

            services.AddJwt(appSettings);

            services.AddTransient<IQueryHandler>(x =>
            {
                var actor = x.GetService<IApplicationActor>();
                var logger = x.GetService<IUseCaseLogger>();
                var queryHandler = new QueryHandler();
                var timeTrackingHandler = new TimeTrackingQueryHandler(queryHandler);
                var loggingHandler = new LoggingQueryHandler(timeTrackingHandler, actor, logger);
                var decoration = new AuthorizationQueryHandler(actor, loggingHandler);

                return decoration;
            });

            services.AddControllers();
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "SneakerResaleStore.API", Version = "v1" });
            });

            //services.AddCors(options =>
            //{
            //    options.AddPolicy("DisableCors",
            //        builder =>
            //        {
            //            builder.WithOrigins("http://localhost:3000")
            //       .AllowAnyMethod()
            //       .AllowAnyHeader()
            //       .AllowCredentials();
            //        });
            //});

            services.AddCors();

        }

        

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {

            app.UseDeveloperExceptionPage();
            app.UseStaticFiles();
            app.UseSwagger();
            app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "SneakerResaleStore.API v1"));


            app.UseCors(x =>
            {
                x.AllowAnyMethod();
                x.AllowAnyHeader();
                x.AllowAnyOrigin();
            });

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthentication();
            app.UseAuthorization();


            app.UseMiddleware<ExceptionHandlingMiddleware>();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
