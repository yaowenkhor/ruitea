import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, Alert } from 'react-native';
import { styles } from '../../modules/loginoutStyle';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { _readUserSession } from '../../assets/sessionData';

const ProfileScreen = ({ navigation }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const session = await _readUserSession();
        if (!session || !session.user_id) {
          navigation.replace('LoginScreen');
          return;
        }
        setUser(session);
      } catch (error) {
        console.error('Failed to load user session:', error);
        Alert.alert('Error', 'Failed to load profile data');
      }
    };
    loadUser();
  }, []);

  const handleLogout = async () => {
    try {
      await AsyncStorage.clear();
      navigation.replace('LoginScreen');
    } catch (error) {
      Alert.alert('Error', 'Failed to logout');
    }
  };

  if (!user) return <Text>Loading...</Text>;

  return (
    <View style={styles.container}>
      {/* Logo as profile image */}
      <Image
        source={require('../../img/Logo.png')}
        style={{
          width: 120,
          height: 120,
          resizeMode: 'contain',
          borderRadius: 60,
          marginBottom: 20,
        }}
      />

      <Text style={styles.title}>{user.name}</Text>
      <Text style={{ fontFamily: 'Gantari-Bold', color: '#555', marginBottom: 20 }}>{user.phone}</Text>

      {/* Buttons */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('AboutUsScreen')}
      >
        <Text style={styles.button_text}>About Us</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: '#4A6B57', marginTop: 10 }]}
        onPress={() => navigation.navigate('EditProfileScreen')}
      >
        <Text style={styles.button_text}>Edit Profile</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: '#B00020', marginTop: 10 }]}
        onPress={handleLogout}
      >
        <Text style={styles.button_text}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProfileScreen;
