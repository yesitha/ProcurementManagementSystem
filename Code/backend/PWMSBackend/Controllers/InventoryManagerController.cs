using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PWMSBackend.Data;

namespace PWMSBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InventoryManagerController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public InventoryManagerController(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }




    }
}
