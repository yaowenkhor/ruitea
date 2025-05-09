import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { _readUserSession } from '../../assets/sessionData';
import { profileStyles as styles } from '../../modules/profileScreenStyle';

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
      <Image source={require('../../img/Logo.png')} style={styles.logo} />
      <Text style={styles.nameText}>{user.name}</Text>
      <Text style={styles.phoneText}>{user.phone}</Text>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('AboutUsScreen')}>
        <Text style={styles.buttonText}>About Us</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('EditProfileScreen')}>
        <Text style={styles.buttonText}>Edit Profile</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, styles.logoutButton]} onPress={handleLogout}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProfileScreen;
