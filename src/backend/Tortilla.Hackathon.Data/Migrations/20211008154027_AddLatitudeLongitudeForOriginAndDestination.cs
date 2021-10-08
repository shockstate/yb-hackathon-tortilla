using Microsoft.EntityFrameworkCore.Migrations;

namespace Tortilla.Hackathon.Data.Migrations
{
    public partial class AddLatitudeLongitudeForOriginAndDestination : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Origin",
                table: "Trips",
                newName: "OriginLongitude");

            migrationBuilder.RenameColumn(
                name: "Destination",
                table: "Trips",
                newName: "OriginLatitude");

            migrationBuilder.AddColumn<double>(
                name: "DestinationLatitude",
                table: "Trips",
                type: "float",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "DestinationLongitude",
                table: "Trips",
                type: "float",
                nullable: false,
                defaultValue: 0.0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DestinationLatitude",
                table: "Trips");

            migrationBuilder.DropColumn(
                name: "DestinationLongitude",
                table: "Trips");

            migrationBuilder.RenameColumn(
                name: "OriginLongitude",
                table: "Trips",
                newName: "Origin");

            migrationBuilder.RenameColumn(
                name: "OriginLatitude",
                table: "Trips",
                newName: "Destination");
        }
    }
}
