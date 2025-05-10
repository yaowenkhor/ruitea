<<<<<<< HEAD
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { getDBConnection, getAllDrinks } from '../../assets/dbConnection';

const DrinksListScreen = () => {
  const [drinks, setDrinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDrinks = async () => {
      try {
        setLoading(true);
        const db = await getDBConnection();
        const drinksData = await getAllDrinks(db);
        setDrinks(drinksData);
        console.log('Fetched drinks:', drinksData.length);
      } catch (err) {
        console.error('Error fetching drinks:', err);
        setError(err.message);
        Alert.alert('Error', 'Failed to load drinks');
      } finally {
        setLoading(false);
      }
    };

    fetchDrinks();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={item.image} style={styles.image} />
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.price}>RM {item.price.toFixed(2)}</Text>
    </View>
  );

  if (loading) {
    return <ActivityIndicator size="large" color="#4A6B57" style={{ marginTop: 40 }} />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Our Drinks</Text>
      <FlatList
        data={drinks}
        renderItem={renderItem}
        keyExtractor={item => item.drink_id.toString()}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        contentContainerStyle={{ padding: 16 }}
=======
import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  SectionList,
  Dimensions,
  Alert,
} from 'react-native';
import { getDBConnection, getAllDrinks } from '../../assets/dbConnection';
import { drinksListStyles as styles } from '../../modules/DrinksListStyle';


const CATEGORY_LIST = ['Coffee', 'MilkTea', 'Smoothie', 'Tea'];

const DrinksListScreen = ({ navigation }) => {
  const [sections, setSections] = useState([]);
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

  useEffect(() => {
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
    fetchDrinks();
  }, []);

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
    <View style={{ flex: 1, flexDirection: 'row' }}>
      
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
>>>>>>> 11dd4f5c1f1717c41dbd3fd213dea6cbd078c29d
      />
    </View>
  );
};

<<<<<<< HEAD
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingTop: 20 },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
    color: '#4A6B57',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 12,
    width: '48%',
    marginBottom: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    elevation: 3,
  },
  image: { width: 90, height: 90, resizeMode: 'contain', marginBottom: 8 },
  name: { fontWeight: '600', textAlign: 'center', fontSize: 14 },
  price: { fontSize: 12, color: '#888' },
});
=======
>>>>>>> 11dd4f5c1f1717c41dbd3fd213dea6cbd078c29d

export default DrinksListScreen;
