using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SneakerResaleStore.Application.UseCaseHandling;
using SneakerResaleStore.Application.UseCases.Commands;
using SneakerResaleStore.Application.UseCases.DTO;
using SneakerResaleStore.Application.UseCases.Queries;
using SneakerResaleStore.Application.UseCases.Queries.Searches;
using SneakerResaleStore.DataAccess;
using SneakerResaleStore.Implementation.UseCases.Commands.BrandCommands;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace SneakerResaleStore.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    public class BrandsController : ControllerBase
    {
        private readonly SneakerResaleStoreContext _context;
        private readonly IQueryHandler _queryHandler;

        public BrandsController(SneakerResaleStoreContext context, IQueryHandler queryHandler)
        {
            _context = context;
            _queryHandler = queryHandler;
        }

        // GET: api/<BrandsController>
        [HttpGet]
        public IActionResult Get([FromQuery] BrandSearch search,
                                 [FromServices] ISearchBrandsQuery query)
        {
            return Ok(_queryHandler.HandleQuery(query, search));
        }

        // GET api/<BrandsController>/5
        [HttpGet("{id}")]
        public IActionResult Get(int id,
                                 [FromServices] IFindBrandQuery query)
        {
            return Ok(_queryHandler.HandleQuery(query, id));
        }

        // POST api/<BrandsController>
        [HttpPost]
        public IActionResult Post([FromBody] CreateBrandDTO dto,
                                  [FromServices] ICreateBrandCommand command)
        {
            command.Execute(dto);
            return StatusCode(201);
        }

        // PUT api/<BrandsController>/5
        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody] UpdateBrandDTO dto,
                                [FromServices] IUpdateBrandCommand command)
        {
            dto.Id = id;
            command.Execute(dto);
            return Ok();
        }

        // DELETE api/<BrandsController>/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id, [FromServices] IDeleteBrandCommand command)
        {
            command.Execute(id);
            return NoContent();
        }
    }
}
