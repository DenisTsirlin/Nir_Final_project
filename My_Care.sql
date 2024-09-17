/*
Use Master
GO
Drop Database My_Care
GO
*/

CREATE DATABASE My_Care
COLLATE Hebrew_CI_AS
GO

USE My_Care
GO

-- Create Tables
CREATE TABLE Customers (
    Id INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
    [Password] VARCHAR(250),
    Email NVARCHAR(40),
    First_Name NVARCHAR(30),
    Last_Name NVARCHAR(30),
    Birth_Day DATE,
    Driving_License DATE,
)
GO

select * from  Customers


CREATE TABLE Type_Car (
    Code_Type_Car INT NOT NULL PRIMARY KEY,
    Type_car NVARCHAR(15),
    isvisible INT DEFAULT 1
)
GO


CREATE TABLE Vehicle (
    Car_Number NVARCHAR(8) NOT NULL PRIMARY KEY,
    Customer_Id INT,
    Code_Type_Car INT,
    Manufacturer NVARCHAR(15),
    Year_of_Manufacture INT,
    Color NVARCHAR(10),
    Number_Of_Kilometers INT,
    Insurance_Expiration DATE,
    Number_Of_Treatments INT DEFAULT 0,
    FOREIGN KEY (Customer_Id) REFERENCES Customers (Id),
    FOREIGN KEY (Code_Type_Car) REFERENCES Type_Car (Code_Type_Car)
)
GO
ALTER TABLE Vehicle
DROP COLUMN isvisible;
GO
CREATE TABLE Protocols (
    Protocol_Number INT NOT NULL PRIMARY KEY,
    Protocol_Name NVARCHAR(12),
    Protocol_description NVARCHAR(50),
    isvisible INT DEFAULT 1
)
GO

CREATE TABLE Garage (
    Garage_Number INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
    Garage_Name NVARCHAR(30),
    Garage_Address NVARCHAR(50),
    Garage_Rate INT,
    Garage_Price_Rate INT,
    Type_Specialization NVARCHAR(30),
    isvisible INT DEFAULT 1
)
GO

CREATE TABLE Treatment_Type (
    Code_Treatments INT NOT NULL PRIMARY KEY,
    Treatments NVARCHAR(30),
    Treatments_interval DATE,
    Treatments_kilometer_interval INT,
    isvisible INT DEFAULT 1
)
GO

CREATE TABLE Car_Treatments (
    Treatments_Number INT NOT NULL PRIMARY KEY,
    Car_Number NVARCHAR(8),
    Code_Treatments INT,
    Treatments_Type NVARCHAR(10),
    Treatments_Price INT,
    Treatments_Date DATE,
    Garage_Number INT,
    Treatment_kilometers INT,
    isvisible INT DEFAULT 1,
    FOREIGN KEY (Car_Number) REFERENCES Vehicle (Car_Number),
    FOREIGN KEY (Garage_Number) REFERENCES Garage (Garage_Number),
    FOREIGN KEY (Code_Treatments) REFERENCES Treatment_Type (Code_Treatments)
)
GO

CREATE TABLE Spare_Part (
    Code_Part INT NOT NULL PRIMARY KEY,
    Spare_Part NVARCHAR(30),
    Treatments_Number INT,
    isvisible INT DEFAULT 1,
    FOREIGN KEY (Treatments_Number) REFERENCES Car_Treatments (Treatments_Number)
)
GO

CREATE TABLE Rats (
    code_rate INT NOT NULL PRIMARY KEY,
    rats_description NVARCHAR(100),
    Garage_Number INT,
    rats_start INT,
    isvisible INT DEFAULT 1,
    FOREIGN KEY (Garage_Number) REFERENCES Garage (Garage_Number)
)
GO

-- Create Stored Procedures for Customers
CREATE PROCEDURE DeleteCustomer
    @Customer_Id INT
AS
BEGIN
    UPDATE Customers SET isvisible = 0 WHERE Id = @Customer_Id;
END;
GO

Alter PROCEDURE InsertCustomer
    @Password VARCHAR(250),
    @Email NVARCHAR(40),
    @First_Name NVARCHAR(30),
    @Last_Name NVARCHAR(30),
    @Birth_Day DATE,
    @Driving_License DATE
AS
BEGIN
    INSERT INTO Customers ([Password], Email, First_Name, Last_Name, Birth_Day, Driving_License)
    VALUES (@Password, @Email, @First_Name, @Last_Name, @Birth_Day, @Driving_License);
END;
GO



CREATE PROCEDURE UpdateCustomer
    @Customer_Id INT,
    @Password VARCHAR(250) = NULL,
    @Email NVARCHAR(40) = NULL,
    @First_Name NVARCHAR(30) = NULL,
    @Last_Name NVARCHAR(30) = NULL,
    @Birth_Day DATE = NULL,
    @Driving_License DATE = NULL
AS
BEGIN
    UPDATE Customers
    SET [Password] = COALESCE(@Password, [Password]),
        Email = COALESCE(@Email, Email),
        First_Name = COALESCE(@First_Name, First_Name),
        Last_Name = COALESCE(@Last_Name, Last_Name),
        Birth_Day = COALESCE(@Birth_Day, Birth_Day),
        Driving_License = COALESCE(@Driving_License, Driving_License)
    WHERE Id = @Customer_Id;
END;
GO

-- Create Stored Procedures for Type_Car
CREATE PROCEDURE DeleteTypeCar
    @Code_Type_Car INT
AS
BEGIN
    UPDATE Type_Car SET isvisible = 0 WHERE Code_Type_Car = @Code_Type_Car;
END;
GO

CREATE PROCEDURE InsertTypeCar
    @Type_car NVARCHAR(15)
AS
BEGIN
    INSERT INTO Type_Car (Type_car, isvisible)
    VALUES (@Type_car, 1);
END;
GO

CREATE PROCEDURE UpdateTypeCar
    @Code_Type_Car INT,
    @Type_car NVARCHAR(15) = NULL
AS
BEGIN
    UPDATE Type_Car
    SET Type_car = COALESCE(@Type_car, Type_car)
    WHERE Code_Type_Car = @Code_Type_Car;
END;
GO

-- Create Stored Procedures for Vehicle
CREATE PROCEDURE DeleteVehicle
    @Car_Number NVARCHAR(8)
AS
BEGIN
    UPDATE Vehicle SET isvisible = 0 WHERE Car_Number = @Car_Number;
END;
GO

CREATE PROCEDURE InsertVehicle
    @Car_Number NVARCHAR(8),
    @Customer_Id INT,
    @Code_Type_Car INT,
    @Manufacturer NVARCHAR(15),
    @Year_of_Manufacture INT,
    @Color NVARCHAR(10),
    @Number_Of_Kilometers INT,
    @Insurance_Expiration DATE,
    @Number_Of_Treatments INT = 0
AS
BEGIN
    INSERT INTO Vehicle (Car_Number, Customer_Id, Code_Type_Car, Manufacturer, Year_of_Manufacture, Color, Number_Of_Kilometers, Insurance_Expiration, Number_Of_Treatments, isvisible)
    VALUES (@Car_Number, @Customer_Id, @Code_Type_Car, @Manufacturer, @Year_of_Manufacture, @Color, @Number_Of_Kilometers, @Insurance_Expiration, @Number_Of_Treatments, 1);
END;
GO

CREATE PROCEDURE UpdateVehicle
    @Car_Number NVARCHAR(8),
    @Customer_Id INT = NULL,
    @Code_Type_Car INT = NULL,
    @Manufacturer NVARCHAR(15) = NULL,
    @Year_of_Manufacture INT = NULL,
    @Color NVARCHAR(10) = NULL,
    @Number_Of_Kilometers INT = NULL,
    @Insurance_Expiration DATE = NULL,
    @Number_Of_Treatments INT = NULL
AS
BEGIN
    UPDATE Vehicle
    SET Customer_Id = COALESCE(@Customer_Id, Customer_Id),
        Code_Type_Car = COALESCE(@Code_Type_Car, Code_Type_Car),
        Manufacturer = COALESCE(@Manufacturer, Manufacturer),
        Year_of_Manufacture = COALESCE(@Year_of_Manufacture, Year_of_Manufacture),
        Color = COALESCE(@Color, Color),
        Number_Of_Kilometers = COALESCE(@Number_Of_Kilometers, Number_Of_Kilometers),
        Insurance_Expiration = COALESCE(@Insurance_Expiration, Insurance_Expiration),
        Number_Of_Treatments = COALESCE(@Number_Of_Treatments, Number_Of_Treatments)
    WHERE Car_Number = @Car_Number;
END;
GO

-- Create Stored Procedures for Protocols
CREATE PROCEDURE DeleteProtocol
    @Protocol_Number INT
AS
BEGIN
    UPDATE Protocols SET isvisible = 0 WHERE Protocol_Number = @Protocol_Number;
END;
GO

CREATE PROCEDURE InsertProtocol
    @Protocol_Name NVARCHAR(12),
    @Protocol_description NVARCHAR(50)
AS
BEGIN
    INSERT INTO Protocols (Protocol_Name, Protocol_description, isvisible)
    VALUES (@Protocol_Name, @Protocol_description, 1);
END;
GO

CREATE PROCEDURE UpdateProtocol
    @Protocol_Number INT,
    @Protocol_Name NVARCHAR(12) = NULL,
    @Protocol_description NVARCHAR(50) = NULL
AS
BEGIN
    UPDATE Protocols
    SET Protocol_Name = COALESCE(@Protocol_Name, Protocol_Name),
        Protocol_description = COALESCE(@Protocol_description, Protocol_description)
    WHERE Protocol_Number = @Protocol_Number;
END;
GO

-- Create Stored Procedures for Garage
CREATE PROCEDURE DeleteGarage
    @Garage_Number INT
AS
BEGIN
    UPDATE Garage SET isvisible = 0 WHERE Garage_Number = @Garage_Number;
END;
GO

CREATE PROCEDURE InsertGarage
    @Garage_Name NVARCHAR(30),
    @Garage_Address NVARCHAR(50),
    @Garage_Rate INT,
    @Garage_Price_Rate INT,
    @Type_Specialization NVARCHAR(30)
AS
BEGIN
    INSERT INTO Garage (Garage_Name, Garage_Address, Garage_Rate, Garage_Price_Rate, Type_Specialization, isvisible)
    VALUES (@Garage_Name, @Garage_Address, @Garage_Rate, @Garage_Price_Rate, @Type_Specialization, 1);
END;
GO

CREATE PROCEDURE UpdateGarage
    @Garage_Number INT,
    @Garage_Name NVARCHAR(30) = NULL,
    @Garage_Address NVARCHAR(50) = NULL,
    @Garage_Rate INT = NULL,
    @Garage_Price_Rate INT = NULL,
    @Type_Specialization NVARCHAR(30) = NULL
AS
BEGIN
    UPDATE Garage
    SET Garage_Name = COALESCE(@Garage_Name, Garage_Name),
        Garage_Address = COALESCE(@Garage_Address, Garage_Address),
        Garage_Rate = COALESCE(@Garage_Rate, Garage_Rate),
        Garage_Price_Rate = COALESCE(@Garage_Price_Rate, Garage_Price_Rate),
        Type_Specialization = COALESCE(@Type_Specialization, Type_Specialization)
    WHERE Garage_Number = @Garage_Number;
END;
GO

-- Create Stored Procedures for Treatment_Type
CREATE PROCEDURE DeleteTreatmentType
    @Code_Treatments INT
AS
BEGIN
    UPDATE Treatment_Type SET isvisible = 0 WHERE Code_Treatments = @Code_Treatments;
END;
GO

CREATE PROCEDURE InsertTreatmentType
    @Treatments NVARCHAR(30),
    @Treatments_interval DATE,
    @Treatments_kilometer_interval INT
AS
BEGIN
    INSERT INTO Treatment_Type (Treatments, Treatments_interval, Treatments_kilometer_interval, isvisible)
    VALUES (@Treatments, @Treatments_interval, @Treatments_kilometer_interval, 1);
END;
GO

CREATE PROCEDURE UpdateTreatmentType
    @Code_Treatments INT,
    @Treatments NVARCHAR(30) = NULL,
    @Treatments_interval DATE = NULL,
    @Treatments_kilometer_interval INT = NULL
AS
BEGIN
    UPDATE Treatment_Type
    SET Treatments = COALESCE(@Treatments, Treatments),
        Treatments_interval = COALESCE(@Treatments_interval, Treatments_interval),
        Treatments_kilometer_interval = COALESCE(@Treatments_kilometer_interval, Treatments_kilometer_interval)
    WHERE Code_Treatments = @Code_Treatments;
END;
GO

-- Create Stored Procedures for Car_Treatments
CREATE PROCEDURE DeleteCarTreatment
    @Treatments_Number INT
AS
BEGIN
    UPDATE Car_Treatments SET isvisible = 0 WHERE Treatments_Number = @Treatments_Number;
END;
GO

CREATE PROCEDURE InsertCarTreatment
    @Car_Number NVARCHAR(8),
    @Code_Treatments INT,
    @Treatments_Type NVARCHAR(10),
    @Treatments_Price INT,
    @Treatments_Date DATE,
    @Garage_Number INT,
    @Treatment_kilometers INT
AS
BEGIN
    INSERT INTO Car_Treatments (Car_Number, Code_Treatments, Treatments_Type, Treatments_Price, Treatments_Date, Garage_Number, Treatment_kilometers, isvisible)
    VALUES (@Car_Number, @Code_Treatments, @Treatments_Type, @Treatments_Price, @Treatments_Date, @Garage_Number, @Treatment_kilometers, 1);
END;
GO

CREATE PROCEDURE UpdateCarTreatment
    @Treatments_Number INT,
    @Car_Number NVARCHAR(8) = NULL,
    @Code_Treatments INT = NULL,
    @Treatments_Type NVARCHAR(10) = NULL,
    @Treatments_Price INT = NULL,
    @Treatments_Date DATE = NULL,
    @Garage_Number INT = NULL,
    @Treatment_kilometers INT = NULL
AS
BEGIN
    UPDATE Car_Treatments
    SET Car_Number = COALESCE(@Car_Number, Car_Number),
        Code_Treatments = COALESCE(@Code_Treatments, Code_Treatments),
        Treatments_Type = COALESCE(@Treatments_Type, Treatments_Type),
        Treatments_Price = COALESCE(@Treatments_Price, Treatments_Price),
        Treatments_Date = COALESCE(@Treatments_Date, Treatments_Date),
        Garage_Number = COALESCE(@Garage_Number, Garage_Number),
        Treatment_kilometers = COALESCE(@Treatment_kilometers, Treatment_kilometers)
    WHERE Treatments_Number = @Treatments_Number;
END;
GO

-- Create Stored Procedures for Spare_Part
CREATE PROCEDURE DeleteSparePart
    @Code_Part INT
AS
BEGIN
    UPDATE Spare_Part SET isvisible = 0 WHERE Code_Part = @Code_Part;
END;
GO

CREATE PROCEDURE InsertSparePart
    @Spare_Part NVARCHAR(30),
    @Treatments_Number INT
AS
BEGIN
    INSERT INTO Spare_Part (Spare_Part, Treatments_Number, isvisible)
    VALUES (@Spare_Part, @Treatments_Number, 1);
END;
GO

CREATE PROCEDURE UpdateSparePart
    @Code_Part INT,
    @Spare_Part NVARCHAR(30) = NULL,
    @Treatments_Number INT = NULL
AS
BEGIN
    UPDATE Spare_Part
    SET Spare_Part = COALESCE(@Spare_Part, Spare_Part),
        Treatments_Number = COALESCE(@Treatments_Number, Treatments_Number)
    WHERE Code_Part = @Code_Part;
END;
GO

-- Create Stored Procedures for Rats
CREATE PROCEDURE DeleteRats
    @code_rate INT
AS
BEGIN
    UPDATE Rats SET isvisible = 0 WHERE code_rate = @code_rate;
END;
GO

CREATE PROCEDURE InsertRats
    @rats_description NVARCHAR(100),
    @Garage_Number INT,
    @rats_start INT
AS
BEGIN
    INSERT INTO Rats (rats_description, Garage_Number, rats_start, isvisible)
    VALUES (@rats_description, @Garage_Number, @rats_start, 1);
END;
GO

CREATE PROCEDURE UpdateRats
    @code_rate INT,
    @rats_description NVARCHAR(100) = NULL,
    @Garage_Number INT = NULL,
    @rats_start INT = NULL
AS
BEGIN
    UPDATE Rats
    SET rats_description = COALESCE(@rats_description, rats_description),
        Garage_Number = COALESCE(@Garage_Number, Garage_Number),
        rats_start = COALESCE(@rats_start, rats_start)
    WHERE code_rate = @code_rate;
END;
GO