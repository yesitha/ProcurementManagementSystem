using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PWMSBackend.Migrations
{
    public partial class fix11 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ProofDocument",
                table: "VendorPlaceBidItems");

            migrationBuilder.AddColumn<string>(
                name: "LetterOfAcceptance",
                table: "VendorPlaceBidItems",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "LetterOfAcceptance",
                table: "VendorPlaceBidItems");

            migrationBuilder.AddColumn<byte[]>(
                name: "ProofDocument",
                table: "VendorPlaceBidItems",
                type: "varbinary(max)",
                nullable: true);
        }
    }
}
