import React, { useState, useEffect, useRef } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, Alert } from 'react-native';
import { styles } from '../../modules/loginoutStyle';
import { Swipeable } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  getDBConnection,
  getCartItem,
  updateCartItem,
  removeCartItem,
} from '../../assets/dbConnection.js';

const CartScreen = ({ navigation }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const user_id = 1; // Replace with session data when available
  const swipeableRefs = useRef({});

  const loadCart = async () => {
    try {
      const db = await getDBConnection();
      const items = await getCartItem(db, user_id);

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

  useEffect(() => {
    loadCart();
  }, []);

  const getTotal = () =>
    cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);

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
    Alert.alert('Remove Item', 'Are you sure you want to remove this item?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          const db = await getDBConnection();
          await removeCartItem(db, id);
          swipeableRefs.current[id]?.close();
          setCartItems(items => items.filter(item => item.id !== id));
        },
      },
    ]);
  };

  const renderRightActions = (id) => (
    <TouchableOpacity
      onPress={() => deleteItem(id)}
      style={{
        backgroundColor: '#B00020',
        justifyContent: 'center',
        alignItems: 'center',
        width: 50,
        marginTop: 25,
        height: '50%',
        borderTopRightRadius: 50,
        borderBottomRightRadius: 50,
        borderTopLeftRadius: 50,
        borderBottomLeftRadius: 50,
      }}
    >
      <Icon name="trash-can-outline" size={25} color="#fff" />
    </TouchableOpacity>
  );

  const renderItem = ({ item }) => (
    <Swipeable
      ref={(ref) => (swipeableRefs.current[item.id] = ref)}
      renderRightActions={() => renderRightActions(item.id)}
      overshootRight={false}
    >
      <View
        style={{
          backgroundColor: 'white',
          borderRadius: 12,
          padding: 10,
          marginVertical: 8,
          width: '100%',
          shadowColor: '#000',
          shadowOpacity: 0.1,
          shadowRadius: 6,
          elevation: 3,
          flexDirection: 'row',
          alignItems: 'center',
          gap: 10,
        }}
      >
        <Image source={item.image} style={{ height: 60, width: 60, borderRadius: 10 }} />
        <View style={{ flex: 1 }}>
          <Text style={{ fontFamily: 'Gantari-Bold', fontSize: 16 }}>{item.name}</Text>
          <Text style={{ fontFamily: 'Gantari-Bold', color: '#777' }}>RM {item.price.toFixed(2)}</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
          <TouchableOpacity onPress={() => decreaseQty(item.id)}>
            <Text style={{ fontSize: 20 }}>−</Text>
          </TouchableOpacity>
          <Text>{item.quantity}</Text>
          <TouchableOpacity onPress={() => increaseQty(item.id)}>
            <Text style={{ fontSize: 20 }}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Swipeable>
  );

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      Alert.alert('Error', 'Your cart is empty. Please add items before proceeding.');
      return;
    }
    navigation.navigate('CheckoutScreen', { total: getTotal() });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        <Icon name="cart" size={25} /> Your Cart
      </Text>
      <FlatList
        style={{ width: '100%' }}
        data={cartItems}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListEmptyComponent={
          <Text style={{ fontFamily: 'Gantari-Bold', marginTop: 20 }}>
            Your cart is empty.
          </Text>
        }
      />
      <View style={{ width: '100%', marginTop: 20 }}>
        <Text style={{ fontFamily: 'Gantari-Bold', fontSize: 18 }}>
          Total: RM {getTotal()}
        </Text>
        <TouchableOpacity
          style={styles.button}
          onPress={handleCheckout}
        >
          <Text style={styles.button_text}>Checkout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CartScreen;
