using System.ComponentModel.DataAnnotations;

namespace Tortilla.Hackathon.Services.Models.Dtos
{
    public class UserCredentialsDto
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }
        [Required]
        public string Password { get; set; }
    }
}
