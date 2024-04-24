using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SneakerResaleStore.Application.UseCaseHandling;
using SneakerResaleStore.Application.UseCases.Commands;
using SneakerResaleStore.Application.UseCases.DTO;
using SneakerResaleStore.Application.UseCases.Queries;
using SneakerResaleStore.Application.UseCases.Queries.Searches;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace SneakerResaleStore.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    //[Authorize]
    public class RolesController : ControllerBase
    {
        private readonly IQueryHandler _queryHandler;

        public RolesController(IQueryHandler queryHandler)
        {
            _queryHandler = queryHandler;
        }

        // GET: api/<RolesController>
        [HttpGet]
        public IActionResult Get([FromQuery] RoleSearch search,
                                 [FromServices] ISearchRolesQuery query)
        {
            return Ok(_queryHandler.HandleQuery(query, search));
        }


        // GET api/<RolesController>/5
        [HttpGet("{id}")]
        public IActionResult Get(int id,
                                 [FromServices] IFindRoleQuery query)
        {
            return Ok(_queryHandler.HandleQuery(query, id));
        }


        // POST api/<RolesController>
        [HttpPost]
        public IActionResult Post([FromBody] CreateRoleDTO dto,
                                  [FromServices] ICreateRoleCommand command)
        {
            command.Execute(dto);
            return StatusCode(201);
        }

        // PUT api/<RolesController>/5
        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody] UpdateRoleDTO dto,
                                         [FromServices] IUpdateRoleCommand command)
        {
            dto.Id = id;
            command.Execute(dto);
            return Ok();
        }

        // DELETE api/<RolesController>/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id, [FromServices] IDeleteRoleCommand command)
        {
            command.Execute(id);
            return NoContent();
        }
    }
}
