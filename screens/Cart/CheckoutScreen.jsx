import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { styles } from '../../modules/loginoutStyle';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const CheckoutScreen = ({ route, navigation }) => {
  const [selectedMethod, setSelectedMethod] = useState('');
  const [error, setError] = useState('');
  const { total } = route.params;
  const cartTotal = parseFloat(total);
  const serviceTax = (cartTotal * 0.06).toFixed(2);
  const netTotal = (cartTotal + parseFloat(serviceTax)).toFixed(2);

  const handleConfirm = () => {
    if (!selectedMethod) {
      setError('Please select a payment method');
      return;
    }
    setError('');
    Alert.alert('Order Confirmed', `Payment by: ${selectedMethod}`);
    navigation.popToTop();
  };

  const paymentMethods = ['Credit Card', 'E-Wallet', 'Pay at Counter'];

  return (
    <View style={styles.container}>
      <Icon name="credit-card-check-outline" size={50} color="#4A6B57" style={{ marginBottom: 10 }} />
      <Text style={styles.title}>Checkout</Text>

      <Text style={{ fontFamily: 'Gantari-Bold', fontSize: 16, marginTop: 20, alignSelf: 'flex-start' }}>
        Select Payment Method
      </Text>
      
      <View style={{ alignSelf: 'flex-start', marginTop: 10, gap: 12 }}>
        {paymentMethods.map((method) => (
          <TouchableOpacity
            key={method}
            onPress={() => setSelectedMethod(method)}
            style={{ flexDirection: 'row', alignItems: 'center' }}
          >
            <View
              style={{
                height: 20,
                width: 20,
                borderRadius: 10,
                borderWidth: 2,
                borderColor: '#4A6B57',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: 10,
              }}
            >
              {selectedMethod === method && (
                <View
                  style={{
                    height: 10,
                    width: 10,
                    borderRadius: 5,
                    backgroundColor: '#4A6B57',
                  }}
                />
              )}
            </View>
            <Text style={{ fontFamily: 'Gantari-Bold', color: '#333' }}>{method}</Text>
          </TouchableOpacity>
        ))}
      </View>
      {error !== '' && (
        <Text style={{ color: '#B00020', marginTop: 8, fontFamily: 'Gantari-Bold' }}>
          {error}
        </Text>
      )}
      <View
        style={{
          backgroundColor: 'white',
          width: '100%',
          padding: 20,
          borderRadius: 12,
          shadowColor: '#000',
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 2,
          marginTop: 30,
        }}
      >
        <Text style={{ fontFamily: 'Gantari-Bold', fontSize: 16 }}>Payment Summary</Text>
        <View style={{ marginTop: 10 }}>
          <Text style={{ fontFamily: 'Gantari-Bold', color: '#444' }}>Subtotal: RM {cartTotal.toFixed(2)}</Text>
          <Text style={{ fontFamily: 'Gantari-Bold', color: '#444' }}>Service Tax (6%): RM {serviceTax}</Text>
          <Text style={{ fontFamily: 'Gantari-Bold', fontSize: 16, marginTop: 10 }}>Net Total: RM {netTotal}</Text>
        </View>
      </View>

      <TouchableOpacity style={[styles.button, { marginTop: 30 }]} onPress={handleConfirm}>
        <Text style={styles.button_text}>Confirm Order</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginTop: 15 }}>
        <Text style={styles.link_text}>Back to Cart</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CheckoutScreen;
