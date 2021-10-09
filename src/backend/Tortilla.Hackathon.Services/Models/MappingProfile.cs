﻿using System;
using AutoMapper;
using Tortilla.Hackathon.Domain;
using Tortilla.Hackathon.Services.Helpers;
using Tortilla.Hackathon.Services.Models.Dtos;
using Tortilla.Hackathon.Services.Models.Dtos.Trips;

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

            CreateMap<User, UserRankingDto>();

            CreateMap<Passenger, PendingPassengerDto>();

            CreateMap<DayTrip, MyDayTripDto>()
                .ForMember(dest => dest.OriginDescription, opts => opts.MapFrom(src => src.Trip.OriginDescription))
                .ForMember(dest => dest.OriginLatitude, opts => opts.MapFrom(src => src.Trip.OriginLatitude))
                .ForMember(dest => dest.OriginLongitude, opts => opts.MapFrom(src => src.Trip.OriginLongitude))
                .ForMember(dest => dest.DestinationDescription, opts => opts.MapFrom(src => src.Trip.DestinationDescription))
                .ForMember(dest => dest.DestinationLatitude, opts => opts.MapFrom(src => src.Trip.DestinationLatitude))
                .ForMember(dest => dest.DestinationLongitude, opts => opts.MapFrom(src => src.Trip.DestinationLongitude));

            CreateMap<DayTrip, DayTripDto>()
                .ForMember(dest => dest.OriginDescription, opts => opts.MapFrom(src => src.Trip.OriginDescription))
                .ForMember(dest => dest.OriginLatitude, opts => opts.MapFrom(src => src.Trip.OriginLatitude))
                .ForMember(dest => dest.OriginLongitude, opts => opts.MapFrom(src => src.Trip.OriginLongitude))
                .ForMember(dest => dest.DestinationDescription, opts => opts.MapFrom(src => src.Trip.DestinationDescription))
                .ForMember(dest => dest.DestinationLatitude, opts => opts.MapFrom(src => src.Trip.DestinationLatitude))
                .ForMember(dest => dest.DestinationLongitude, opts => opts.MapFrom(src => src.Trip.DestinationLongitude));


            CreateMap<CreateTripDto, Trip>();
        }
    }
}
