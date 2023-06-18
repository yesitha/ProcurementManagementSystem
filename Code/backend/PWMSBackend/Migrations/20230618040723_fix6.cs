using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PWMSBackend.Migrations
{
    public partial class fix6 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<double>(
                name: "GrandTotal",
                table: "FinalizedMasterProcurementPlans",
                type: "float",
                nullable: true,
                oldClrType: typeof(double),
                oldType: "float");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<double>(
                name: "GrandTotal",
                table: "FinalizedMasterProcurementPlans",
                type: "float",
                nullable: false,
                defaultValue: 0.0,
                oldClrType: typeof(double),
                oldType: "float",
                oldNullable: true);
        }
    }
}
