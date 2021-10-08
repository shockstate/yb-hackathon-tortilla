using System;
using AutoMapper;
using Tortilla.Hackathon.Domain;
using Tortilla.Hackathon.Services.Helpers;
using Tortilla.Hackathon.Services.Models.Dtos;

namespace Tortilla.Hackathon.Services.Models
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<CarType, Domain.CarType>();
            CreateMap<CarDto, Car>();
            CreateMap<CreateUserDto, User>()
                .ConstructUsing((item, _) => new User
                {
                    PasswordHash = Security.GetHashString(item.Password),
                    Points = 0,
                    TotalCo2Saved = 0
                });
            CreateMap<User, UserDetailsDto>();
        }
    }
}
