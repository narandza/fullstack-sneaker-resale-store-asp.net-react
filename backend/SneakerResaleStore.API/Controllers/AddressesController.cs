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
    [Authorize]
    public class AddressesController : ControllerBase
    {
        private readonly SneakerResaleStoreContext _context;
        private readonly IQueryHandler _queryHandler;

        public AddressesController(SneakerResaleStoreContext context, IQueryHandler queryHandler)
        {
            _context = context;
            _queryHandler = queryHandler;
        }

        // GET: api/<AddressesController>
        [HttpGet]
        public IActionResult Get([FromQuery] AddressesSearch search,
                                 [FromServices] ISearchAddressesQuery query)
        {
            return Ok(_queryHandler.HandleQuery(query, search));
        }

        // GET api/<AddressesController>/5
        [HttpGet("{id}")]
        public IActionResult Get(int id,
                                 [FromServices]IFindAddressQuery query)
        {
            return Ok(_queryHandler.HandleQuery(query, id));
        }

        // POST api/<AddressesController>
        [HttpPost]
        public IActionResult Post([FromBody] CreateAddressDTO dto,
                                  [FromServices] ICreateAddressCommand command)
        {
            command.Execute(dto);
            return StatusCode(201);
        }

        // PUT api/<AddressesController>/5
        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody] UpdateAddressDTO dto,
                                  [FromServices] IUpdateAddressCommand command)
        {
            dto.Id = id;
            command.Execute(dto);
            return Ok();
        }

        // DELETE api/<AddressesController>/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id, [FromServices] IDeleteAddressCommand command)
        {
            command.Execute(id);
            return NoContent();
        }
    }
}
