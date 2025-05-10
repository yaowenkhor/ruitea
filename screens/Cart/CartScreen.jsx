import React, { useState, useRef, useCallback } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, Alert } from 'react-native';
import { styles } from '../../modules/loginoutStyle';
import { cartStyles } from '../../modules/CartScreenStyle';
import { Swipeable } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  getDBConnection,
  getCartItem,
  updateCartItem,
  removeCartItem,
} from '../../assets/dbConnection';
import { _readUserSession } from '../../assets/sessionData';

import { useFocusEffect } from '@react-navigation/native';

import LoadingComponent from '../../components/LoadingComponent';

const CartScreen = ({ navigation }) => {
  const [cartItems, setCartItems] = useState([]);
  const [userId, setUserId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const swipeableRefs = useRef({});

  const loadCart = async () => {
    try {
      const session = await _readUserSession();
      if (!session || !session.user_id) {
        Alert.alert('Error', 'User not logged in.');
        navigation.replace('LoginScreen');
        return;
      }

      setUserId(session.user_id);
      const db = await getDBConnection();
      const items = await getCartItem(db, session.user_id);

      const formatted = items.map(item => ({
        id: item.cart_id.toString(),
        cart_id: item.cart_id,
        drink_id: item.drink_id,
        name: item.name,
        price: parseFloat(item.price),
        quantity: item.quantity,
        image: item.image,
        size: item.size,
        sugar: item.sugar,
      }));

      setCartItems(formatted);
      setIsLoading(false);
    } catch (error) {
      console.error('Load cart failed:', error);
    }
  };

  useFocusEffect(
    useCallback(() =>{
      loadCart();
    },[]));

  const getAdjustedPrice = (basePrice, size) => {
    if (size === 'Small') return basePrice * 0.75;
    if (size === 'Large') return basePrice * 1.25;
    return basePrice;
  };

  const getTotal = () =>
    cartItems.reduce((total, item) => total + getAdjustedPrice(item.price, item.size) * item.quantity, 0).toFixed(2);

  const increaseQty = async (id) => {
    const updatedItems = cartItems.map(item =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCartItems(updatedItems);

    const item = updatedItems.find(item => item.id === id);
    const db = await getDBConnection();
    await updateCartItem(db, item.cart_id, item.quantity, item.size, item.sugar);
  };

  const decreaseQty = async (id) => {
    const item = cartItems.find(i => i.id === id);
    if (item.quantity <= 1) return;

    const updatedItems = cartItems.map(item =>
      item.id === id ? { ...item, quantity: item.quantity - 1 } : item
    );
    setCartItems(updatedItems);

    const db = await getDBConnection();
    await updateCartItem(db, item.cart_id, item.quantity - 1, item.size, item.sugar);
  };

  const deleteItem = async (id) => {
    try {
      const db = await getDBConnection();
      await removeCartItem(db, id);
      swipeableRefs.current[id]?.close();
      setCartItems(items => items.filter(item => item.id !== id));
    } catch (error) {
      console.error('Failed to delete item:', error);
    }
  };

  const renderRightActions = (id) => (
    <TouchableOpacity
      onPress={() => deleteItem(id)}
      style={cartStyles.swipeDelete}
    >
      <Ionicons name="trash-outline" size={25} color="#fff"/>
    </TouchableOpacity>
  );

  const renderItem = ({ item }) => {
    const adjustedPrice = getAdjustedPrice(item.price, item.size);
    return (
      <Swipeable
        ref={(ref) => (swipeableRefs.current[item.id] = ref)}
        renderRightActions={() => renderRightActions(item.id)}
        overshootRight={false}
      >
        <View style={cartStyles.card}>
          <Image source={item.image} style={cartStyles.image} />
          <View style={cartStyles.cardDetails}>
            <Text style={cartStyles.name}>{item.name}</Text>
            <Text style={cartStyles.price}>RM {adjustedPrice.toFixed(2)}</Text>
            <Text style={cartStyles.detail}>Size: {item.size} | Sugar: {item.sugar}</Text>
          </View>
          <View style={cartStyles.qtyContainer}>
            <TouchableOpacity onPress={() => decreaseQty(item.id)}>
              <Text style={cartStyles.qtyBtn}>−</Text>
            </TouchableOpacity>
            <Text>{item.quantity}</Text>
            <TouchableOpacity onPress={() => increaseQty(item.id)}>
              <Text style={cartStyles.qtyBtn}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Swipeable>
    );
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      Alert.alert('Error', 'Your cart is empty. Please add items before proceeding.');
      return;
    }
    navigation.navigate('CheckoutScreen', { total: getTotal() });
  };

  if (isLoading) {
    return (
      <LoadingComponent title={'Loading...'}/>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        <Ionicons name="cart-outline" size={25} />
      </Text>
      <FlatList
        style={cartStyles.list}
        data={cartItems}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListEmptyComponent={<Text style={cartStyles.empty}>Your cart is empty.</Text>}
      />
      <View style={cartStyles.totalContainer}>
        <Text style={cartStyles.totalText}>Total: RM {getTotal()}</Text>
        <TouchableOpacity style={styles.button} onPress={handleCheckout}>
          <Text style={styles.button_text}>Checkout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CartScreen;
