using AutoMapper;
using FormsApp.Data;
using FormsApp.Dtos;
using FormsApp.Models;
using FormsApp.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace FormsApp.Services
{
    public class FormService : IFormService
    {
        protected readonly ApplicationDbContext _dbContext;
        private readonly IMapper _mapper;

        public FormService(ApplicationDbContext dbContext, IMapper mapper)
        {
            _dbContext = dbContext;
            _mapper = mapper;
        }

        public async Task<List<Form>> GetAllAsync()
        {
            var forms = await _dbContext.Forms.ToListAsync();
            return forms; ;
        }

        public Task CreateAsync(FormDto dto)
        {
            var form = _mapper.Map(dto, new Form());
            _dbContext.Forms.AddAsync(form);
            return _dbContext.SaveChangesAsync();
        }

        public Task MarkAsAnswered(Form form)
        {
            form.Answered = !form.Answered;
            return _dbContext.SaveChangesAsync();
        }

        public Task MarkAsReaded(Form form)
        {
            form.Readed = !form.Readed;
            return _dbContext.SaveChangesAsync();
        }

        public Task Delete(Form form)
        {
            _dbContext.Remove(form);
            return _dbContext.SaveChangesAsync();
        }

        public async Task<Form> GetById(Guid id) => await _dbContext.Forms.FindAsync(id);
    }
}
