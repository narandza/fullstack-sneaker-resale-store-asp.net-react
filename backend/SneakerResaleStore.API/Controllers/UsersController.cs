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
    public class UsersController : ControllerBase
    {
        private readonly IQueryHandler _queryHandler;

        public UsersController(IQueryHandler queryHandler)
        {
            _queryHandler = queryHandler;
        }

        // GET: api/<UsersController>
        [HttpGet]
        public IActionResult Get([FromQuery] UserSearch search,
                                 [FromServices] ISearchUsersQuery query)
        {
            return Ok(_queryHandler.HandleQuery(query, search));
        }

        // GET api/<UsersController>/5
        [HttpGet("{id}")]
        public IActionResult Get(int id,
                                 [FromServices] IFindUserQuery query)
        {
            return Ok(_queryHandler.HandleQuery(query, id));
        }

        // POST api/<UsersController>
        [HttpPost]
        public IActionResult Post([FromBody] RegisterUserDTO dto,
                                  [FromServices] IRegisterUserCommand command)
        {
            command.Execute(dto);
            return StatusCode(201);
        }

        // PUT api/<UsersController>/5
        [HttpPut("{id}")]

        public IActionResult Put(int id, [FromBody] UpdateUserDTO dto,
                                         [FromServices] IUpdateUserCommand command)
        {
            dto.Id = id;
            command.Execute(dto);
            return Ok();
        }


        // DELETE api/<UsersController>/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id, [FromServices] IDeleteUserCommand command)
        {
            command.Execute(id);
            return NoContent();
        }
    }
}
