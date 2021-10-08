using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Tortilla.Hackathon.Data.Migrations
{
    public partial class AddDayTrip : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Passengers_Trips_TripId",
                table: "Passengers");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Passengers",
                table: "Passengers");

            migrationBuilder.DropColumn(
                name: "AcceptedDateTime",
                table: "Passengers");

            migrationBuilder.RenameColumn(
                name: "TripId",
                table: "Passengers",
                newName: "DayTripId");

            migrationBuilder.RenameIndex(
                name: "IX_Passengers_TripId",
                table: "Passengers",
                newName: "IX_Passengers_DayTripId");

            migrationBuilder.AddColumn<Guid>(
                name: "Id",
                table: "Passengers",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<int>(
                name: "PassengerStatus",
                table: "Passengers",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddPrimaryKey(
                name: "PK_Passengers",
                table: "Passengers",
                column: "Id");

            migrationBuilder.CreateTable(
                name: "DayTrips",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    TripId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    DateTime = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DayTrips", x => x.Id);
                    table.ForeignKey(
                        name: "FK_DayTrips_Trips_TripId",
                        column: x => x.TripId,
                        principalTable: "Trips",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Passengers_UserId",
                table: "Passengers",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_DayTrips_TripId",
                table: "DayTrips",
                column: "TripId");

            migrationBuilder.AddForeignKey(
                name: "FK_Passengers_DayTrips_DayTripId",
                table: "Passengers",
                column: "DayTripId",
                principalTable: "DayTrips",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Passengers_DayTrips_DayTripId",
                table: "Passengers");

            migrationBuilder.DropTable(
                name: "DayTrips");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Passengers",
                table: "Passengers");

            migrationBuilder.DropIndex(
                name: "IX_Passengers_UserId",
                table: "Passengers");

            migrationBuilder.DropColumn(
                name: "Id",
                table: "Passengers");

            migrationBuilder.DropColumn(
                name: "PassengerStatus",
                table: "Passengers");

            migrationBuilder.RenameColumn(
                name: "DayTripId",
                table: "Passengers",
                newName: "TripId");

            migrationBuilder.RenameIndex(
                name: "IX_Passengers_DayTripId",
                table: "Passengers",
                newName: "IX_Passengers_TripId");

            migrationBuilder.AddColumn<DateTime>(
                name: "AcceptedDateTime",
                table: "Passengers",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddPrimaryKey(
                name: "PK_Passengers",
                table: "Passengers",
                columns: new[] { "UserId", "TripId" });

            migrationBuilder.AddForeignKey(
                name: "FK_Passengers_Trips_TripId",
                table: "Passengers",
                column: "TripId",
                principalTable: "Trips",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
