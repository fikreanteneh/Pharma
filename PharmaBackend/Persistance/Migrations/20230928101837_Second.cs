using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;
using NetTopologySuite.Geometries;

#nullable disable

namespace Persistance.Migrations
{
    /// <inheritdoc />
    public partial class Second : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<List<string>>(
                name: "PhoneNumbers",
                table: "Pharmacies",
                type: "text[]",
                nullable: false,
                defaultValue: new List<string>(),
                oldClrType: typeof(List<string>),
                oldType: "text[]",
                oldDefaultValue: new List<string>());

            migrationBuilder.AlterColumn<List<string>>(
                name: "Emails",
                table: "Pharmacies",
                type: "text[]",
                nullable: false,
                defaultValue: new List<string>(),
                oldClrType: typeof(List<string>),
                oldType: "text[]",
                oldDefaultValue: new List<string>());

            migrationBuilder.AlterColumn<string>(
                name: "Address",
                table: "Pharmacies",
                type: "geography (point)",
                nullable: false,
                oldClrType: typeof(Point),
                oldType: "geography(Point,4326)");

            migrationBuilder.UpdateData(
                table: "Pharmacies",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "Address", "Emails", "PhoneNumbers" },
                values: new object[] { "POINT(-10.946823 40.807416)", new List<string> { "pharmacy@localhost.com" }, new List<string> { "0940229161" } });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<List<string>>(
                name: "PhoneNumbers",
                table: "Pharmacies",
                type: "text[]",
                nullable: false,
                defaultValue: new List<string>(),
                oldClrType: typeof(List<string>),
                oldType: "text[]",
                oldDefaultValue: new List<string>());

            migrationBuilder.AlterColumn<List<string>>(
                name: "Emails",
                table: "Pharmacies",
                type: "text[]",
                nullable: false,
                defaultValue: new List<string>(),
                oldClrType: typeof(List<string>),
                oldType: "text[]",
                oldDefaultValue: new List<string>());

            migrationBuilder.AlterColumn<Point>(
                name: "Address",
                table: "Pharmacies",
                type: "geography(Point,4326)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "geography (point)");

            migrationBuilder.UpdateData(
                table: "Pharmacies",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "Address", "Emails", "PhoneNumbers" },
                values: new object[] { (NetTopologySuite.Geometries.Point)new NetTopologySuite.IO.WKTReader().Read("SRID=0;POINT (36 10)"), new List<string> { "pharmacy@localhost.com" }, new List<string> { "0940229161" } });
        }
    }
}
