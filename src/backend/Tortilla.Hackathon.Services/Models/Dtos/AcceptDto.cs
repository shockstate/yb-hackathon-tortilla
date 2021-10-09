using System.ComponentModel.DataAnnotations;

namespace Tortilla.Hackathon.Services.Models.Dtos
{
    public class AcceptDto
    {
        [Required]
        public bool IsAccepted { get; set; }
    }
}
