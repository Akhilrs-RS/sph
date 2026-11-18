using Microsoft.AspNetCore.Mvc;
using Aura.Dropship.Api.Models.DTOs;
using Aura.Dropship.Api.Services;

namespace Aura.Dropship.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PincodeController : ControllerBase
{
    private readonly IPincodeService _pincodeService;

    public PincodeController(IPincodeService pincodeService)
    {
        _pincodeService = pincodeService;
    }

    [HttpGet("{code}")]
    public async Task<ActionResult<PincodeResultDto>> GetPincode(string code)
    {
        if (string.IsNullOrWhiteSpace(code) || code.Trim().Length != 6)
        {
            return BadRequest("Pincode must be a 6-digit Indian PIN number.");
        }

        var result = await _pincodeService.ResolveAsync(code);
        return Ok(result);
    }
}

