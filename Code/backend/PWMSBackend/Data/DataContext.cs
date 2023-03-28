using Microsoft.EntityFrameworkCore;
using PWMSBackend.Models;

namespace PWMSBackend.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {
        }

        public DbSet<ProcurementEmployee> ProcurementEmployees { get; set; } = null!;
    }
}