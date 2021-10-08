using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Tortilla.Hackathon.Services.Models.Dtos;

namespace Tortilla.Hackathon.Services.Interfaces
{
    public interface IPassengerService
    {
        Task<IList<PendingPassengerDto>> GetPendingPassengersAsync(Guid tripUserId);
        Task AcceptPassenger(bool isAccepted, Guid passengerId);
    }
}
