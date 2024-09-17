import { Alert } from 'react-native';


export const handleAddVehicle = async (vehicleDetails) => {
    try {
        // בדוק אם המספר רכב כבר קיים
        const checkResponse = await fetch(`http://www.DenisTs.somee.com/api/CarsRW/${vehicleDetails.carNumber}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (checkResponse.ok) {
            const data = await checkResponse.json();
            if (data.vehicle) {
                Alert.alert('Error', 'Vehicle already exists in the database or not exist');
                return false;
            }
        }
        console.log('Vehicle Details:', vehicleDetails);

        // שליחת הבקשה עם התאריך בפורמט החדש
        const response = await fetch('http://www.DenisTs.somee.com/api/CarsRW', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                carNumber: vehicleDetails.carNumber,
                customerId: vehicleDetails.customerId,
                manufacturer: vehicleDetails.manufacturer,
                yearOfManufacture: vehicleDetails.yearOfManufacture,
                color: vehicleDetails.color,
                numberOfKilometers: vehicleDetails.numberOfKilometers,
                insuranceExperation: vehicleDetails.insuranceExpiration,  // שם השדה תוקן כאן
                Model: vehicleDetails.model,
            }),
        });



        const textResponse = await response.text();
        console.log('Raw response from server:', textResponse);

        if (!response.ok) {
            console.error('Server error:', textResponse);
            Alert.alert('Error', `Server error: ${textResponse}`);
            return false;
        }

        let responseData;
        try {
            responseData = JSON.parse(textResponse);
        } catch (jsonError) {
            console.error('Failed to parse JSON response:', textResponse);
            Alert.alert('Error', `Failed to parse JSON response: ${textResponse}`);
            return false;
        }

        console.log('Response from server:', responseData);
        return true;
    } catch (error) {
        console.error('Failed to add vehicle:', error.message);
        Alert.alert('Error', `Failed to add vehicle: ${error.message}`);
        return false;
    }
};

export const loadCarDetails = async (carNumber, setVehicleDetails) => {
    try {
        const response = await fetch(`https://data.gov.il/api/3/action/datastore_search?resource_id=053cea08-09bc-40ec-8f7a-156f0677aff3&q=${carNumber}`);
        const data = await response.json();

        if (data.result.records.length > 0) {
            const carData = data.result.records[0];
            console.log('Car data fetched:', carData);

            setVehicleDetails((prevDetails) => ({
                ...prevDetails,
                yearOfManufacture: carData.shnat_yitzur ? carData.shnat_yitzur.toString() : '', // המרת מספר למחרוזת
                color: carData.tzeva_rechev || '', // צבע
                manufacturer: carData.tozeret_nm || '', // יצרן
                numberOfKilometers: carData.numberOfKilometers || 0, // מספר קילומטרים
                insuranceExpiration: carData.tokef_dt || '', // תוקף ביטוח
                model: carData.kinuy_mishari || '', // דגם
            }));
        } else {
            console.error('No car data found for the given number');
        }
    } catch (error) {
        console.error('Error loading car details:', error);
    }

};





