using Microsoft.EntityFrameworkCore.Migrations;

namespace SneakerResaleStore.DataAccess.Migrations
{
    public partial class SnekaerSizeFix : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_SneakerSizes_Sneakers_SneakerId",
                table: "SneakerSizes");

            migrationBuilder.AddForeignKey(
                name: "FK_SneakerSizes_Sneakers_SneakerId",
                table: "SneakerSizes",
                column: "SneakerId",
                principalTable: "Sneakers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_SneakerSizes_Sneakers_SneakerId",
                table: "SneakerSizes");

            migrationBuilder.AddForeignKey(
                name: "FK_SneakerSizes_Sneakers_SneakerId",
                table: "SneakerSizes",
                column: "SneakerId",
                principalTable: "Sneakers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
