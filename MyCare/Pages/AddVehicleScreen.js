import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image, Alert, ScrollView } from 'react-native';

const AddVehicleScreen = ({ navigation }) => {
    const [vehicleDetails, setVehicleDetails] = useState({
        carNumber: '',
        customerId: '',
        codeTypeCar: '',
        manufacturer: '',
        yearOfManufacture: '',
        color: '',
        numberOfKilometers: '',
        insuranceExpiration: '',
        numberOfTreatments: '',
    });
    const [image, setImage] = useState(null);

    const generateImage = async () => {
        const prompt = `A ${vehicleDetails.color} ${vehicleDetails.manufacturer} car, manufactured in ${vehicleDetails.yearOfManufacture}`;
        try {
            const response = await axios.post('להוסיף כאן את ה api של הai ', {
                prompt: prompt,
            });
            setImage(response.data.image_url);
        } catch (error) {
            console.error('Error generating image:', error);
            Alert.alert('Error', 'Failed to generate image. Please try again.');
        }
    };

    const handleAddVehicle = async () => {
        await generateImage();
        Alert.alert('Vehicle Added', `Vehicle ${vehicleDetails.carNumber} added successfully!`);
        navigation.navigate('HomePage');
    };

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.container}>
                {image ? (
                    <Image source={{ uri: image }} style={styles.image} />
                ) : (
                    <Button title="Generate Vehicle Image" onPress={generateImage} />
                )}
                <Text style={styles.label}>Car Number:</Text>
                <TextInput
                    style={styles.input}
                    value={vehicleDetails.carNumber}
                    onChangeText={(text) => setVehicleDetails({ ...vehicleDetails, carNumber: text })}
                />
                <Text style={styles.label}>Customer ID:</Text>
                <TextInput
                    style={styles.input}
                    value={vehicleDetails.customerId}
                    onChangeText={(text) => setVehicleDetails({ ...vehicleDetails, customerId: text })}
                />
                <Text style={styles.label}>Code Type Car:</Text>
                <TextInput
                    style={styles.input}
                    value={vehicleDetails.codeTypeCar}
                    onChangeText={(text) => setVehicleDetails({ ...vehicleDetails, codeTypeCar: text })}
                />
                <Text style={styles.label}>Manufacturer:</Text>
                <TextInput
                    style={styles.input}
                    value={vehicleDetails.manufacturer}
                    onChangeText={(text) => setVehicleDetails({ ...vehicleDetails, manufacturer: text })}
                />
                <Text style={styles.label}>Year of Manufacture:</Text>
                <TextInput
                    style={styles.input}
                    value={vehicleDetails.yearOfManufacture}
                    onChangeText={(text) => setVehicleDetails({ ...vehicleDetails, yearOfManufacture: text })}
                />
                <Text style={styles.label}>Color:</Text>
                <TextInput
                    style={styles.input}
                    value={vehicleDetails.color}
                    onChangeText={(text) => setVehicleDetails({ ...vehicleDetails, color: text })}
                />
                <Text style={styles.label}>Number of Kilometers:</Text>
                <TextInput
                    style={styles.input}
                    value={vehicleDetails.numberOfKilometers}
                    onChangeText={(text) => setVehicleDetails({ ...vehicleDetails, numberOfKilometers: text })}
                />
                <Text style={styles.label}>Insurance Expiration:</Text>
                <TextInput
                    style={styles.input}
                    value={vehicleDetails.insuranceExpiration}
                    onChangeText={(text) => setVehicleDetails({ ...vehicleDetails, insuranceExpiration: text })}
                />
                <Text style={styles.label}>Number of Treatments:</Text>
                <TextInput
                    style={styles.input}
                    value={vehicleDetails.numberOfTreatments}
                    onChangeText={(text) => setVehicleDetails({ ...vehicleDetails, numberOfTreatments: text })}
                />
                <Button title="Add Vehicle" onPress={handleAddVehicle} />
                <Button title="Skip" onPress={() => navigation.navigate('HomePage')} />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
    },
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#f8f8f8',
    },
    image: {
        width: 200,
        height: 200,
        borderRadius: 100,
        marginBottom: 16,
    },
    label: {
        fontSize: 16,
        marginBottom: 8,
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 16,
        paddingHorizontal: 8,
    },
});

export default AddVehicleScreen;
