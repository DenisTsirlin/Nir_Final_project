import React from 'react';
import { View, Text, Image, Alert, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // ייבוא האייקון

// ייבוא התמונה של הנורות
const warningLightsImage = require('../assets/warningLightsImage.jpg');

const WarningLightsScreen = ({ navigation }) => {
  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;

  // הגדרת גובה התמונה שתהיה 50% מגובה המסך
  const imageHeight = screenHeight * 0.5;

  // פונקציה לטיפול בלחיצה על נורה
  const handleLightPress = (lightName, needsGarage) => {
    Alert.alert(
      `מידע: ${lightName}`,
      needsGarage
        ? 'הנורה הזו מחייבת הגעה למוסך. האם תרצה לנווט למוסכים הקרובים?'
        : 'הנורה הזו לא מחייבת הגעה למוסך, ניתן להמשיך בנסיעה.',
      needsGarage
        ? [
            {
              text: 'כן, לנווט למוסך',
              onPress: () => navigation.navigate('NearbyGarages'), 
            },
            { text: 'ביטול', style: 'cancel' },
          ]
        : [{ text: 'אוקיי', style: 'cancel' }]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Ionicons name="car" size={30} color="purple" style={styles.icon} />
        <Text style={styles.title}>תקלות נורות חיווי ברכב</Text>
      </View>

      <Text style={styles.subtitle}>אנא לחץ על הנורה שנדלקה לך וקבל מידע על התקלה ומה צריך לעשות</Text>

      <View style={styles.imageContainer}>
        <Image source={warningLightsImage} style={{ width: screenWidth, height: imageHeight }} resizeMode="contain" />

        {/* לחיצה על כל נורה לפי המיקומים שנמדדו לפי גודל התמונה */}
        {/* שורה ראשונה */}
        <TouchableOpacity
          style={[styles.iconTouchable, { top: imageHeight * 0.06, left: screenWidth * 0.1 }]}
          onPress={() => handleLightPress('נורת חימום', false)} // לא מחייבת מוסך
        />
        <TouchableOpacity
          style={[styles.iconTouchable, { top: imageHeight * 0.06, left: screenWidth * 0.35 }]}
          onPress={() => handleLightPress('נורת מצבר', true)} // מחייבת מוסך
        />
        <TouchableOpacity
          style={[styles.iconTouchable, { top: imageHeight * 0.06, left: screenWidth * 0.6 }]}
          onPress={() => handleLightPress('נורת מנוע', true)} // מחייבת מוסך
        />
        <TouchableOpacity
          style={[styles.iconTouchable, { top: imageHeight * 0.06, left: screenWidth * 0.85 }]}
          onPress={() => handleLightPress('נורת בלמים', true)} // מחייבת מוסך
        />

        {/* שורה שניה */}
        <TouchableOpacity
          style={[styles.iconTouchable, { top: imageHeight * 0.30, left: screenWidth * 0.1 }]}
          onPress={() => handleLightPress('נורת חום מנוע', true)} // מחייבת מוסך
        />
        <TouchableOpacity
          style={[styles.iconTouchable, { top: imageHeight * 0.30, left: screenWidth * 0.35 }]}
          onPress={() => handleLightPress('נורת בלם חניה', false)} // לא מחייבת מוסך
        />
        <TouchableOpacity
          style={[styles.iconTouchable, { top: imageHeight * 0.30, left: screenWidth * 0.6 }]}
          onPress={() => handleLightPress('נורת דלק', false)} // לא מחייבת מוסך
        />
        <TouchableOpacity
          style={[styles.iconTouchable, { top: imageHeight * 0.30, left: screenWidth * 0.85 }]}
          onPress={() => handleLightPress('נורת החלקה', false)} // לא מחייבת מוסך
        />

        {/* שורה שלישית */}
        <TouchableOpacity
          style={[styles.iconTouchable, { top: imageHeight * 0.55, left: screenWidth * 0.1 }]}
          onPress={() => handleLightPress('נורת לחץ אוויר בצמיגים', true)} // מחייבת מוסך
        />
        <TouchableOpacity
          style={[styles.iconTouchable, { top: imageHeight * 0.55, left: screenWidth * 0.35 }]}
          onPress={() => handleLightPress('נורת כריות אוויר', true)} // מחייבת מוסך
        />
        <TouchableOpacity
          style={[styles.iconTouchable, { top: imageHeight * 0.55, left: screenWidth * 0.6 }]}
          onPress={() => handleLightPress('נורת חימום חלון', false)} // לא מחייבת מוסך
        />
        <TouchableOpacity
          style={[styles.iconTouchable, { top: imageHeight * 0.55, left: screenWidth * 0.85 }]}
          onPress={() => handleLightPress('נורת חירום', true)} // מחייבת מוסך
        />

        {/* שורה רביעית */}
        <TouchableOpacity
          style={[styles.iconTouchable, { top: imageHeight * 0.80, left: screenWidth * 0.1 }]}
          onPress={() => handleLightPress('נורת פנסי ערפל', false)} // לא מחייבת מוסך
        />
        <TouchableOpacity
          style={[styles.iconTouchable, { top: imageHeight * 0.80, left: screenWidth * 0.35 }]}
          onPress={() => handleLightPress('נורת שמן', true)} // מחייבת מוסך
        />
        <TouchableOpacity
          style={[styles.iconTouchable, { top: imageHeight * 0.80, left: screenWidth * 0.6 }]}
          onPress={() => handleLightPress('נורת ABS', true)} // מחייבת מוסך
        />
        <TouchableOpacity
          style={[styles.iconTouchable, { top: imageHeight * 0.80, left: screenWidth * 0.85 }]}
          onPress={() => handleLightPress('נורת חגורת בטיחות', false)} // לא מחייבת מוסך
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black', 
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'purple',
    marginLeft: 10, 
  },
  icon: {
    marginRight: 5,
  },
  subtitle: {
    fontSize: 14,
    color: 'gray',
    textAlign: 'center',
    marginBottom: 10,
  },
  imageContainer: {
    position: 'relative',
    alignItems: 'center',
  },
  iconTouchable: {
    position: 'absolute',
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
});

export default WarningLightsScreen;
