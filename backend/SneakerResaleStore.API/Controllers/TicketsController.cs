using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SneakerResaleStore.Application.UseCaseHandling;
using SneakerResaleStore.Application.UseCases.Commands;
using SneakerResaleStore.Application.UseCases.DTO;
using SneakerResaleStore.Application.UseCases.Queries;
using SneakerResaleStore.Application.UseCases.Queries.Searches;
using SneakerResaleStore.DataAccess;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace SneakerResaleStore.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    public class TicketsController : ControllerBase
    {

        private readonly SneakerResaleStoreContext _context;
        private readonly IQueryHandler _queryHandler;

        public TicketsController(SneakerResaleStoreContext context, IQueryHandler queryHandler)
        {
            _context = context;
            _queryHandler = queryHandler;
        }

        // GET: api/<TicketController>
        [HttpGet]
        public IActionResult Get([FromQuery] TicketsSearch search,
                                 [FromServices] ISearchTicketsQuery query)
        {
            return Ok(_queryHandler.HandleQuery(query, search));
        }

        // GET api/<TicketController>/5
        [HttpGet("{id}")]
        public IActionResult Get(int id,
                                 [FromServices] IFindTicketQuery query)
        {
            return Ok(_queryHandler.HandleQuery(query, id));
        }

        // POST api/<TicketController>
        [HttpPost]
        public IActionResult Post([FromBody] CreateTicketDTO dto,
                                  [FromServices] ICreateTicketCommand command)
        {
            command.Execute(dto);
            return StatusCode(201);
        }

        // PUT api/<TicketController>/5
        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody] UpdateTicketDTO dto,
            [FromServices] IUpdateTicketCommand command)
        {
            dto.Id = id;
            command.Execute(dto);
            return Ok();
        }

        // DELETE api/<TicketController>/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id, [FromServices] IDeleteTicketCommand command)
        {
            command.Execute(id);
            return NoContent();
        }
    }
}
