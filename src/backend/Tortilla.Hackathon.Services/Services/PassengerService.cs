using System;
using System.Collections.Generic;
using Tortilla.Hackathon.Services.Interfaces;
using Tortilla.Hackathon.Services.Models.Dtos;

namespace Tortilla.Hackathon.Services.Services
{
    public class PassengerService : IPassengerService
    {
        public IList<PendingPassengerDto> GetPendingPassengers(Guid tripUserId)
        {
            throw new NotImplementedException();
        }
    }
}
