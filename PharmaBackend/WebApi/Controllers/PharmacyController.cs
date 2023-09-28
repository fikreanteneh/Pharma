using Application.DTO.PharmacyDTO;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Domain.Entites;
using Microsoft.AspNetCore.Authorization;
using WebApi.Middleware;

namespace WebApi.Controllers;

[ApiController]
    
[Route("api/[controller]")]
    
public class PharmacyController : ControllerBase
{
    private readonly IMediator _mediator;

    public PharmacyController(IMediator mediator)
    {
        _mediator = mediator;
    }
    
        
    [HttpGet]
    public async Task<IActionResult> GetReleveantPharmacy([FromQuery] int? pageNumber, [FromQuery] int? pageSize, [FromQuery] double? lattitude, double? longitude){
        throw new Exception();
    }
    
    [HttpGet("Search")]
    public async Task<IActionResult> GetPharamcy([FromQuery] int? pageNumber, [FromQuery] int? pageSize, [FromQuery] string? name, [FromQuery] double? lattitude, double? longitude){
        throw new Exception();
    }

    [HttpGet("{pharmacyId:int}")]
    public async Task<IActionResult> GetPharmacyById(int pharmacyId){
        throw new Exception();
    }
    
    
    [Authorize]
    [HttpPut("{pharmacyId:int}")]
    public async Task<IActionResult> UpdatePharmacy(int pharmacyId){
        throw new Exception();
    }
    
    
    [Authorize]
    [HttpDelete("{pharmacyId:int}")]
    public async Task<IActionResult> DeletePharmacy(int pharmacyId){
        throw new Exception();
    }

}