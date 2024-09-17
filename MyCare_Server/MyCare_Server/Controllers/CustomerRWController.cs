using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Mvc;
using MyCare_Server.Models;
using System;
using System.Collections.Generic;

namespace MyCare_Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomerRWController : ControllerBase
    {
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(Customer[]))]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public IActionResult Get()
        {
            try
            {
                List<Customer> customers = CustomerDB.ReadCustomer();
                return Ok(customers);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status400BadRequest, ex.Message);
            }
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created, Type = typeof(Customer))]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public IActionResult Post([FromBody] Customer value)
        {
            try
            {
                if (value == null)
                    return BadRequest(value);

                CustomerDB.AddCustomer(value);
                return CreatedAtAction(nameof(Get), new { id = value.id }, value);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public IActionResult Put([FromBody] Customer value)
        {
            try
            {
                if (value == null || value.id == 0)
                    return BadRequest(new { message = "Invalid customer data." });

                CustomerDB.UpdateCustomer(value);
                return Ok(new { message = "Customer updated successfully." });
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { message = "Failed to update customer.", error = ex.Message });
            }
        }

        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public IActionResult Delete(int id)
        {
            try
            {
                if (id == 0)
                    return BadRequest("Invalid customer ID");

                CustomerDB.DeleteCustomer(id);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("login")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(Customer))]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public IActionResult Login([FromBody] LoginRequest loginRequest)
        {
            try
            {
                var customers = CustomerDB.ReadCustomer();
                var customer = customers.FirstOrDefault(c => c.Email == loginRequest.Email && c.Password == loginRequest.Password);

                if (customer == null)
                {
                    return Unauthorized("Invalid email or password");
                }

                return Ok(customer);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }




    }
}
