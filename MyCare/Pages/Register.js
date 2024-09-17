import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TextInput, Image, TouchableOpacity, ScrollView } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DateTimePicker from '@react-native-community/datetimepicker';
import register from '../Controllers/RegisterController'; // ייבוא פונקציית הרישום

export default function Register({ navigation }) {

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [driverLicense, setDriverLicense] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const onChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDateOfBirth(selectedDate);
    }
  };

  const showDatepicker = () => {
    setShowDatePicker(true);
  };

  const handleRegister = async () => {
    try {
      const response = await register(email, password, firstName, lastName, dateOfBirth, driverLicense);
      console.log('Registration successful:', response);
      navigation.navigate('Login');
    } catch (error) {
      console.error('Registration failed:', error.message);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center' }}>
      <ScrollView>
        <View style={{ paddingHorizontal: 25 }}>
          <View style={{ alignItems: 'center' }}>
            <Image source={require('../assets/Images/logo.png')} style={{ width: 300, height: 300, transform: [{ rotate: '-5deg' }] }} />
          </View>
          <Text style={styles.titleLogin}>Register</Text>

          <View style={styles.inputField}>
            <MaterialIcons name='person-outline' size={20} color='#666' style={{ marginRight: 5 }} />
            <TextInput
              placeholder='First Name'
              style={{ flex: 1, paddingVertical: 0 }}
              value={firstName}
              onChangeText={(text) => setFirstName(text)}
            />
          </View>

          <View style={styles.inputField}>
            <MaterialIcons name='person-outline' size={20} color='#666' style={{ marginRight: 5 }} />
            <TextInput
              placeholder='Last Name'
              style={{ flex: 1, paddingVertical: 0 }}
              value={lastName}
              onChangeText={(text) => setLastName(text)}
            />
          </View>

          <View style={styles.inputField}>
            <MaterialIcons name='calendar-today' size={20} color='#666' style={{ marginRight: 5 }} />
            {dateOfBirth ? (
              <Text style={{ flex: 1, paddingVertical: 10 }} onPress={showDatepicker}>
                {dateOfBirth.toLocaleDateString()}
              </Text>
            ) : (
              <TouchableOpacity onPress={showDatepicker} style={{ flex: 1, paddingVertical: 0 }}>
                <TextInput
                  placeholder='Date of Birth'
                  editable={false}
                  style={{ flex: 1, paddingVertical: 0 }}
                />
              </TouchableOpacity>
            )}
          </View>

          {showDatePicker && (
            <DateTimePicker
              value={dateOfBirth || new Date()}
              mode="date"
              display="default"
              onChange={onChange}
              maximumDate={new Date()}
            />
          )}

          <View style={styles.inputField}>
            <MaterialIcons name='drive-eta' size={20} color='#666' style={{ marginRight: 5 }} />
            <TextInput
              placeholder="Driver's License Number"
              style={{ flex: 1, paddingVertical: 0 }}
              value={driverLicense}
              onChangeText={(text) => setDriverLicense(text)}
            />
          </View>

          <View style={styles.inputField}>
            <MaterialIcons name='alternate-email' size={20} color='#666' style={{ marginRight: 5 }} />
            <TextInput
              placeholder='Put your email'
              style={{ flex: 1, paddingVertical: 0 }}
              keyboardType='email-address'
              value={email}
              onChangeText={(text) => setEmail(text)}
            />
          </View>

          <View style={styles.inputField}>
            <Ionicons name='lock-closed-outline' size={24} color='#666' style={{ marginRight: 5 }} />
            <TextInput
              placeholder='Put your Password'
              style={{ flex: 1, paddingVertical: 0 }}
              secureTextEntry={true}
              value={password}
              onChangeText={(text) => setPassword(text)}
            />
          </View>

          <TouchableOpacity onPress={handleRegister} style={styles.buttonLogin}>
            <Text style={styles.textLogin}>Register</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
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
  inputField: {
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
