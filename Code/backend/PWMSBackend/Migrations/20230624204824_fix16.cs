using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PWMSBackend.Migrations
{
    public partial class fix16 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<double>(
                name: "Total",
                table: "Invoices",
                type: "float",
                nullable: false,
                defaultValue: 0.0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Total",
                table: "Invoices");
        }
    }
}
