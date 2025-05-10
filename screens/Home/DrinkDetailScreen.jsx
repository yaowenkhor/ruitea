import React, { useState, useEffect, useCallback } from 'react';
import {
  View, Text, Image,
  TouchableOpacity, Alert,
} from 'react-native';
import { getDBConnection, addCartItem, getCartItem } from '../../assets/dbConnection';
import { useRoute, useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { _readUserSession } from '../../assets/sessionData';
import { drinkDetailStyles as styles } from '../../modules/DrinkDetailStyle';

import { useFocusEffect } from '@react-navigation/native';


const DrinkDetailScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { drink } = route.params;

  const [size, setSize] = useState('Regular');
  const [sugar, setSugar] = useState('Normal');
  const [quantity, setQuantity] = useState(1);
  const [cartCount, setCartCount] = useState(0);

  const calculatePriceBySize = () => {
    let price = drink.price;
    if (size === 'Large') price *= 1.25;
    else if (size === 'Small') price *= 0.75;
    return price.toFixed(2);
  };
  
  const loadCartCount = async () => {
    const session = await _readUserSession();
    if (!session || !session.user_id) return;
  
    const db = await getDBConnection();
    const items = await getCartItem(db, session.user_id);
  
    // Sum total quantity of all items
    const totalCups = items.reduce((sum, item) => sum + item.quantity, 0);
    setCartCount(totalCups);
  };

  useFocusEffect(
    useCallback(()=>{
      loadCartCount();
    })
  );

  const handleAddToCart = async () => {
    try {
      const db = await getDBConnection();
      const session = await _readUserSession();

      if (!session || !session.user_id) {
        Alert.alert('Session Error', 'Please log in first.');
        return;
      }

      await addCartItem(db, session.user_id, drink.drink_id, quantity, size, sugar);
      Alert.alert('Success', 'Item added to cart!');
      loadCartCount();
    } catch (err) {
      console.error(err);
      Alert.alert('Error', 'Failed to add to cart');
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.cartIcon}
        onPress={() => navigation.navigate('CartScreen')}
      >
        <Ionicons name="cart-outline" size={25} color="#4A6B57" />
        {cartCount > 0 && (
          <View style={styles.cartBadge}>
            <Text style={styles.badgeText}>{cartCount}</Text>
          </View>
        )}
      </TouchableOpacity>

      <Image source={drink.image} style={styles.image} />
      <Text style={styles.name}>{drink.name}</Text>
      <Text style={styles.description}>{drink.description}</Text>
      <Text style={styles.price}>RM {calculatePriceBySize()}</Text>

      <Text style={styles.label}>Choose Size:</Text>
      <View style={styles.selector}>
        {['Small', 'Regular', 'Large'].map(option => (
          <TouchableOpacity
            key={option}
            style={[styles.selectButton, size === option && styles.selectedButton]}
            onPress={() => setSize(option)}
          >
            <Text style={[styles.selectText, size === option && styles.selectedText]}>
              {option}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.label}>Sugar Level:</Text>
      <View style={styles.selector}>
        {['0%', '50%', '100%'].map(option => (
          <TouchableOpacity
            key={option}
            style={[styles.selectButton, sugar === option && styles.selectedButton]}
            onPress={() => setSugar(option)}
          >
            <Text style={[styles.selectText, sugar === option && styles.selectedText]}>
              {option}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.label}>Quantity:</Text>
      <View style={styles.quantityRow}>
        <TouchableOpacity
          onPress={() => setQuantity(q => (q > 1 ? q - 1 : 1))}
          style={styles.qtyBtn}
        >
          <Text style={styles.qtyBtnText}>−</Text>
        </TouchableOpacity>
        <Text style={styles.qtyValue}>{quantity}</Text>
        <TouchableOpacity
          onPress={() => setQuantity(q => q + 1)}
          style={styles.qtyBtn}
        >
          <Text style={styles.qtyBtnText}>+</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleAddToCart}>
        <Text style={styles.buttonText}>Add to Cart</Text>
      </TouchableOpacity>
    </View>
  );
};

export default DrinkDetailScreen;
