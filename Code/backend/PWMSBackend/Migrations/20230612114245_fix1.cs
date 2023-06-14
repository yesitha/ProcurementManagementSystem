using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PWMSBackend.Migrations
{
    public partial class fix1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_SubProcurementPlans_FinalizedMasterProcurementPlans_FinalizedMasterProcuementPlanFmppId",
                table: "SubProcurementPlans");

            migrationBuilder.DropForeignKey(
                name: "FK_SubProcurementPlans_MasterProcurementPlans_MasterProcurementPlanMppId",
                table: "SubProcurementPlans");

            migrationBuilder.AlterColumn<string>(
                name: "MasterProcurementPlanMppId",
                table: "SubProcurementPlans",
                type: "nvarchar(450)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)");

            migrationBuilder.AlterColumn<string>(
                name: "FinalizedMasterProcuementPlanFmppId",
                table: "SubProcurementPlans",
                type: "nvarchar(450)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)");

            migrationBuilder.AddForeignKey(
                name: "FK_SubProcurementPlans_FinalizedMasterProcurementPlans_FinalizedMasterProcuementPlanFmppId",
                table: "SubProcurementPlans",
                column: "FinalizedMasterProcuementPlanFmppId",
                principalTable: "FinalizedMasterProcurementPlans",
                principalColumn: "FmppId");

            migrationBuilder.AddForeignKey(
                name: "FK_SubProcurementPlans_MasterProcurementPlans_MasterProcurementPlanMppId",
                table: "SubProcurementPlans",
                column: "MasterProcurementPlanMppId",
                principalTable: "MasterProcurementPlans",
                principalColumn: "MppId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_SubProcurementPlans_FinalizedMasterProcurementPlans_FinalizedMasterProcuementPlanFmppId",
                table: "SubProcurementPlans");

            migrationBuilder.DropForeignKey(
                name: "FK_SubProcurementPlans_MasterProcurementPlans_MasterProcurementPlanMppId",
                table: "SubProcurementPlans");

            migrationBuilder.AlterColumn<string>(
                name: "MasterProcurementPlanMppId",
                table: "SubProcurementPlans",
                type: "nvarchar(450)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(450)",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "FinalizedMasterProcuementPlanFmppId",
                table: "SubProcurementPlans",
                type: "nvarchar(450)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(450)",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_SubProcurementPlans_FinalizedMasterProcurementPlans_FinalizedMasterProcuementPlanFmppId",
                table: "SubProcurementPlans",
                column: "FinalizedMasterProcuementPlanFmppId",
                principalTable: "FinalizedMasterProcurementPlans",
                principalColumn: "FmppId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_SubProcurementPlans_MasterProcurementPlans_MasterProcurementPlanMppId",
                table: "SubProcurementPlans",
                column: "MasterProcurementPlanMppId",
                principalTable: "MasterProcurementPlans",
                principalColumn: "MppId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
