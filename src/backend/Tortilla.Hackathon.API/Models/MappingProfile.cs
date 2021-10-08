using AutoMapper;
using Tortilla.Hackathon.API.Models.Dtos;
using Tortilla.Hackathon.Services.Models;

namespace Tortilla.Hackathon.API.Models
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            // Add as many of these lines as you need to map your objects
            CreateMap<User, CreateUserDto>();
            CreateMap<CreateUserDto, User>()
                .ConstructUsing((_, context) => new User
                {
                    Points = 0,
                    TotalCo2Saved = 0
                });
        }
    }
}
