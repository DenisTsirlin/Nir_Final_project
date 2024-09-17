using System;
using System.Collections.Generic;
using System.Data.SqlClient;

namespace MyCare_Server.Models
{
    public class CustomerDB
    {
        static string dataSql = @"workstation id=My_Care.mssql.somee.com;packet size=4096;user id=DenisTs_SQLLogin_1;pwd=MyCare123;data source=My_Care.mssql.somee.com;persist security info=False;initial catalog=My_Care;TrustServerCertificate=True";

        public static List<Customer> ReadCustomer()
        {
            List<Customer> customerList = new List<Customer>();
            SqlConnection connection = new SqlConnection(dataSql);
            string query = "SELECT * FROM Customers";
            SqlCommand command = new SqlCommand(query, connection);
            connection.Open();
            SqlDataReader reader = command.ExecuteReader();
            while (reader.Read())
            {
                Customer customer = new Customer
                {
                    id = reader.GetInt32(reader.GetOrdinal("Id")),
                    Password = reader.GetString(reader.GetOrdinal("Password")),
                    Email = reader.GetString(reader.GetOrdinal("Email")),
                    First_Name = reader.GetString(reader.GetOrdinal("First_Name")),
                    Last_Name = reader.GetString(reader.GetOrdinal("Last_Name")),
                    Birth_Day = reader.GetDateTime(reader.GetOrdinal("Birth_Day")),
                    Driving_License = reader.GetInt32(reader.GetOrdinal("Driving_License")),
                };
                customerList.Add(customer);
            }
            reader.Close();
            connection.Close();
            return customerList;
        }

        public static void AddCustomer(Customer customer)
        {
            SqlConnection connection = new SqlConnection(dataSql);
            string query = "EXEC InsertCustomer @Password, @Email, @First_Name, @Last_Name, @Birth_Day, @Driving_License";
            SqlCommand command = new SqlCommand(query, connection);

            command.Parameters.AddWithValue("@Password", customer.Password);
            command.Parameters.AddWithValue("@Email", customer.Email);
            command.Parameters.AddWithValue("@First_Name", customer.First_Name);
            command.Parameters.AddWithValue("@Last_Name", customer.Last_Name);
            command.Parameters.AddWithValue("@Birth_Day", customer.Birth_Day);
            command.Parameters.AddWithValue("@Driving_License", customer.Driving_License);

            connection.Open();
            command.ExecuteNonQuery();
            connection.Close();
        }

        public static void UpdateCustomer(Customer customer)
        {
            SqlConnection connection = new SqlConnection(dataSql);
            string query = "EXEC UpdateCustomer @Customer_Id, @Password, @Email, @First_Name, @Last_Name, @Birth_Day, @Driving_License";
            SqlCommand command = new SqlCommand(query, connection);

            command.Parameters.AddWithValue("@Customer_Id", customer.id);
            command.Parameters.AddWithValue("@Password", (object)customer.Password ?? DBNull.Value);
            command.Parameters.AddWithValue("@Email", (object)customer.Email ?? DBNull.Value);
            command.Parameters.AddWithValue("@First_Name", (object)customer.First_Name ?? DBNull.Value);
            command.Parameters.AddWithValue("@Last_Name", (object)customer.Last_Name ?? DBNull.Value);
            command.Parameters.AddWithValue("@Birth_Day", (object)customer.Birth_Day ?? DBNull.Value);
            command.Parameters.AddWithValue("@Driving_License", (object)customer.Driving_License ?? DBNull.Value);

            connection.Open();
            command.ExecuteNonQuery();
            connection.Close();
        }

        public static void DeleteCustomer(int customerId)
        {
            SqlConnection connection = new SqlConnection(dataSql);
            string query = "DELETE FROM Customers WHERE Id = @Customer_Id";
            SqlCommand command = new SqlCommand(query, connection);

            command.Parameters.AddWithValue("@Customer_Id", customerId);

            connection.Open();
            command.ExecuteNonQuery();
            connection.Close();
        }



    }
}
