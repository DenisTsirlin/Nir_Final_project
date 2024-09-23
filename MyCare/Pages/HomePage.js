import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Divider } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'; // ייבוא השיטות

const HomePage = ({ navigation }) => {
    const [user, setUser] = useState(null);
    const [car, setCar] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const userData = await AsyncStorage.getItem('user');
                if (userData) {
                    const parsedUser = JSON.parse(userData);
                    console.log('Fetched user data:', parsedUser);
                    setUser(parsedUser);
                    return parsedUser; // return parsedUser so it can be used in fetchCar
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
            return null; // return null if no user data is found
        };
    
        const fetchCar = async (parsedUser) => {
            try {
                const carData = await AsyncStorage.getItem('car');
                if (carData) {
                    const parsedCar = JSON.parse(carData);
                    console.log('Fetched car data:', parsedCar);
                    
                    // Check if the car belongs to the fetched user
                    if (parsedUser && parsedCar && String(parsedUser.id) === parsedCar.customerId) {
                        console.log('Car belongs to this user');
                        setCar(parsedCar);  // Save the car if it belongs to the user
                    } else {
                        console.log('Car does not belong to this user');
                        setCar(null);  // Clear the car data if it doesn't belong to the user
                    }
                }
            } catch (error) {
                console.error('Error fetching car data:', error);
            }
        };
    
        // Fetch user and car data initially
        const init = async () => {
            const user = await fetchUser();
            if (user) {
                fetchCar(user);  // Only fetch car if user data is available
            }
        };
    
        init();
    
        // Add listener to fetch user data when navigating back to this screen
        const unsubscribe = navigation.addListener('focus', () => {
            init();
        });
    
        // Cleanup the listener on component unmount
        return unsubscribe;
    }, [navigation]);

    return (
        <ScrollView style={styles.container}>
            <View>
                <View style={styles.logoContainer}>
                    <Image source={require('../assets/Images/logo.png')} style={styles.logo} />
                </View>

                <Text style={styles.welcomeText}>
                    שלום {user ? (
                        <>
                            <Text style={styles.userName}>{user.first_Name || ''} </Text>
                            <Text style={styles.userName}>{user.last_Name || ''}</Text>
                        </>
                    ) : 'התחברת/הירשם'}, ברוך הבא!
                </Text>

                <View style={styles.content}>
                    {car ? (
                        <View style={styles.carContainer}>
                            <Text style={styles.carTitle}>הרכב שלך</Text>
                            <Text>מספר רכב: {car.carNumber}</Text>
                            <Text>יצרן: {car.manufacturer}</Text>
                            <Text>שנת ייצור: {car.yearOfManufacture}</Text>
                            <Text>צבע: {car.color}</Text>
                            <Text>קילומטרים: {car.numberOfKilometers}</Text>
                            <Text>תוקף ביטוח: {car.insuranceExpiration}</Text>
                            <Text>מודל: {car.model}</Text>
                        </View>
                    ) : (
                        <View style={styles.emptyCarContainer}>
                            <Text style={styles.missingCarText}>חסר רכב ברשימה</Text>
                        </View>
                    )}
                </View>

                <Divider style={styles.divider} />

                <View style={styles.menu}>
                    <View style={styles.buttonRow}>
                        <TouchableOpacity style={[styles.button, styles.greenButton]} onPress={() => navigation.navigate('Nearby Garages')}>
                            <Icon name="help-outline" size={24} color="white" />
                            <Text style={styles.buttonText}>מוסכים בקרבת מקום</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.button, styles.orangeButton]} onPress={() => navigation.navigate('Add Vehicle')}>
                            <Icon name="directions-car" size={24} color="white" />
                            <Text style={styles.buttonText}>הוספת רכב</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.buttonRow}>
                        <TouchableOpacity style={[styles.button, styles.redButton]} onPress={() => navigation.navigate('Incident Report')}>
                            <Icon name="error-outline" size={24} color="white" />
                            <Text style={styles.buttonText}>מצב חירום</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.button, styles.grayButton]} onPress={() => navigation.navigate('User Management')}>
                            <Icon name="account-circle" size={24} color="white" />
                            <Text style={styles.buttonText}>פרופיל</Text>
                        </TouchableOpacity>
                    </View>

                    {/* כפתור הצהוב נורה נמצא כאן בשורה נפרדת */}
                    <View style={styles.yellowButtonContainer}>
                        <TouchableOpacity style={styles.yellowButton} onPress={() => navigation.navigate('WarningLightsScreen')}>
                            <Icon name="warning" size={24} color="white" />
                            <Text style={styles.yellowButtonText}>נדלקה לי נורה מה לעשות?</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: wp('4%'),  
        backgroundColor: '#f8f8f8',
    },
    logoContainer: {
        alignItems: 'center',
        marginBottom: hp('-4%'), 
        marginTop: hp('-2%'),  

    },
    logo: {
        width: wp('50%'),  
        height: hp('30%'), 
    },
    welcomeText: {
        fontSize: wp('5%'),  
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: hp('2%'),
    },
    userName: {
        color: '#AD40AF',
        fontWeight: 'bold',
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyCarContainer: {
        alignItems: 'center',
    },
    carContainer: {
        alignItems: 'center',
    },
    carTitle: {
        fontSize: wp('4%'),  
        fontWeight: 'bold',
        marginBottom: hp('1%'),
    },
    emptyCarImage: {
        width: wp('30%'),
        height: wp('30%'),
        borderWidth: 2,
        borderColor: '#ccc',
        backgroundColor: '#f0f0f0',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: hp('2%'),
    },
    missingCarText: {
        fontSize: wp('4%'),
        color: 'red',
        textAlign: 'center',
    },
    divider: {
        backgroundColor: '#d3d3d3',
        height: 2,
        marginVertical: hp('3%'),
    },
    menu: {
        marginTop: hp('2%'),
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: hp('1%'),
    },
    button: {
        flex: 1,
        flexDirection: 'row',
        padding: wp('4%'),  // אחוזים לרוחב
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: wp('2%'),
    },
    greenButton: {
        backgroundColor: 'green',
    },
    orangeButton: {
        backgroundColor: 'orange',
    },
    redButton: {
        backgroundColor: 'red',
    },
    grayButton: {
        backgroundColor: 'gray',
    },
    buttonText: {
        fontSize: wp('4%'),
        color: 'white',
        marginLeft: wp('2%'),
    },
    yellowButtonContainer: {
        marginBottom: hp('3%'), 
    },
    yellowButton: {
        backgroundColor: 'yellow',
        padding: wp('4%'),
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: hp('1%'), 
    },
    yellowButtonText: {
        fontSize: wp('5%'),
        color: 'black',
        marginLeft: wp('2%'),
    },
});

export default HomePage;