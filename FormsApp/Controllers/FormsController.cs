using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using FormsApp.Data;
using FormsApp.Dtos;
using FormsApp.Models;

namespace FormsApp.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class FormsController : ControllerBase
    {
        protected readonly ApplicationDbContext _dbContext;
        private readonly IMapper _mapper;

        public FormsController(ApplicationDbContext dbContext, IMapper mapper)
        {
            _dbContext = dbContext;
            _mapper = mapper;
        }

        [HttpGet("get-forms")]
        public async Task<IActionResult> GetForms()
        {
            var forms = await _dbContext.Forms.ToListAsync();
            return Ok(new ActionResponse("Ok", "200", JsonConvert.SerializeObject(forms)));
        }

        [HttpPost("create")]
        public async Task<IActionResult> Create([FromForm] FormDto dto)
        {
            if (ModelState.IsValid)
            {
                var form = _mapper.Map(dto, new Form());
                await _dbContext.Forms.AddAsync(form);
                await _dbContext.SaveChangesAsync();

                return Ok(new ActionResponse("Created", "201", "Formulário criado com sucesso."));
            }

            return Ok(new ActionResponse("BadRequest", "400", "Dados inválidos."));
        }

        [HttpPut("mark-as-readed")]
        public async Task<IActionResult> MarkAsReaded(Guid id)
        {
            var form = await _dbContext.Forms.FirstOrDefaultAsync(f => f.Id == id);

            if (form == null)
            {
                return Ok(new ActionResponse("No Contet", "204", "O formulário não foi encontrado."));
            }

            form.Readed = true;
            await _dbContext.SaveChangesAsync();
            return Ok(new ActionResponse("Ok", "200", "Dados atualizados."));
        }

        [HttpPut("mark-as-answered")]
        public async Task<IActionResult> MarkAsAnswered(Guid id)
        {
            var form = await _dbContext.Forms.FirstOrDefaultAsync(f => f.Id == id);

            if (form == null)
            {
                return Ok(new ActionResponse("No Contet", "204", "O formulário não foi encontrado."));
            }

            form.Answered = true;
            await _dbContext.SaveChangesAsync();
            return Ok(new ActionResponse("Ok", "200", "Dados atualizados."));
        }
    }
}