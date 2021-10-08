using System;
using System.Collections.Generic;
using Tortilla.Hackathon.Services.Models.Dtos;

namespace Tortilla.Hackathon.Services.Interfaces
{
    public interface IPassengerService
    {
        IList<PendingPassengerDto> GetPendingPassengers(Guid tripUserId);
    }
}
