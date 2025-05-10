import React, { useEffect, useState } from 'react';
import { View, Button, Alert, PermissionsAndroid, Platform } from 'react-native';
import openMap from 'react-native-open-maps';
import Geolocation from '@react-native-community/geolocation';

const NavigateComponent = ({ destinationLat, destinationLong, destinationName }) => {
    const [userLocation, setUserLocation] = useState(null);

    // Request Location Permission
    const requestLocationPermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                {
                    title: 'Geolocation Permission Required',
                    message: 'This app needs to access your device location',
                }
            );

            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log('Location permission granted');
            } else {
                console.log('Location permission denied');
            }

            return granted;
        } catch (err) {
            console.warn(err);
        }
    };

    useEffect(() => {
        const getLocation = async () => {
            if (Platform.OS === 'android') {
                const granted = await requestLocationPermission();
                if (!granted) {
                    Alert.alert('Permission Denied', 'Location access is required to navigate.');
                    return;
                }
            }

            Geolocation.getCurrentPosition(
                (position) => {
                    setUserLocation({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                    });
                },
                (error) => {
                    console.warn(error);
                    Alert.alert('Location Error', 'Failed to get current location.');
                },
                {
                    enableHighAccuracy: true,
                    timeout: 20000,
                    maximumAge: 1000,
                }
            );
        };
        getLocation();
    }, []);

    // Check user location and open map
    const handleOpenMap = () => {
        if (!userLocation) {
            Alert.alert('Location not ready', 'Please wait until your location is detected.');
            return;
        }

        openMap({
            start: `${userLocation.latitude},${userLocation.longitude}`,
            end: `${destinationLat},${destinationLong}`,
            query: destinationName,
            travelType: 'drive',
        });
    };

    return (
        <View style={{ marginVertical: 10 }}>
            <Button
                title={userLocation ? "Navigate to Branch" : "Getting Location..."}
                onPress={handleOpenMap}
                color="#72A888"
                disabled={!userLocation}
            />
        </View>
    );
};

export default NavigateComponent;
