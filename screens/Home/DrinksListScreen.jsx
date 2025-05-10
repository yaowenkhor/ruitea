import React, { useEffect, useState, useRef, useCallback } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  SectionList,
  Dimensions,
  Alert,
} from 'react-native';
import { getDBConnection, getAllDrinks, getCartItem } from '../../assets/dbConnection';
import { _readUserSession } from '../../assets/sessionData';
import { drinksListStyles as styles } from '../../modules/DrinksListStyle';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useFocusEffect } from '@react-navigation/native';

const CATEGORY_LIST = ['Coffee', 'MilkTea', 'Smoothie', 'Tea'];

const DrinksListScreen = ({ navigation }) => {
  const [sections, setSections] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const sectionListRef = useRef(null);

  const formatDataToRows = (drinks) => {
    const grouped = {
      Coffee: [],
      MilkTea: [],
      SmoothieBlended: [],
      Tea: [],
    };

    drinks.forEach(drink => {
      if (grouped[drink.category]) {
        grouped[drink.category].push(drink);
      }
    });

    // Convert to rows of 2 drinks each
    return Object.entries(grouped).map(([title, items]) => ({
      title,
      data: items.reduce((rows, item, index) => {
        if (index % 2 === 0) rows.push([item]);
        else rows[rows.length - 1].push(item);
        return rows;
      }, []),
    }));
  };

  const fetchDrinks = async () => {
    try {
      const db = await getDBConnection();
      const drinksData = await getAllDrinks(db);
      const grouped = formatDataToRows(drinksData);
      setSections(grouped);
    } catch (error) {
      console.error('Error loading drinks:', error);
      Alert.alert('Error', 'Failed to load drinks');
    }
  };

  const loadCartCount = async () => {
    const session = await _readUserSession();
    if (!session || !session.user_id) return;
    const db = await getDBConnection();
    const items = await getCartItem(db, session.user_id);
    const totalCups = items.reduce((sum, item) => sum + item.quantity, 0);
    setCartCount(totalCups);
  };

  useFocusEffect(
    useCallback(() => {
      fetchDrinks();
      loadCartCount();
    }, [])
  );

  const handleScrollToSection = (index) => {
    sectionListRef.current?.scrollToLocation({
      sectionIndex: index,
      itemIndex: 0,
      animated: true,
    });
  };

  const renderItem = ({ item }) => (
    <View style={styles.row}>
      {item.map((drink, idx) => (
        <TouchableOpacity
          key={idx}
          style={styles.card}
          onPress={() => navigation.navigate('DrinkDetailScreen', { drink })}
        >
          <Image source={drink.image} style={styles.image} />
          <Text style={styles.name}>{drink.name}</Text>
          <Text style={styles.price}>RM {drink.price.toFixed(2)}</Text>
        </TouchableOpacity>
      ))}
      {item.length === 1 && <View style={[styles.card, { opacity: 0 }]} />} 
    </View>
  );

  const renderSectionHeader = ({ section: { title } }) => (
    <Text style={styles.sectionHeader}>{title}</Text>
  );

  return (
    <View style={{ flex: 1 }}>
      {/* Cart icon */}
      <TouchableOpacity
        style={styles.cartIcon}
        onPress={() => navigation.navigate('CartScreen')}
      >
        <Ionicons name="cart-outline" size={25} color="#4A6B57" />
        {cartCount > 0 && (
          <View style={styles.cartBadge }>
            <Text style={ styles.badgeText }>{cartCount}</Text>
          </View>
        )}
      </TouchableOpacity>

      <View style={{ flexDirection: 'row', flex: 1, marginTop: 40 }}>
        {/* Sidebar */}
        <View style={styles.sidebar}>
          {CATEGORY_LIST.map((category, index) => (
            <TouchableOpacity key={index} onPress={() => handleScrollToSection(index)}>
              <Text style={styles.sidebarText}>{category}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Drink List */}
        <SectionList
          ref={sectionListRef}
          sections={sections}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
          renderSectionHeader={renderSectionHeader}
          stickySectionHeadersEnabled={false}
          contentContainerStyle={{ padding: 16 }}
          style={{ flex: 1 }}
        />
      </View>
    </View>
  );
};

export default DrinksListScreen;
