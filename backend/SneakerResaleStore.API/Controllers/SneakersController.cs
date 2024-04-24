using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SneakerResaleStore.API.ErrorLogging;
using SneakerResaleStore.Application.Logging.ErrorLogging;
using SneakerResaleStore.Application.UseCaseHandling;
using SneakerResaleStore.Application.UseCases.Commands;
using SneakerResaleStore.Application.UseCases.DTO;
using SneakerResaleStore.Application.UseCases.Queries;
using SneakerResaleStore.Application.UseCases.Queries.Searches;
using SneakerResaleStore.DataAccess;
using System.Collections;
using System.Collections.Generic;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace SneakerResaleStore.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    
    
    public class SneakersController : ControllerBase
    {
        private readonly SneakerResaleStoreContext _context;
        private readonly IQueryHandler _queryHandler;

        public SneakersController(SneakerResaleStoreContext context, IQueryHandler queryHandler)
        {
            _context = context;
            _queryHandler = queryHandler;
        }

        // GET: api/<SneakersController>
        [HttpGet]
        public IActionResult Get([FromQuery] SneakerSearch search,
                                 [FromServices] ISearchSneakersQuery query)
        {
               
                return Ok(_queryHandler.HandleQuery(query, search));
        }

        // GET api/<SneakersController>/5
        [HttpGet("{id}")]
        public IActionResult Get(int id,
                                 [FromServices] IFindSneakerQuery query)
        {
            return Ok(_queryHandler.HandleQuery(query,id));
        }

        // POST api/<SneakersController>
        [HttpPost]
        public IActionResult Post([FromBody] CreateSneakerDTO dto,
                                  [FromServices] ICreateSneakerCommand command)
        {
            command.Execute(dto);
            return StatusCode(201);
        }

        // PUT api/<SneakersController>/5
        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody] UpdateSneakerDTO dto,
                                         [FromServices] IUpdateSneakerCommand command)
        {
            dto.Id = id;
            command.Execute(dto);
            return Ok();
        }

        // DELETE api/<SneakersController>/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id, [FromServices] IDeleteSneakerCommand command)
        {
            command.Execute(id);
            return NoContent();
        }
    }
}
