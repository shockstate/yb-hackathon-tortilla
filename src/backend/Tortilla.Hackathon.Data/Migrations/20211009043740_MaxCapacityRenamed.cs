using Microsoft.EntityFrameworkCore.Migrations;

namespace Tortilla.Hackathon.Data.Migrations
{
    public partial class MaxCapacityRenamed : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "MaxCapacity",
                table: "Cars",
                newName: "MaxPassengersCapacity");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "MaxPassengersCapacity",
                table: "Cars",
                newName: "MaxCapacity");
        }
    }
}
