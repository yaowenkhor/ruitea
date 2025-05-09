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
      />
    </View>
  );
};

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

export default DrinksListScreen;
