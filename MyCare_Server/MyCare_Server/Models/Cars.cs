namespace MyCare_Server.Models
{
    public class Cars
    {
        public int customerId { get; set; }
        public string carNumber { get; set; }
        public string manufacturer { get; set; }
        public int yearOfManufacture { get; set; }
        public string color { get; set; }
        public int numberOfKilometers { get; set; }
        public string insuranceExperation { get; set; }
        public int numberOfTreatments { get; set; }

    }
}
