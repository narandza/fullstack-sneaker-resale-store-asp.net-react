using Microsoft.EntityFrameworkCore.Migrations;

namespace SneakerResaleStore.DataAccess.Migrations
{
    public partial class roleusecase : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_RoleUseCases_Roles_RoleId",
                table: "RoleUseCases");

            migrationBuilder.AddForeignKey(
                name: "FK_RoleUseCases_Roles_RoleId",
                table: "RoleUseCases",
                column: "RoleId",
                principalTable: "Roles",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_RoleUseCases_Roles_RoleId",
                table: "RoleUseCases");

            migrationBuilder.AddForeignKey(
                name: "FK_RoleUseCases_Roles_RoleId",
                table: "RoleUseCases",
                column: "RoleId",
                principalTable: "Roles",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
