import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { styles } from '../../modules/loginoutStyle';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { _readUserSession } from '../../assets/sessionData';

const EditProfileScreen = ({ navigation }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [updatedName, setUpdatedName] = useState('');
  const [updatedPhone, setUpdatedPhone] = useState('');
  const [updatedPassword, setUpdatedPassword] = useState('');
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const session = await _readUserSession();
        console.log('Session loaded:', session);

        if (!session || !session.user_id) {
          navigation.replace('LoginScreen');
          return;
        }

        setUserId(session.user_id);

        const response = await fetch(`http://192.168.0.110:5003/api/user/${session.user_id}`);
        const data = await response.json();

        if (data.error) {
          Alert.alert('Error', data.error);
        } else {
          setUser(data);
          setUpdatedName(data.name);
          setUpdatedPhone(data.phone);
        }
      } catch (error) {
        console.error('Failed to fetch user data:', error);
        Alert.alert('Error', 'Failed to fetch user data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleUpdateProfile = async () => {
    const updatedData = {
      name: updatedName,
      phone: updatedPhone,
      ...(updatedPassword ? { password: updatedPassword } : {})
    };

    try {
      const response = await fetch(`http://192.168.0.110:5003/api/user/update/${userId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData),
      });

      const data = await response.json();
      if (data.success) {
        Alert.alert('Success', 'Profile updated successfully');
      } else {
        Alert.alert('Error', data.error);
      }
    } catch (error) {
      console.error('Failed to update profile:', error);
      Alert.alert('Error', 'Failed to update profile');
    }
  };


  if (isLoading || !user) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>

      <Text style={styles.label}>Email:</Text>
      <Text style={[styles.input, { paddingVertical: 10 }]}>{user.email}</Text>

      <Text style={styles.label}>Name:</Text>
      <TextInput
        style={styles.input}
        value={updatedName}
        onChangeText={setUpdatedName}
      />

      <Text style={styles.label}>Phone:</Text>
      <TextInput
        style={styles.input}
        value={updatedPhone}
        onChangeText={setUpdatedPhone}
      />
      
      <Text style={styles.label}>New Password:</Text>
      <TextInput
        style={styles.input}
        value={updatedPassword}
        onChangeText={setUpdatedPassword}
        secureTextEntry
        placeholder="Leave blank if unchanged"
      />
      
      <TouchableOpacity style={styles.button} onPress={handleUpdateProfile}>
        <Text style={styles.button_text}>Update Profile</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ProfileScreen')}>
       <Text style={styles.button_text}>Back to Profile</Text>
        </TouchableOpacity>
    </View>
  );
};

export default EditProfileScreen;
