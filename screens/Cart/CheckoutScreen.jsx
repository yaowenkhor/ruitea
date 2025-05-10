import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Alert, ToastAndroid } from 'react-native';
import { styles } from '../../modules/loginoutStyle';
import { checkoutStyles as cs } from '../../modules/checkoutScreenStyle';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { getDBConnection, processCheckout } from '../../assets/dbConnection';
import { _readUserSession } from '../../assets/sessionData';
import socket from '../../assets/socketConnection';



const CheckoutScreen = ({ route, navigation }) => {
  const [selectedMethod, setSelectedMethod] = useState('');
  const [error, setError] = useState('');
  const { total } = route.params;
  const cartTotal = parseFloat(total);
  const serviceTax = (cartTotal * 0.06).toFixed(2);
  const netTotal = (cartTotal + parseFloat(serviceTax)).toFixed(2);

  useEffect(() =>{
    socket.on('connect', ()=>{
      console.log(socket.id);
      socket.emit('client_connected', {connected: true});
      ToastAndroid.show('Connected to server', ToastAndroid.LONG);
    });

    socket.on('error', (error) => {
      ToastAndroid.show('Failed to connect to server', ToastAndroid.LONG);
    });

    return () => {
      socket.off('connect');
      socket.off('error');
    };

  },[]) 


  const handleConfirm = async () => {

    const session = await _readUserSession();
    if (!selectedMethod) {
      setError('Please select a payment method');
      return;
    }

    const db = await getDBConnection();
    const orderMetaData = await processCheckout(db, session.user_id);
    console.log(orderMetaData);

    Alert.alert('Order Confirmed', `Payment by: ${selectedMethod}`);

    try {
      socket.emit('client_send',{
        order: orderMetaData
      })
    } catch (error) {
      console.error('Socket error:', error);
    }

    navigation.popToTop();

    navigation.navigate('Orders',{
      screen: 'OrderHistoryScreen',
      params: { refresh: Date.now() }
    });
  };

  const paymentMethods = ['Credit Card', 'E-Wallet', 'Pay at Counter'];

  return (
    <View style={cs.container}>
      <Ionicons name="cash-outline" size={50} color="#4A6B57" style={{ marginBottom: 10 }}/>

      <Text style={styles.title}>Checkout</Text>

      <Text style={cs.sectionTitle}>Select Payment Method</Text>

      <View style={cs.paymentOptionGroup}>
        {paymentMethods.map((method) => (
          <TouchableOpacity
            key={method}
            onPress={() => setSelectedMethod(method)}
            style={cs.paymentOption}
          >
            <View style={cs.radioOuter}>
              {selectedMethod === method && <View style={cs.radioInner} />}
            </View>
            <Text style={cs.paymentText}>{method}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {error !== '' && <Text style={cs.errorText}>{error}</Text>}

      <View style={cs.summaryBox}>
        <Text style={cs.summaryTitle}>Payment Summary</Text>
        <View style={{ marginTop: 10 }}>
          <Text style={cs.summaryText}>Subtotal: RM {cartTotal.toFixed(2)}</Text>
          <Text style={cs.summaryText}>Service Tax (6%): RM {serviceTax}</Text>
          <Text style={cs.summaryTotal}>Net Total: RM {netTotal}</Text>
        </View>
      </View>

      <TouchableOpacity style={[styles.button, { marginTop: 30 }]} onPress={handleConfirm}>
        <Text style={styles.button_text}>Confirm Order</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.goBack()} style={cs.backLink}>
        <Text style={styles.link_text}>Back to Cart</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CheckoutScreen;
