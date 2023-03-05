namespace ProcurementManagementBackend.Data
{
    public class DataContext:DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {

        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            base.OnConfiguring(optionsBuilder);
            optionsBuilder.UseSqlServer("Server=MSI-GF63;Database=procurementManagementSystemdb;Trusted_Connection=True;TrustServerCertificate=true;");
        }

        public DbSet<Employee> Employees { get; set; }
    }
}

