using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ProcurementManagementBackend.Migrations
{
    /// <inheritdoc />
    public partial class InitialCraete : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Committee",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    committeeName = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Committee", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Employees",
                columns: table => new
                {
                    employeeId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    employeeFirstName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    employeeLastName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    committeeId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    employeeDesignation = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Employees", x => x.employeeId);
                    table.ForeignKey(
                        name: "FK_Employees_Committee_committeeId",
                        column: x => x.committeeId,
                        principalTable: "Committee",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Employees_committeeId",
                table: "Employees",
                column: "committeeId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Employees");

            migrationBuilder.DropTable(
                name: "Committee");
        }
    }
}
