using System.ComponentModel.DataAnnotations;

namespace API.DTOs
{
    public class RegisterDTO
    {
        [Required]
        [MaxLength(100)]
        public string UserName { get; set; }
        [Required]
        public string Password { get; set; }
    }
}
