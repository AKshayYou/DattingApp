using System.ComponentModel.DataAnnotations;

namespace API.Entities
{
    public class AppUser
    {
        [Key] //this is to indicate the primary key to the table using this attribute
        public int Id { get; set; }
        public required string UserName { get; set; }
    }
}
