import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Linking, Alert, Image, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';


const headerImage = require('../assets/opps.jpg');

const IncidentReportScreen = () => {
  const [openSection, setOpenSection] = useState(null);
  const [images, setImages] = useState({
    license: null,
    insurance: null,
    damage: null,
    otherCarDamage: null,
    additionalPhotos: null,
  });
  const [imageLinks, setImageLinks] = useState({
    license: null,
    insurance: null,
    damage: null,
    otherCarDamage: null,
    additionalPhotos: null,
  });
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  // פונקציה להעלאת תמונה לענן Cloudinary
  const uploadImageToCloudinary = async (imageUri, key) => {
    let data = new FormData();
    data.append('file', {
      uri: imageUri,
      type: 'image/jpeg',
      name: `${key}.jpg`,
    });
    data.append('upload_preset', 'incident_report_upload'); 

    try {
      let response = await fetch(
        'https://api.cloudinary.com/v1_1/docgkuwtm/image/upload', 
        {
          method: 'POST',
          body: data,
        }
      );
      let jsonResponse = await response.json();
      setImageLinks((prevLinks) => ({ ...prevLinks, [key]: jsonResponse.secure_url }));
      
    
      setImages((prevImages) => ({ ...prevImages, [key]: 'uploaded' }));
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  // צילום תמונה
  const takePhoto = async (key) => {
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    if (!permission.granted) {
      Alert.alert('הרשאת גישה נדחתה', 'יש לאשר גישה למצלמה כדי לצלם תמונה.');
      return;
    }

    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      const imageUri = result.assets[0].uri;
      setImages((prevImages) => ({ ...prevImages, [key]: imageUri }));
      await uploadImageToCloudinary(imageUri, key); // מעלה את התמונה לענן
    }
  };

  
  const sendReport = () => {
    if (!phone || !email) {
      Alert.alert('שגיאה', 'אנא מלא את מספר הטלפון וכתובת המייל.');
      return;
    }

    const imageUrls = Object.values(imageLinks).filter(Boolean);
    if (imageUrls.length === 0) {
      Alert.alert('שגיאה', 'עליך לצלם לפחות תמונה אחת.');
      return;
    }

    const mailtoUrl = `mailto:${email}?subject=דו"ח תאונה&body=טלפון: ${phone}%0D%0A
    רישיון: ${imageLinks.license || 'לא צולמה תמונה'}%0D%0A
    פוליסת ביטוח: ${imageLinks.insurance || 'לא צולמה תמונה'}%0D%0A
    נזק לרכב: ${imageLinks.damage || 'לא צולמה תמונה'}%0D%0A
    נזק לרכב המעורב: ${imageLinks.otherCarDamage || 'לא צולמה תמונה'}%0D%0A
    תמונות נוספות: ${imageLinks.additionalPhotos || 'לא צולמה תמונה'}%0D%0A`;

    Linking.openURL(mailtoUrl);
  };

  return (
    <View style={styles.container}>

      {/* תמונת כותרת פיזית */}
      <Image
        source={headerImage} // ייבוא התמונה הפיזית
        style={styles.headerImage} // סגנון חדש לתמונה
        resizeMode="contain" 
      />

      {/* אירוע נזק גופני */}
      <TouchableOpacity style={styles.section} onPress={() => toggleSection('injury')}>
        <View style={styles.sectionHeader}>
          <MaterialCommunityIcons name="ambulance" size={30} color="orange" />
          <Text style={styles.sectionTitle}>אירוע נזק גופני</Text>
          <FontAwesome name={openSection === 'injury' ? 'chevron-up' : 'chevron-down'} size={20} color="orange" />
        </View>
      </TouchableOpacity>
      {openSection === 'injury' && (
        <View style={styles.sectionContent}>
          <Text>נפגע אדם באירוע? מחובתך להודיע על כך למשטרה ולמד"א</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.actionButton} onPress={() => Linking.openURL('tel:100')}>
              <Text style={styles.buttonText}>חייג למשטרה</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton} onPress={() => Linking.openURL('tel:101')}>
              <Text style={styles.buttonText}>חייג למד"א</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* סיוע וגרירה */}
      <TouchableOpacity style={styles.section} onPress={() => toggleSection('towing')}>
        <View style={styles.sectionHeader}>
          <MaterialCommunityIcons name="tow-truck" size={30} color="orange" />
          <Text style={styles.sectionTitle}>סיוע וגרירה</Text>
          <FontAwesome name={openSection === 'towing' ? 'chevron-up' : 'chevron-down'} size={20} color="orange" />
        </View>
      </TouchableOpacity>
      {openSection === 'towing' && (
        <View style={styles.sectionContent}>
          <Text>צלצל אלינו לקבל סיוע בגרירת הרכב למוסך הקרוב</Text>
          <TouchableOpacity style={styles.actionButton} onPress={() => Linking.openURL('tel:097446814')}>
            <Text style={styles.buttonText}>חייג למוקד</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* תיעוד האירוע */}
      <TouchableOpacity style={styles.section} onPress={() => toggleSection('documentation')}>
        <View style={styles.sectionHeader}>
          <MaterialCommunityIcons name="camera" size={30} color="orange" />
          <Text style={styles.sectionTitle}>תיעוד האירוע</Text>
          <FontAwesome name={openSection === 'documentation' ? 'chevron-up' : 'chevron-down'} size={20} color="orange" />
        </View>
      </TouchableOpacity>
      {openSection === 'documentation' && (
        <ScrollView style={styles.sectionContent}>

          {[
            { key: 'license', label: 'צלם את הרישיון של הנהג המעורב' },
            { key: 'insurance', label: 'צלם את הפוליסה של הנהג המעורב' },
            { key: 'damage', label: 'צלם את הנזק ברכב' },
            { key: 'otherCarDamage', label: 'צלם את הנזק ברכב המעורב' },
            { key: 'additionalPhotos', label: 'תמונות נוספות' },
          ].map(({ key, label }) => (
            <View key={key} style={styles.itemRow}>
              <MaterialCommunityIcons name="camera" size={30} color="orange" />
              <Text style={styles.labelText}>{label}</Text>
              {images[key] === 'uploaded' ? (
                <TouchableOpacity style={styles.actionButtonWithIcon} disabled={true}>
                  <Text style={styles.buttonTextWithIcon}>תמונה עלתה</Text>
                  <FontAwesome name="check-circle" size={20} color="green" />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity style={styles.actionButton} onPress={() => takePhoto(key)}>
                  <Text style={styles.buttonText}>צלם עכשיו</Text>
                </TouchableOpacity>
              )}
            </View>
          ))}

          {/* פרטי התקשרות */}
          <Text style={styles.contactLabel}>הטלפון שלך ליצירת קשר</Text>
          <TextInput
            style={styles.input}
            keyboardType="phone-pad"
            value={phone}
            onChangeText={setPhone}
            placeholder="הזן מספר טלפון"
          />

          <Text style={styles.contactLabel}>כתובת מייל</Text>
          <TextInput
            style={styles.input}
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
            placeholder="הזן כתובת מייל"
          />

          {/* כפתור שלח */}
          <TouchableOpacity style={styles.submitButton} onPress={sendReport}>
            <Text style={styles.submitText}>שלח</Text>
          </TouchableOpacity>

        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white', 
  },
  headerImage: {
    width: '100%', 
    height: 200,   
    marginBottom: 20, 
  },
  section: {
    marginBottom: 10,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    backgroundColor: '#333',
    borderRadius: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'orange',
  },
  sectionContent: {
    padding: 15,
    backgroundColor: '#444',
    borderRadius: 10,
    maxHeight: 300, 
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  labelText: {
    fontSize: 16,
    color: 'orange',
  },
  actionButton: {
    backgroundColor: 'orange',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginVertical: 5,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  actionButtonWithIcon: {
    backgroundColor: 'green',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginVertical: 5,
  },
  buttonTextWithIcon: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    marginRight: 10,
  },
  contactLabel: {
    color: 'gray',
    marginBottom: 5,
  },
  input: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  submitButton: {
    backgroundColor: 'orange',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginTop: 20,
  },
  submitText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default IncidentReportScreen;
