import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, SafeAreaView, TouchableOpacity, Alert, Image } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import login from '../Controllers/LoginController'; 
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Login({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert('Input Error', 'Please fill in both email and password');
            return;
        }
    
        try {
            const customer = await login(email, password);
            if (customer) {
                console.log('Customer data:', customer); // הוסף כאן console.log
                await AsyncStorage.setItem('user', JSON.stringify(customer));
                navigation.navigate('MainTabs');
            } else {
                Alert.alert('Login Failed', 'Invalid email or password');
            }
        } catch (error) {
            console.error('Login Error:', error.message);
            Alert.alert('Error', `Something went wrong. Please try again later. Error: ${error.message}`);
        }
    };
    

    return (
        <SafeAreaView style={{ flex: 1, justifyContent: 'center' }}>
            <View style={{ paddingHorizontal: 25 }}>
                <View style={{ alignItems: 'center' }}>
                    <Image source={require('../assets/Images/logo.png')} style={{ width: 300, height: 300, transform: [{ rotate: '0deg' }] }} />
                </View>
                <Text style={styles.titleLogin}>Login</Text>

                <View style={styles.inputEmail}>
                    <MaterialIcons name='alternate-email' size={20} color='#666' style={{ marginRight: 5 }} />
                    <TextInput
                        placeholder='Put your email'
                        style={{ flex: 1, paddingVertical: 0 }}
                        keyboardType='email-address'
                        value={email}
                        onChangeText={setEmail}
                    />
                </View>

                <View style={styles.inputEmail}>
                    <Ionicons name='lock-closed-outline' size={24} color='#666' style={{ marginRight: 5 }} />
                    <TextInput
                        placeholder='Enter your Password'
                        style={{ flex: 1, paddingVertical: 0 }}
                        secureTextEntry={true}
                        value={password}
                        onChangeText={setPassword}
                    />
                    <TouchableOpacity>
                        <Text style={{ color: '#AD40AF', fontSize: 14 }}>Forgot?</Text>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity onPress={handleLogin} style={styles.buttonLogin}>
                    <Text style={styles.textLogin}>Login</Text>
                </TouchableOpacity>
            </View>
            <Text style={{ textAlign: 'center', color: '#666', marginBottom: 14 }}>login use one of your social profiles</Text>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 30 }}>
                <TouchableOpacity>
                    <View style={{ borderColor: '#ddd', borderRadius: 10, borderWidth: 2, paddingHorizontal: 30, paddingVertical: 10 }}>
                        <Image source={require('../assets/Images/google.png')} style={{ width: 30, height: 30 }} />
                    </View>
                </TouchableOpacity>

                <TouchableOpacity>
                    <View style={{ borderColor: '#ddd', borderRadius: 10, borderWidth: 2, paddingHorizontal: 30, paddingVertical: 10 }}>
                        <Image source={require('../assets/Images/facebook.png')} style={{ width: 34, height: 34 }} />
                    </View>
                </TouchableOpacity>

                <TouchableOpacity>
                    <View style={{ borderColor: '#ddd', borderRadius: 10, borderWidth: 2, paddingHorizontal: 30, paddingVertical: 10 }}>
                        <Image source={require('../assets/Images/twitter.png')} style={{ width: 34, height: 34 }} />
                    </View>
                </TouchableOpacity>
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 30 }}>
                <Text>New on the app?</Text>
                <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                    <Text style={{ color: '#AD40AF', fontWeight: '700' }}> Register</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    titleLogin: {
        fontSize: 28,
        fontWeight: '500',
        color: '#333',
        marginBottom: 30,
    },
    inputEmail: {
        flexDirection: 'row',
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        paddingBottom: 8,
        marginBottom: 25,
    },
    buttonLogin: {
        backgroundColor: '#AD40AF',
        padding: 20,
        borderRadius: 10,
        marginBottom: 20,
        alignItems: 'center',
    },
    textLogin: {
        fontWeight: '600',
        fontSize: 16,
        color: '#fff',
    },
});
