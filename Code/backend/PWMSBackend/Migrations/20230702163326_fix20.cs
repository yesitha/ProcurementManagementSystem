using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PWMSBackend.Migrations
{
    public partial class fix20 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "MasterProcurementPlanStatuses");

            migrationBuilder.AddColumn<DateTime>(
                name: "StatusDate",
                table: "MasterProcurementPlans",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "StatusId",
                table: "MasterProcurementPlans",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_MasterProcurementPlans_StatusId",
                table: "MasterProcurementPlans",
                column: "StatusId");

            migrationBuilder.AddForeignKey(
                name: "FK_MasterProcurementPlans_Statuses_StatusId",
                table: "MasterProcurementPlans",
                column: "StatusId",
                principalTable: "Statuses",
                principalColumn: "StatusId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_MasterProcurementPlans_Statuses_StatusId",
                table: "MasterProcurementPlans");

            migrationBuilder.DropIndex(
                name: "IX_MasterProcurementPlans_StatusId",
                table: "MasterProcurementPlans");

            migrationBuilder.DropColumn(
                name: "StatusDate",
                table: "MasterProcurementPlans");

            migrationBuilder.DropColumn(
                name: "StatusId",
                table: "MasterProcurementPlans");

            migrationBuilder.CreateTable(
                name: "MasterProcurementPlanStatuses",
                columns: table => new
                {
                    MppId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    StatusId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Date = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MasterProcurementPlanStatuses", x => new { x.MppId, x.StatusId });
                    table.ForeignKey(
                        name: "FK_MasterProcurementPlanStatuses_MasterProcurementPlans_MppId",
                        column: x => x.MppId,
                        principalTable: "MasterProcurementPlans",
                        principalColumn: "MppId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_MasterProcurementPlanStatuses_Statuses_StatusId",
                        column: x => x.StatusId,
                        principalTable: "Statuses",
                        principalColumn: "StatusId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_MasterProcurementPlanStatuses_StatusId",
                table: "MasterProcurementPlanStatuses",
                column: "StatusId");
        }
    }
}
