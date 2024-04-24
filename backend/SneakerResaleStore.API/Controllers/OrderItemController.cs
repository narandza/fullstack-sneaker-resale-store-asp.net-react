using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SneakerResaleStore.Application.UseCases.Commands;
using SneakerResaleStore.Application.UseCases.DTO;
using SneakerResaleStore.Application.UseCases.Queries;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace SneakerResaleStore.API.Controllers
{
    [Route("api/orders/[controller]")]
    [ApiController]
    [Authorize]
    public class OrderItemController : ControllerBase
    {

        // POST api/<OrderItemController>
        [HttpPost]
        public IActionResult Post([FromBody] AddOrderItemDTO dto,
                                   [FromServices] IAddToOrderCommand command)
        {
            command.Execute(dto);
            return StatusCode(201);
        }

        // DELETE api/<OrderItemController>/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id, [FromServices] IRemoveFromOrderCommand command)
        {
            command.Execute(id);
            return NoContent();
        }
    }
}
