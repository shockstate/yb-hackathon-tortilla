using System.ComponentModel.DataAnnotations;

namespace Tortilla.Hackathon.Services.Models.Dtos
{
    public class CarDto
    {
        [Required]
        public string Model { get; set; }
        [Required]
        public int Year { get; set; }
        [Required]
        public int MaxCapacity { get; set; }
        [Required]
        public CarType CarType { get; set; }
    }
}
