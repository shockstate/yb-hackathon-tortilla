using Swashbuckle.AspNetCore.SwaggerGen;
using System;
using System.IO;
using System.Reflection;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.OpenApi.Models;
using Microsoft.Extensions.Configuration;

namespace Tortilla.Hackathon.API.Extensions
{
    internal static class SwaggerGenOptionsExtensions
    {
        private const string swaggerEndpointName = "Tortilla team api";
        private const string swaggerEndpointVersion = "v1";

        public static void AddApiXmlComments(this SwaggerGenOptions swaggerGenOptions)
        {
            swaggerGenOptions.AddXmlComments(Assembly.GetExecutingAssembly());
        }

        public static IServiceCollection AddSwagger(this IServiceCollection services, IConfiguration configuration)
        {
            return services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc(swaggerEndpointVersion, new OpenApiInfo
                {
                    Version = swaggerEndpointVersion,
                    Title = swaggerEndpointName,
                });
                c.AddApiXmlComments();
            });
        }

        private static void AddXmlComments(this SwaggerGenOptions swaggerGenOptions, Assembly assembly)
        {
            var xmlFile = $"{assembly.GetName().Name}.xml";
            var xmlPath = Path.Combine(AppContext.BaseDirectory, xmlFile);

            if (File.Exists(xmlPath))
            {
                swaggerGenOptions.IncludeXmlComments(xmlPath);
            }
        }
    }
}
