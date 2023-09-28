using Application.DTO.MedicineDTO;
using Application.Features.AuthFeature.Requests;
using Application.Features.MedicineFeature.Requests;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Application.Model;
using Domain.Entites;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http.HttpResults;
using WebApi.Middleware;

namespace WebApi.Controllers;

    [ApiController]
    
    [Route("api/[controller]")]
    
    public class MedicineController : ControllerBase
    {
        private readonly IMediator _mediator;
        public MedicineController(IMediator mediator){
            _mediator = mediator;
        }
        
        
        [HttpGet]
        public async Task<IActionResult> GetMedicine([FromQuery] int? pageNumber, [FromQuery] int? pageSize, [FromQuery] string? name, [FromQuery] string? orderedBy){
            var query = new GetMedicineRequest() { Name = name ?? "", PageNumber = pageNumber ?? 0, PageSize = pageSize ?? 15 };
            var response = await _mediator.Send(query);
            return ResponseHandler<List<MedicineDTO>>.HandleResponse(response, 200);
        }
        

        [HttpGet("{medicineId:int}")]
        public async Task<IActionResult> GetMedicineById(int medicineId){
            throw new Exception();
        }


        [Authorize]
        [HttpPost]
        public async Task<IActionResult> CreateMedicine( CreateMedicineDTO body){
            string token = Request.Headers["Authorization"].FirstOrDefault()?.Replace("Bearer ", "");
            var command = new CreateMedicineRequest() { Body = body, Token = token };
            var response = await _mediator.Send(command);
            return ResponseHandler<Medicine>.HandleResponse(response, 201);
        }
        
        
        
        [Authorize]
        [HttpPut("{medicineId:int}")]
        public async Task<IActionResult> UpdateMedicine(int medicineId){
            throw new Exception();
        }
        
        
        [Authorize]
        [HttpDelete("{medicineId:int}")]
        public async Task<IActionResult> DeleteMedicine(int medicineId){
            throw new Exception();
        }

    }
