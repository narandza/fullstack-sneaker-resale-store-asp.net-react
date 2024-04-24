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
    public class OrdersController : ControllerBase
    {
        private readonly SneakerResaleStoreContext _context;
        private readonly IQueryHandler _queryHandler;

        public OrdersController(SneakerResaleStoreContext context, IQueryHandler queryHandler)
        {
            _context = context;
            _queryHandler = queryHandler;
        }

        // GET: api/<OrderController>
        [HttpGet]
        public IActionResult Get([FromQuery] OrderSearch search,
                                 [FromServices] ISearchOrdersQuery query)
        {
            return Ok(_queryHandler.HandleQuery(query, search));
        }

        // GET api/<OrderController>/5
        [HttpGet("{id}")]
        public IActionResult Get(int id,
                                 [FromServices] IFindOrderQuery query)
        {
            return Ok(_queryHandler.HandleQuery(query, id));
        }

        // POST api/<OrderController>
        [HttpPost]
        public IActionResult Post([FromBody] CreateOrderDTO dto,
                                  [FromServices] ICreateOrderCommand command)
        {
            command.Execute(dto);
            return StatusCode(201);
        }

        // PUT api/<OrderController>/5
        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody] UpdateOrderDTO dto,
                                [FromServices] IUpdateOrderCommand command)
        {
            dto.Id = id;
            command.Execute(dto);
            return Ok();
        }

        // DELETE api/<OrderController>/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id, [FromServices] IDeleteOrderCommand command)
        {
            command.Execute(id);
            return NoContent();
        }
    }
}
