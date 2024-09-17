import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import updateUser from '../Controllers/UpdateUserController';

const UserManagementScreen = ({ navigation }) => {
    const [userDetails, setUserDetails] = useState({
        customerId: '',
        password: '',
        email: '',
        firstName: '',
        lastName: '',
        birthDay: '',
        drivingLicense: '',
    });

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const userData = await AsyncStorage.getItem('user');
                if (userData) {
                    const parsedUser = JSON.parse(userData);
                    console.log('Fetched user data:', parsedUser); // הדפס את הנתונים שהתקבלו

                    setUserDetails({
                        customerId: parsedUser.id?.toString() || '', // המרת מספר למחרוזת
                        password: parsedUser.password || '',
                        email: parsedUser.email || '',
                        firstName: parsedUser.first_Name || '',
                        lastName: parsedUser.last_Name || '',
                        birthDay: parsedUser.birth_Day || '',
                        drivingLicense: parsedUser.driving_License?.toString() || '', // המרת מספר למחרוזת
                    });

                } else {
                    console.log('No user data found in AsyncStorage');
                }
            } catch (error) {
                console.error('Error fetching user details:', error);
            }
        };

        fetchUserDetails();
    }, []);

    const handleSave = async () => {
        try {
            // נסה לעדכן את פרטי הלקוח
            await updateUser({
                id: userDetails.customerId,
                password: userDetails.password,
                email: userDetails.email,
                first_Name: userDetails.firstName,
                last_Name: userDetails.lastName,
                birth_Day: userDetails.birthDay,
                driving_License: userDetails.drivingLicense,
            });

            // עדכן את AsyncStorage עם הנתונים המעודכנים
            const updatedUser = {
                id: userDetails.customerId,
                password: userDetails.password,
                email: userDetails.email,
                first_Name: userDetails.firstName,
                last_Name: userDetails.lastName,
                birth_Day: userDetails.birthDay,
                driving_License: userDetails.drivingLicense,
            };

            await AsyncStorage.setItem('user', JSON.stringify(updatedUser));

            // הצג הודעת הצלחה
            Alert.alert('Success', 'User details updated successfully');
            
            // חזור לדף הבית לאחר השמירה
            navigation.navigate('HomePage');
        } catch (error) {
            // הצג הודעת שגיאה במקרה של כישלון
            Alert.alert('Error', 'Failed to update user details');
            console.error('Error updating user:', error);
        }
    };

    return (
        <ScrollView style={styles.container}>
            <View>
                <Text style={styles.label}>Customer ID:</Text>
                <TextInput
                    style={styles.input}
                    value={userDetails.customerId}
                    onChangeText={(text) => setUserDetails({ ...userDetails, customerId: text })}
                    editable={false}
                />
                <Text style={styles.label}>Password:</Text>
                <TextInput
                    style={styles.input}
                    value={userDetails.password}
                    onChangeText={(text) => setUserDetails({ ...userDetails, password: text })}
                    secureTextEntry
                />
                <Text style={styles.label}>Email:</Text>
                <TextInput
                    style={styles.input}
                    value={userDetails.email}
                    onChangeText={(text) => setUserDetails({ ...userDetails, email: text })}
                />
                <Text style={styles.label}>First Name:</Text>
                <TextInput
                    style={styles.input}
                    value={userDetails.firstName}
                    onChangeText={(text) => setUserDetails({ ...userDetails, firstName: text })}
                />
                <Text style={styles.label}>Last Name:</Text>
                <TextInput
                    style={styles.input}
                    value={userDetails.lastName}
                    onChangeText={(text) => setUserDetails({ ...userDetails, lastName: text })}
                />
                <Text style={styles.label}>Birth Day:</Text>
                <TextInput
                    style={styles.input}
                    value={userDetails.birthDay}
                    onChangeText={(text) => setUserDetails({ ...userDetails, birthDay: text })}
                />
                <Text style={styles.label}>Driving License:</Text>
                <TextInput
                    style={styles.input}
                    value={userDetails.drivingLicense}
                    onChangeText={(text) => setUserDetails({ ...userDetails, drivingLicense: text })}
                />
                <Button title="Save" onPress={handleSave} />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#f8f8f8',
    },
    label: {
        fontSize: 14,
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

export default UserManagementScreen;
