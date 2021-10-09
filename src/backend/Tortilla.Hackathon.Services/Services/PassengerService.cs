using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Tortilla.Hackathon.Data.Repositories;
using Tortilla.Hackathon.Domain;
using Tortilla.Hackathon.Services.Interfaces;
using Tortilla.Hackathon.Services.Models.Dtos;

namespace Tortilla.Hackathon.Services.Services
{
    public class PassengerService : IPassengerService
    {
        private readonly IPassengerRepository passengerRepository;
        private readonly IMapper mapper;

        public PassengerService(IPassengerRepository passengerRepository, IMapper mapper)
        {
            this.passengerRepository = passengerRepository;
            this.mapper = mapper;
        }

        public async Task<IList<PendingPassengerDto>> GetPendingPassengersAsync(Guid tripUserId)
        {
            //var trips = await tripRepository.GetTripsByUserIdAsync(tripUserId);
            //var pendingPassengers = trips
            //    .SelectMany(trip => trip.Passengers)
            //    .Where(p => p.AcceptedDateTime is null);

            //return mapper.Map<List<PendingPassengerDto>>(pendingPassengers);

            throw new NotImplementedException();
        }

        public async Task AcceptPassenger(bool isAccepted, Guid passengerId)
        {
            var passenger = await passengerRepository.GetPassengerById(passengerId);
            if (passenger == null)
            {
                throw new KeyNotFoundException("Passenger does not exist");
            }

            if (passenger.PassengerStatus != PassengerStatus.Pending)
            {
                throw new InvalidOperationException("It is only possible to change passengers in status pending");
            }
            var acceptedPassengers = passenger.DayTrip.Passengers.Count(p => p.PassengerStatus == PassengerStatus.Accepted);
            if (isAccepted)
            {
                if (acceptedPassengers >= passenger.DayTrip.Trip.User.Car.MaxCapacity)
                {
                    throw new InvalidOperationException("Trip is full");
                }
                // TODO: implement
                Random rnd = new Random();
                var pointsToAdd = rnd.Next(1, 100);
                var pointsToSubstract = rnd.Next(1, 100);
                if (passenger.User.Points - pointsToSubstract < 0)
                {
                    passenger.PassengerStatus = PassengerStatus.Rejected;
                    await passengerRepository.Update(passenger);
                    throw new InvalidOperationException("User has not enough points to be in this trip");
                }

                passenger.PassengerStatus = PassengerStatus.Accepted;
                passenger.User.Points -= pointsToSubstract;
                passenger.DayTrip.Trip.User.Points += pointsToAdd;
                passenger.DayTrip.Trip.User.TotalCo2Saved += pointsToAdd;
                await passengerRepository.Update(passenger);
            }
            else
            {
                passenger.PassengerStatus = PassengerStatus.Rejected;
                await passengerRepository.Update(passenger);
            }
        }
    }
}
