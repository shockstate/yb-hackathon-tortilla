using System;
using AutoMapper;
using Tortilla.Hackathon.Domain;
using Tortilla.Hackathon.Services.Models.Dtos;

namespace Tortilla.Hackathon.Services.Models
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            // Add as many of these lines as you need to map your objects
            CreateMap<CarDto, Car>()
                .ConstructUsing((_, context) => new Car
                {
                    Id = Guid.NewGuid()
                });
            CreateMap<CreateUserDto, User>()
                .ConstructUsing((_, context) => new User
                {
                    Id = Guid.NewGuid(),
                    Points = 0,
                    TotalCo2Saved = 0
                });
        }
    }
}
