using FormsApp.Dtos;
using FormsApp.Models;

namespace FormsApp.Services.Interfaces
{
    public interface IFormService
    {
        Task<List<Form>> GetAllAsync();
        Task<Form> GetById(Guid id);
        Task CreateAsync(FormDto dto);
        Task MarkAsReaded(Form form);
        Task MarkAsAnswered(Form form);
        Task Delete(Form form);
    }
}
