using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PWMSBackend.Migrations
{
    public partial class fix3 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Items_Categories_CategoryId",
                table: "Items");

            migrationBuilder.DropForeignKey(
                name: "FK_Items_Categories_ItemInStock_CategoryId",
                table: "Items");

            migrationBuilder.DropForeignKey(
                name: "FK_Items_Categories_ItemTobeShipped_CategoryId",
                table: "Items");

            migrationBuilder.DropIndex(
                name: "IX_Items_ItemInStock_CategoryId",
                table: "Items");

            migrationBuilder.DropIndex(
                name: "IX_Items_ItemTobeShipped_CategoryId",
                table: "Items");

            migrationBuilder.DropColumn(
                name: "ItemInStock_CategoryId",
                table: "Items");

            migrationBuilder.DropColumn(
                name: "ItemTobeShipped_CategoryId",
                table: "Items");

            migrationBuilder.AlterColumn<string>(
                name: "CategoryId",
                table: "Items",
                type: "nvarchar(450)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(450)",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Items_Categories_CategoryId",
                table: "Items",
                column: "CategoryId",
                principalTable: "Categories",
                principalColumn: "CategoryId",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Items_Categories_CategoryId",
                table: "Items");

            migrationBuilder.AlterColumn<string>(
                name: "CategoryId",
                table: "Items",
                type: "nvarchar(450)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)");

            migrationBuilder.AddColumn<string>(
                name: "ItemInStock_CategoryId",
                table: "Items",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ItemTobeShipped_CategoryId",
                table: "Items",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Items_ItemInStock_CategoryId",
                table: "Items",
                column: "ItemInStock_CategoryId");

            migrationBuilder.CreateIndex(
                name: "IX_Items_ItemTobeShipped_CategoryId",
                table: "Items",
                column: "ItemTobeShipped_CategoryId");

            migrationBuilder.AddForeignKey(
                name: "FK_Items_Categories_CategoryId",
                table: "Items",
                column: "CategoryId",
                principalTable: "Categories",
                principalColumn: "CategoryId");

            migrationBuilder.AddForeignKey(
                name: "FK_Items_Categories_ItemInStock_CategoryId",
                table: "Items",
                column: "ItemInStock_CategoryId",
                principalTable: "Categories",
                principalColumn: "CategoryId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Items_Categories_ItemTobeShipped_CategoryId",
                table: "Items",
                column: "ItemTobeShipped_CategoryId",
                principalTable: "Categories",
                principalColumn: "CategoryId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
