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
            CreateMap<CarType, Domain.CarType>();
            CreateMap<CarDto, Car>()
                .ConstructUsing((_, _) => new Car
                {
                    Id = Guid.NewGuid()
                });
            CreateMap<CreateUserDto, User>()
                .ConstructUsing((_, _) => new User
                {
                    Id = Guid.NewGuid(),
                    Points = 0,
                    TotalCo2Saved = 0
                });
        }
    }
}
