
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Tortilla.Hackathon.Services.Models.Dtos.Trips;

namespace Tortilla.Hackathon.Services.Interfaces
{
    public interface ITripService
    {
        Task<IList<MyDayTripDto>> GetMyTripsAsOwnerOrPassengerByUserIdAsync(Guid userId);
        Task CreateTripAsync(CreateTripDto createTripDto);
        Task<IList<DayTripDto>> SearchDayTripsAsync(SearchTripsDto searchTripsDto);
        Task CreteDayTripRequest(DayTripRequestDto dayTripRequestDto);
        double GetDistanceBetweenTwoPoints(double originLong, double originLat, double destinLong, double destinLatitud);
    }
}
