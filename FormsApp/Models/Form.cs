using AutoMapper;
using FormsApp.Dtos;
using System.ComponentModel.DataAnnotations;

namespace FormsApp.Models
{
    [AutoMap(typeof(FormDto))]
    public class Form
    {
        [Key]
        public Guid Id { get; set; } = Guid.NewGuid();
        public string? Name { get; set; }
        public string? Subject { get; set; }
        public string? Contact { get; set; }
        public string? Email { get; set; }
        public string? Message { get; set; }
        public bool Readed { get; set; }
        public bool Answered { get; set; }
        public DateTime CreationDate { get; set; } = DateTime.Now;
    }
}
