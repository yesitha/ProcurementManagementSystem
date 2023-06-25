using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PWMSBackend.Migrations
{
    public partial class fix17 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(name: "PK_UserNotifications", table: "UserNotifications");

            migrationBuilder.AddColumn<string>(
                name: "NewNotificationId",
                table: "UserNotifications",
                type: "nvarchar(450)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.Sql("UPDATE UserNotifications SET NewNotificationId = CAST(notificationId AS NVARCHAR(450))");

            migrationBuilder.DropColumn(name: "notificationId", table: "UserNotifications");

            migrationBuilder.RenameColumn(
                name: "NewNotificationId",
                table: "UserNotifications",
                newName: "notificationId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_UserNotifications",
                table: "UserNotifications",
                column: "notificationId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(name: "PK_UserNotifications", table: "UserNotifications");

            migrationBuilder.AddColumn<int>(
                name: "NewNotificationId",
                table: "UserNotifications",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.Sql("UPDATE UserNotifications SET NewNotificationId = CAST(notificationId AS INT)");

            migrationBuilder.DropColumn(name: "notificationId", table: "UserNotifications");

            migrationBuilder.RenameColumn(
                name: "NewNotificationId",
                table: "UserNotifications",
                newName: "notificationId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_UserNotifications",
                table: "UserNotifications",
                column: "notificationId");
        }
    }
}
