using Microsoft.EntityFrameworkCore.Migrations;

namespace Tortilla.Hackathon.Data.Migrations
{
    public partial class AddOriginAndDestinationDescription : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "DestinationDescription",
                table: "Trips",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "OriginDescription",
                table: "Trips",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DestinationDescription",
                table: "Trips");

            migrationBuilder.DropColumn(
                name: "OriginDescription",
                table: "Trips");
        }
    }
}
