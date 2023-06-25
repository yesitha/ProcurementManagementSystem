using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PWMSBackend.Migrations
{
    public partial class fix18 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_UserNotifications_ProcurementEmployees_ProcurementEmployeeEmployeeId",
                table: "UserNotifications");

            migrationBuilder.DropIndex(
                name: "IX_UserNotifications_ProcurementEmployeeEmployeeId",
                table: "UserNotifications");

            migrationBuilder.DropColumn(
                name: "ProcurementEmployeeEmployeeId",
                table: "UserNotifications");

            migrationBuilder.CreateTable(
                name: "UserNotificationProcurementEmployees",
                columns: table => new
                {
                    NotificationId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    ProcurementEmployeeId = table.Column<string>(type: "nvarchar(450)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserNotificationProcurementEmployees", x => new { x.NotificationId, x.ProcurementEmployeeId });
                    table.ForeignKey(
                        name: "FK_UserNotificationProcurementEmployees_ProcurementEmployees_ProcurementEmployeeId",
                        column: x => x.ProcurementEmployeeId,
                        principalTable: "ProcurementEmployees",
                        principalColumn: "EmployeeId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_UserNotificationProcurementEmployees_UserNotifications_NotificationId",
                        column: x => x.NotificationId,
                        principalTable: "UserNotifications",
                        principalColumn: "notificationId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_UserNotificationProcurementEmployees_ProcurementEmployeeId",
                table: "UserNotificationProcurementEmployees",
                column: "ProcurementEmployeeId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "UserNotificationProcurementEmployees");

            migrationBuilder.AddColumn<string>(
                name: "ProcurementEmployeeEmployeeId",
                table: "UserNotifications",
                type: "nvarchar(450)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateIndex(
                name: "IX_UserNotifications_ProcurementEmployeeEmployeeId",
                table: "UserNotifications",
                column: "ProcurementEmployeeEmployeeId");

            migrationBuilder.AddForeignKey(
                name: "FK_UserNotifications_ProcurementEmployees_ProcurementEmployeeEmployeeId",
                table: "UserNotifications",
                column: "ProcurementEmployeeEmployeeId",
                principalTable: "ProcurementEmployees",
                principalColumn: "EmployeeId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
