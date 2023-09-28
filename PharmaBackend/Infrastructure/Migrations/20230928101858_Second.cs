using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class Second : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "8e445865-a24d-4543-a6c6-9443d048cdb9",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "653e64ee-b543-4e73-8cee-8beab8532337", "AQAAAAIAAYagAAAAEARp0pUhObsVKzZGC2fhdtuo6eUjrVs0asWdI/M3/xX/8JtWRzGeEOH6xW0/9UB+Vw==", "f5052633-5912-4c50-9d0c-b082bd8ee0c9" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "9e224968-33e4-4652-b7b7-8574d048cdb9",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "c3e6cdde-6de4-4593-8730-181ba51f8332", "AQAAAAIAAYagAAAAEF9CXzZU6GFwTqviBVhlprpHXPh7ZshDIHTahVRbudbMJMvbGhdEwfsyXa/y5MXs4w==", "d484510a-186c-4587-91c5-23131a92e2f4" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "8e445865-a24d-4543-a6c6-9443d048cdb9",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "cd6a1990-13c7-4a5c-9c98-d14d49c83721", "AQAAAAIAAYagAAAAENR/5U9vxKbR/FN5gvIXINtsLU52aZYkiaZUhdsKsej7gHM1NqrJtDi08kE/9jcLqA==", "e0422af9-a438-4511-a549-999f4abd2d61" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "9e224968-33e4-4652-b7b7-8574d048cdb9",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "2dd1011b-c405-448a-a7be-e39e11dd623a", "AQAAAAIAAYagAAAAEP4w6ftXiBZKHPkUtcYPhjUw4gVgL9AXgMi7M8oX3+fT8lQxhLDrjyZSJ6j7eLoylA==", "d3a0fff1-833d-4217-8d62-10f82cf0e249" });
        }
    }
}
