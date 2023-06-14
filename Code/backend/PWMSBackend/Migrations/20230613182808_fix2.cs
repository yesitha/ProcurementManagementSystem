using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PWMSBackend.Migrations
{
    public partial class fix2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_MasterProcurementPlans_Committees_BidOpeningCommitteeId",
                table: "MasterProcurementPlans");

            migrationBuilder.DropForeignKey(
                name: "FK_MasterProcurementPlans_Committees_TecCommitteeId",
                table: "MasterProcurementPlans");

            migrationBuilder.DropIndex(
                name: "IX_MasterProcurementPlans_BidOpeningCommitteeId",
                table: "MasterProcurementPlans");

            migrationBuilder.DropIndex(
                name: "IX_MasterProcurementPlans_TecCommitteeId",
                table: "MasterProcurementPlans");

            migrationBuilder.AlterColumn<string>(
                name: "TecCommitteeId",
                table: "MasterProcurementPlans",
                type: "nvarchar(450)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)");

            migrationBuilder.AlterColumn<string>(
                name: "BidOpeningCommitteeId",
                table: "MasterProcurementPlans",
                type: "nvarchar(450)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)");

            migrationBuilder.CreateIndex(
                name: "IX_MasterProcurementPlans_BidOpeningCommitteeId",
                table: "MasterProcurementPlans",
                column: "BidOpeningCommitteeId",
                unique: true,
                filter: "[BidOpeningCommitteeId] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_MasterProcurementPlans_TecCommitteeId",
                table: "MasterProcurementPlans",
                column: "TecCommitteeId",
                unique: true,
                filter: "[TecCommitteeId] IS NOT NULL");

            migrationBuilder.AddForeignKey(
                name: "FK_MasterProcurementPlans_Committees_BidOpeningCommitteeId",
                table: "MasterProcurementPlans",
                column: "BidOpeningCommitteeId",
                principalTable: "Committees",
                principalColumn: "CommitteeId");

            migrationBuilder.AddForeignKey(
                name: "FK_MasterProcurementPlans_Committees_TecCommitteeId",
                table: "MasterProcurementPlans",
                column: "TecCommitteeId",
                principalTable: "Committees",
                principalColumn: "CommitteeId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_MasterProcurementPlans_Committees_BidOpeningCommitteeId",
                table: "MasterProcurementPlans");

            migrationBuilder.DropForeignKey(
                name: "FK_MasterProcurementPlans_Committees_TecCommitteeId",
                table: "MasterProcurementPlans");

            migrationBuilder.DropIndex(
                name: "IX_MasterProcurementPlans_BidOpeningCommitteeId",
                table: "MasterProcurementPlans");

            migrationBuilder.DropIndex(
                name: "IX_MasterProcurementPlans_TecCommitteeId",
                table: "MasterProcurementPlans");

            migrationBuilder.AlterColumn<string>(
                name: "TecCommitteeId",
                table: "MasterProcurementPlans",
                type: "nvarchar(450)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(450)",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "BidOpeningCommitteeId",
                table: "MasterProcurementPlans",
                type: "nvarchar(450)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(450)",
                oldNullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_MasterProcurementPlans_BidOpeningCommitteeId",
                table: "MasterProcurementPlans",
                column: "BidOpeningCommitteeId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_MasterProcurementPlans_TecCommitteeId",
                table: "MasterProcurementPlans",
                column: "TecCommitteeId",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_MasterProcurementPlans_Committees_BidOpeningCommitteeId",
                table: "MasterProcurementPlans",
                column: "BidOpeningCommitteeId",
                principalTable: "Committees",
                principalColumn: "CommitteeId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_MasterProcurementPlans_Committees_TecCommitteeId",
                table: "MasterProcurementPlans",
                column: "TecCommitteeId",
                principalTable: "Committees",
                principalColumn: "CommitteeId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
