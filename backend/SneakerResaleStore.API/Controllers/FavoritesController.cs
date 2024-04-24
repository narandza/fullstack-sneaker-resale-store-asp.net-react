using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SneakerResaleStore.Application.UseCaseHandling;
using SneakerResaleStore.Application.UseCases.Commands;
using SneakerResaleStore.Application.UseCases.Queries;
using SneakerResaleStore.Application.UseCases.Queries.Searches;
using SneakerResaleStore.DataAccess;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace SneakerResaleStore.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class FavoritesController : ControllerBase
    {
        private readonly SneakerResaleStoreContext _context;
        private readonly IQueryHandler _queryHandler;

        public FavoritesController(SneakerResaleStoreContext context, IQueryHandler queryHandler)
        {
            _context = context;
            _queryHandler = queryHandler;
        }

        // GET: api/<FavoritesController>
        [HttpGet]
        public IActionResult Get([FromQuery] FavoritesSearch search,
                                 [FromServices] IGetFavoritesQuery query)
        {
            return Ok(_queryHandler.HandleQuery(query, search));
        }

        // POST api/<FavoritesController>
        [HttpPost("{id}")]
        public IActionResult Post(int id,
                                  [FromServices] IAddToFavoritesCommand command)
        {
            command.Execute(id);
            return StatusCode(201);
        }

  

        // DELETE api/<FavoritesController>/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id, [FromServices] IRemoveFromFavorites command)
        {
            command.Execute(id);
            return NoContent();
        }
    }
}
