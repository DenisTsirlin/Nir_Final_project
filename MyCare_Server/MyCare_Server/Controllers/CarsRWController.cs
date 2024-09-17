using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MyCare_Server.Models;

namespace MyCare_Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CarsRWController : ControllerBase
    {
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(Cars[]))]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]

        public IActionResult Get()

        {
            try
            {
                List<Cars> cars = CarsDB.ReadCar();
                return Ok(cars);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status400BadRequest, ex.Message);
            }
        }

        [HttpGet("{carNumber}")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(Cars))]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public IActionResult Get(string carNumber)
        {
            try
            {
                Cars car = CarsDB.ReadCarByCarNumber(carNumber);
                if (car == null)
                {
                    return NotFound($"Car with car number = {carNumber} was not found in Get by car number!");
                }
                return Ok(car);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created, Type = typeof(Cars))]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]

        public IActionResult Post([FromBody] Cars value)
        {
            try
            {
                if (value == null)
                    return BadRequest(value);

                CarsDB.AddCar(value);
                return CreatedAtAction(nameof(Get), new { carNumber = value.carNumber }, value);
            }

            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        [HttpPut("{carNumber}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]

        public IActionResult Put(string carNumber, [FromBody] Cars value)
        {
            try
            {
                if (value == null || value.carNumber != carNumber)
                {
                    return BadRequest("Invalid car data or car number mismatch.");
                }

                Cars existingCar = CarsDB.ReadCarByCarNumber(carNumber);
                if (existingCar == null)
                {
                    return NotFound($"Car with car number = {carNumber} was not found.");
                }

                existingCar.color = value.color;
                existingCar.numberOfKilometers = value.numberOfKilometers;

                CarsDB.UpdateCar(existingCar);

                return Ok(existingCar);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpDelete]
        [Route("~/del/{carNumber}")]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]

        public IActionResult Delete(string carNumber)
        {
            try
            {
                if (carNumber == null)
                    return NotFound("Car with car number = {carNumber} was not found to delete!");
                CarsDB.DeleteCar(carNumber);
                return NoContent();
            }

            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }



        }





    }
}
