using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using FormsApp.Data;
using FormsApp.Dtos;
using FormsApp.Models;
using FormsApp.Services.Interfaces;

namespace FormsApp.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class FormsController : ControllerBase
    {
        private readonly IFormService _formsService;

        public FormsController(ApplicationDbContext dbContext, IFormService formsService)
        {
            _formsService = formsService;
        }

        [HttpGet("get-forms")]
        public async Task<IActionResult> GetForms()
        {
            var res = JsonConvert.SerializeObject(await _formsService.GetAllAsync());
            return Ok(new ActionResponse("Ok", "200", res));
        }

        [HttpPost("create")]
        public async Task<IActionResult> Create([FromBody] FormDto dto)
        {
            if (ModelState.IsValid)
            {
                await _formsService.CreateAsync(dto);
                return Ok(new ActionResponse("Created", "201", "Formulário criado com sucesso."));
            }

            return Ok(new ActionResponse("BadRequest", "400", "Dados inválidos."));
        }

        [HttpPut("mark-as-readed/{*id}")]
        public async Task<IActionResult> MarkAsReaded(Guid id)
        {
            var form = await _formsService.GetById(id);

            if (form == null)
            {
                return Ok(new ActionResponse("No Content", "204", $"O formulário com o id {id} não foi encontrado."));
            }

            await _formsService.MarkAsReaded(form);
            return Ok(new ActionResponse("Ok", "200", "Dados atualizados."));
        }

        [HttpPut("mark-as-answered/{*id}")]
        public async Task<IActionResult> MarkAsAnswered(Guid id)
        {
            var form = await _formsService.GetById(id);

            if (form == null)
            {
                return Ok(new ActionResponse("No Content", "204", "O formulário não foi encontrado."));
            }

            await _formsService.MarkAsAnswered(form);
            return Ok(new ActionResponse("Ok", "200", "Dados atualizados."));
        }

        [HttpDelete("delete/{*id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var form = await _formsService.GetById(id);

            if (form == null)
            {
                return Ok(new ActionResponse("No Content", "204", "O formulário não foi encontrado."));
            }

            await _formsService.Delete(form);
            return Ok(new ActionResponse("Ok", "200", "O formulário foi apagado com sucesso."));
        }
    }
}