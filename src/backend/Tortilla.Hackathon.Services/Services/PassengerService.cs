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
        private readonly ITripService tripService;

        private readonly IMapper mapper;

        private const int CAR_SIZE_THRESHOLD_VALUE = 4;


        public PassengerService(IPassengerRepository passengerRepository, ITripService tripService, IMapper mapper)
        {
            this.passengerRepository = passengerRepository;
            this.tripService = tripService;
            this.mapper = mapper;
        }

        public async Task<IList<PendingPassengerDto>> GetPendingPassengersAsync(Guid tripUserId)
        {
            var pendingPassengers = await passengerRepository.GetPendingPassengersByTripUserId(tripUserId);

            var pendingPassengerDtos = mapper.Map<List<PendingPassengerDto>>(pendingPassengers);

            return pendingPassengerDtos;
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
                if (acceptedPassengers >= passenger.DayTrip.Trip.User.Car.MaxPassengersCapacity)
                {
                    throw new InvalidOperationException("Trip is full");
                }
                int pointsToAdd = GetPointsToAddToDriver(passenger);
                var pointsToSubstract = GetPointsToDiscountToPassenger(passenger);
                if (passenger.User.Points - pointsToSubstract < 0)
                {
                    passenger.PassengerStatus = PassengerStatus.Rejected;
                    await passengerRepository.Update(passenger);
                    throw new InvalidOperationException("User has not enough points to be in this trip");
                }


                passenger.PassengerStatus = PassengerStatus.Accepted;
                //Passenger
                passenger.User.Points -= pointsToSubstract;

                //Driver
                passenger.DayTrip.Trip.User.Points += pointsToAdd;
                passenger.DayTrip.Trip.User.TotalCo2Saved += pointsToAdd; // Total for ranking
                await passengerRepository.Update(passenger);
            }
            else
            {
                passenger.PassengerStatus = PassengerStatus.Rejected;
                await passengerRepository.Update(passenger);
            }
        }

        private int GetPointsToAddToDriver(Passenger passenger)
        {
            var pointsByCar = GetPointsByCar(passenger.User.Car);
            var tripLinearDistanceInKm = tripService.GetDistanceBetweenTwoPoints(passenger.DayTrip.Trip.OriginLongitude, passenger.DayTrip.Trip.OriginLongitude,
                passenger.DayTrip.Trip.DestinationLatitude, passenger.DayTrip.Trip.DestinationLongitude) / 1000;
            return Convert.ToInt32(pointsByCar * tripLinearDistanceInKm);
        }

        private int GetPointsToDiscountToPassenger(Passenger passenger)
        {
            var pointsByCar = GetPointsByCar(passenger.DayTrip.Trip.User.Car);
            var tripLinearDistanceInKm = tripService.GetDistanceBetweenTwoPoints(passenger.DayTrip.Trip.OriginLongitude, passenger.DayTrip.Trip.OriginLongitude,
                passenger.DayTrip.Trip.DestinationLatitude, passenger.DayTrip.Trip.DestinationLongitude) / 1000;
            return Convert.ToInt32(pointsByCar * tripLinearDistanceInKm);
        }

        private double GetPointsByCar(Car car)
        {
            //get passenger point according its car
            return car.CarType switch
            {
                CarType.Diesel => car.MaxCapacity switch
                {
                    < CAR_SIZE_THRESHOLD_VALUE => 5.23,
                    CAR_SIZE_THRESHOLD_VALUE => 6.7,
                    > CAR_SIZE_THRESHOLD_VALUE => 8.39
                },
                CarType.Gasoline => car.MaxCapacity switch
                {
                    < CAR_SIZE_THRESHOLD_VALUE => 6.83,
                    CAR_SIZE_THRESHOLD_VALUE => 8.42,
                    > CAR_SIZE_THRESHOLD_VALUE => 10.01
                },
                CarType.Hybrid => car.MaxCapacity switch
                {
                    < CAR_SIZE_THRESHOLD_VALUE => 4.22,
                    CAR_SIZE_THRESHOLD_VALUE => 5.2,
                    > CAR_SIZE_THRESHOLD_VALUE => 6.18
                },
                CarType.Electric => car.MaxCapacity switch
                {
                    < CAR_SIZE_THRESHOLD_VALUE => 16.14,
                    CAR_SIZE_THRESHOLD_VALUE => 19.9,
                    > CAR_SIZE_THRESHOLD_VALUE => 23.65
                },
            };
        }
    }
}
