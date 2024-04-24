using Microsoft.EntityFrameworkCore.Migrations;

namespace SneakerResaleStore.DataAccess.Migrations
{
    public partial class namefix : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_RoleUseCase_Roles_RoleId",
                table: "RoleUseCase");

            migrationBuilder.DropPrimaryKey(
                name: "PK_RoleUseCase",
                table: "RoleUseCase");

            migrationBuilder.RenameTable(
                name: "RoleUseCase",
                newName: "RoleUseCases");

            migrationBuilder.AddPrimaryKey(
                name: "PK_RoleUseCases",
                table: "RoleUseCases",
                columns: new[] { "RoleId", "UseCaseId" });

            migrationBuilder.AddForeignKey(
                name: "FK_RoleUseCases_Roles_RoleId",
                table: "RoleUseCases",
                column: "RoleId",
                principalTable: "Roles",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_RoleUseCases_Roles_RoleId",
                table: "RoleUseCases");

            migrationBuilder.DropPrimaryKey(
                name: "PK_RoleUseCases",
                table: "RoleUseCases");

            migrationBuilder.RenameTable(
                name: "RoleUseCases",
                newName: "RoleUseCase");

            migrationBuilder.AddPrimaryKey(
                name: "PK_RoleUseCase",
                table: "RoleUseCase",
                columns: new[] { "RoleId", "UseCaseId" });

            migrationBuilder.AddForeignKey(
                name: "FK_RoleUseCase_Roles_RoleId",
                table: "RoleUseCase",
                column: "RoleId",
                principalTable: "Roles",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
