import React, { useEffect, useState } from 'react';
import { Image, View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { handleAddVehicle, loadCarDetails } from '../Controllers/AddVehicleController';

const AddVehicleScreen = () => {
    const [vehicleDetails, setVehicleDetails] = useState({
        carNumber: '',
        customerId: '',
        manufacturer: '',
        yearOfManufacture: '',
        color: '',
        numberOfKilometers: '',
        insuranceExpiration: '',
        model: '',
    });
    const [image, setImage] = useState(null);

    const navigation = useNavigation();

    useEffect(() => {
        const getCustomerId = async () => {
            try {
                const userData = await AsyncStorage.getItem('user');
                if (userData) {
                    const customer = JSON.parse(userData);
                    setVehicleDetails(prevDetails => ({
                        ...prevDetails,
                        customerId: customer.id.toString(), // ודא שה-ID מומר למחרוזת
                    }));
                }
            } catch (error) {
                console.error('Error retrieving customer ID:', error);
            }
        };

        getCustomerId();
    }, []);

    const handleInputChange = (field, value) => {
        setVehicleDetails(prevDetails => ({
            ...prevDetails,
            [field]: value
        }));
    };

    const handleSubmit = async () => {
        try {
            if (!vehicleDetails.customerId) {
                Alert.alert('Error', 'Customer ID is required');
                return;
            }

            // המרת ה-ID למספר
            const customerId = parseInt(vehicleDetails.customerId, 10);
            console.log("customer Id:", customerId);
            // ודא שה-ID המומר הוא מספר תקין
            if (isNaN(customerId)) {
                Alert.alert('Error', 'Invalid Customer ID');
                return;
            }


            const success = await handleAddVehicle({
                ...vehicleDetails,
                customerId: customerId
            });

            if (success) {
                await AsyncStorage.setItem('car', JSON.stringify(vehicleDetails));
                navigation.navigate('MainTabs', { screen: 'HomePage' });
            }
        } catch (error) {
            console.error('Error during submit:', error);
            Alert.alert('Error', `Failed to submit vehicle data: ${error.message}`);
        }
    };

    const handleCarNumberChange = (text) => {
        setVehicleDetails(prevDetails => ({ ...prevDetails, carNumber: text }));

        if (text.length >= 7) {
            loadCarDetails(text, setVehicleDetails);
        }
    };

    return (
        <ScrollView contentContainerStyle={{ padding: 20 }}>
            <View style={styles.container}>
                {image && <Image source={{ uri: image }} style={styles.image} />}

                <Text style={styles.label}>Customer ID:</Text>
                <TextInput
                    style={styles.idInput}
                    value={vehicleDetails.customerId}
                    editable={false}
                />

                <Text style={styles.label}>Car Number:</Text>
                <TextInput
                    style={styles.input}
                    value={vehicleDetails.carNumber}
                    onChangeText={handleCarNumberChange}
                />

                <Text style={styles.label}>Manufacturer:</Text>
                <TextInput
                    style={styles.input}
                    value={vehicleDetails.manufacturer}
                    onChangeText={(text) => handleInputChange('manufacturer', text)}
                />

                <Text style={styles.label}>Year of Manufacture:</Text>
                <TextInput
                    style={styles.input}
                    value={vehicleDetails.yearOfManufacture}
                    onChangeText={(text) => handleInputChange('yearOfManufacture', text)}
                />

                <Text style={styles.label}>Color:</Text>
                <TextInput
                    style={styles.input}
                    value={vehicleDetails.color}
                    onChangeText={(text) => handleInputChange('color', text)}
                />

                <Text style={styles.label}>Number of Kilometers:</Text>
                <TextInput
                    style={styles.input}
                    value={vehicleDetails.numberOfKilometers}
                    onChangeText={(text) => handleInputChange('numberOfKilometers', text)}
                />

                <Text style={styles.label}>Insurance Expiration:</Text>
                <TextInput
                    style={styles.input}
                    value={vehicleDetails.insuranceExpiration}
                    onChangeText={(text) => handleInputChange('insuranceExpiration', text)}
                />

                <Text style={styles.label}>Model:</Text>
                <TextInput
                    style={styles.input}
                    value={vehicleDetails.model}
                    onChangeText={(text) => handleInputChange('model', text)}
                />

                <TouchableOpacity style={[styles.button, styles.skipButton, { marginBottom: 10 }]} onPress={() => navigation.navigate('MainTabs', { screen: 'HomePage' })}>
                    <Text style={styles.buttonText}>Skip</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                    <Text style={styles.buttonText}>Add Vehicle</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    idInput: {
        width: '100%',
        height: 50,
        borderColor: 'black',
        borderWidth: 1,
        marginBottom: 10,
        paddingLeft: 8,
        fontSize: 20,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    input: {
        width: '100%',
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingLeft: 8,
    },
    button: {
        backgroundColor: '#4CAF50',
        padding: 10,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
    },
    image: {
        width: 200,
        height: 200,
        marginBottom: 20,
    },
    skipButton: {
        backgroundColor: 'gray',
        marginTop: 0,
    },
});

export default AddVehicleScreen;
