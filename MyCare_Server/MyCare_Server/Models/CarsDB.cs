using System.Data.SqlClient;
using System.Drawing;

namespace MyCare_Server.Models
{
    public class CarsDB
    {
        static string dbSql = @"workstation id=My_Care.mssql.somee.com;packet size=4096;user id=DenisTs_SQLLogin_1;pwd=MyCare123;data source=My_Care.mssql.somee.com;persist security info=False;initial catalog=My_Care;TrustServerCertificate=True";

        public static List<Cars> ReadCar()
        {
            List<Cars> carsList = new List<Cars>();
            SqlConnection connection = new SqlConnection(dbSql);
            string query = "Select * from Vehicle";
            SqlCommand command = new SqlCommand(query, connection);
            connection.Open();
            SqlDataReader reader = command.ExecuteReader();
            while (reader.Read())
            {
                Cars car = new Cars
                {
                    customerId = Convert.ToInt32(reader["Customer_Id"]),
                    carNumber = reader["Car_Number"].ToString(),
                    manufacturer = reader["manufacturer"].ToString(),
                    yearOfManufacture = Convert.ToInt32(reader["Year_of_Manufacture"]),
                    color = reader["color"].ToString(),
                    numberOfKilometers = Convert.ToInt32(reader["Number_Of_Kilometers"]),
                    // קריאת התאריך כ-string
                    insuranceExperation = reader["Insurance_Expiration"].ToString(),
                    numberOfTreatments = Convert.ToInt32(reader["Number_Of_Treatments"])
                };
                carsList.Add(car);
            }
            return carsList;
        }


        public static Cars ReadCarByCarNumber(string carNumber)
        {
            Cars car = null;

            SqlConnection connection = new SqlConnection(dbSql);
            string query = "SELECT * FROM Vehicle WHERE carNumber = @carNumber";
            SqlCommand command = new SqlCommand(query, connection);
            command.Parameters.AddWithValue("@carNumber", carNumber);

            connection.Open();
            SqlDataReader reader = command.ExecuteReader();

            if (reader.Read())
            {
                car = new Cars
                {
                    carNumber = reader["carNumber"].ToString(),
                    manufacturer = reader["manufacturer"].ToString(),
                    yearOfManufacture = Convert.ToInt32(reader["yearOfManufacture"]),
                    color = reader["color"].ToString(),
                    numberOfKilometers = Convert.ToInt32(reader["numberOfKilometers"]),
                    // קריאת התאריך כ-string
                    insuranceExperation = reader["insuranceExperation"].ToString(),
                    numberOfTreatments = Convert.ToInt32(reader["numberOfTreatments"])
                };
            }

            return car;
        }





        public static void AddCar(Cars car)
        {
            using (SqlConnection connection = new SqlConnection(dbSql))
            {
                using (SqlCommand command = new SqlCommand("InsertVehicle", connection))
                {
                    command.CommandType = System.Data.CommandType.StoredProcedure;

                    command.Parameters.AddWithValue("@Car_Number", car.carNumber);
                    command.Parameters.AddWithValue("@Customer_Id", car.customerId);
                    command.Parameters.AddWithValue("@Manufacturer", car.manufacturer);
                    command.Parameters.AddWithValue("@Year_of_Manufacture", car.yearOfManufacture);
                    command.Parameters.AddWithValue("@Color", car.color);
                    command.Parameters.AddWithValue("@Number_Of_Kilometers", car.numberOfKilometers);
                    command.Parameters.AddWithValue("@Insurance_Expiration", car.insuranceExperation);
                    command.Parameters.AddWithValue("@Number_Of_Treatments", car.numberOfTreatments);

                    connection.Open();
                    command.ExecuteNonQuery();
                }
            }
        }



        public static void UpdateCar(Cars car)
        {
            SqlConnection connection = new SqlConnection(dbSql);
            string query = "UPDATE Vehicle SET color = @color, numberOfKilometers = @numberOfKilometers, Insurance_Expiration = @insuranceExperation WHERE carNumber = @carNumber";

            SqlCommand command = new SqlCommand(query, connection);
            command.Parameters.AddWithValue("@carNumber", car.carNumber);
            command.Parameters.AddWithValue("@color", car.color);
            command.Parameters.AddWithValue("@numberOfKilometers", car.numberOfKilometers);
            command.Parameters.AddWithValue("@insuranceExperation", car.insuranceExperation); // הוספת התאריך

            connection.Open();
            command.ExecuteNonQuery();
        }


        public static void DeleteCar(string carNumber)
        {
            SqlConnection connection = new SqlConnection(dbSql);
            string query = "DELETE FROM Vehicle WHERE carNumber = @carNumber";
            SqlCommand command = new SqlCommand(query, connection);
            command.Parameters.AddWithValue("@carNumber", carNumber);
            connection.Open();
            int rowsAfected = command.ExecuteNonQuery();
            if(rowsAfected == 0)
            {
                throw new Exception($"No car with car number '{carNumber}' found to delete.");

            }


        }



    }
}
