using Application.DTO.PharmacyMedicineDTO;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Domain.Entites;
using Microsoft.AspNetCore.Authorization;
using WebApi.Middleware;

namespace WebApi.Controllers;

[ApiController]
    
[Route("api/[controller]")]
    
public class PharmacyMedicineController : ControllerBase
{
    private readonly IMediator _mediator;

    public PharmacyMedicineController(IMediator mediator)
    {
        _mediator = mediator;
    }
    
        
    [HttpGet("Pharmacy/{pharmacyId:int}")]
    public async Task<IActionResult> GetMedicineByPharmacy( int pharmacyId,  [FromQuery] int? pageNumber, [FromQuery] int? pageSize){
        throw new Exception();
    }
    
    [HttpGet("Medicine/{medicineId:int}")]
    public async Task<IActionResult> GetPharmacyByMedicine( int medicineId, [FromQuery] int? pageNumber, [FromQuery] int? pageSize, [FromQuery] double? lattitude, [FromQuery] double? longitude){
        throw new Exception();
    }
    
    
    [Authorize]
    [HttpPost]
    public async Task<IActionResult> CreatePharmacyMedicine(int pharmacyMedicineId){
        throw new Exception();

    }
    
    [Authorize]
    [HttpPut("{pharmacyMedicineId:int}")]
    public async Task<IActionResult> UpdatePharmacyMedicine(int pharmacyMedicineId){
        throw new Exception();
    }
    
    [Authorize]
    [HttpDelete("{pharmacyMedicineId:int}")]
    public async Task<IActionResult> DeletePharmacyMedicine(int pharmacyMedicineId){
        throw new Exception();
    }

}