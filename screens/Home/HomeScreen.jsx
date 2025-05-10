import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  Alert,
  ScrollView,
  Dimensions,
} from 'react-native';
import { homeStyles } from '../../modules/homeScreenStyle';
import { _readUserSession } from '../../assets/sessionData';
import { useNavigation } from '@react-navigation/native';
import { getDBConnection, getTagDrinks } from '../../assets/dbConnection';
import LoadingComponent from '../../components/LoadingComponent';

const banners = [
  require('../../img/banner1.png'),
  require('../../img/banner2.png'),
];

const screenWidth = Dimensions.get('window').width;

const LogoHeader = () => (
  <View style={homeStyles.logoContainer}>
    <Image
      source={require('../../img/Logo.png')}
      style={homeStyles.logoImage}
    />
  </View>
);

const BannerSlider = ({ bannerRef }) => (
  <View style={homeStyles.bannerWrapper}>
    <ScrollView
      horizontal
      pagingEnabled
      ref={bannerRef}
      scrollEnabled={false}
      showsHorizontalScrollIndicator={false}
    >
      {banners.map((img, index) => (
        <Image key={index} source={img} style={homeStyles.bannerImage} />
      ))}
    </ScrollView>
  </View>
);

const DrinkCard = ({ item, navigation }) => (
  <TouchableOpacity
    style={homeStyles.drinkCard}
    onPress={() => navigation.navigate('DrinkDetailScreen', { drink: item })}
  >
    <Image source={item.image} style={homeStyles.drinkImage} />
    <Text style={homeStyles.drinkName}>{item.name}</Text>
    <Text style={homeStyles.drinkPrice}>RM {item.price.toFixed(2)}</Text>
  </TouchableOpacity>
);

const HorizontalDrinkList = ({ title, data, navigation }) => (
  <>
    <Text style={homeStyles.categoryTitle}>{title}</Text>
    <FlatList
      data={data}
      horizontal
      keyExtractor={(item) => item.drink_id.toString()}
      renderItem={({ item }) => (
        <View style={{ marginRight: 16 }}>
          <DrinkCard item={item} navigation={navigation} />
        </View>
      )}
      contentContainerStyle={{ paddingLeft: 16 }}
      showsHorizontalScrollIndicator={false}
    />
  </>
);

const HomeScreen = () => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);
  const [currentBanner, setCurrentBanner] = useState(0);
  const [popularDrinks, setPopularDrinks] = useState([]);
  const [newDrinks, setNewDrinks] = useState([]);
  const bannerRef = useRef(null);

  const checkSession = async () => {
    const session = await _readUserSession();
    if (!session || !session.user_id) {
      Alert.alert('Session Expired', 'Please log in to access the app.');
      navigation.replace('LoginScreen');
    } else {
      const db = await getDBConnection();
      const popular = await getTagDrinks(db, 'popular');
      const latest = await getTagDrinks(db, 'new');
      setPopularDrinks(popular);
      setNewDrinks(latest);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkSession();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (currentBanner + 1) % banners.length;
      setCurrentBanner(nextIndex);
      bannerRef.current?.scrollTo({ x: nextIndex * screenWidth, animated: true });
    }, 3000);
    return () => clearInterval(interval);
  }, [currentBanner]);

  if (isLoading) {
    return <LoadingComponent title={'Loading...'} />;
  }

  return (
    <ScrollView contentContainerStyle={{ paddingBottom: 30 }}>
      <LogoHeader />
      <BannerSlider bannerRef={bannerRef} />
      <Text style={homeStyles.welcomeText}>Welcome to RuiTea!</Text>

      <HorizontalDrinkList
        title="Popular Drinks"
        data={popularDrinks}
        navigation={navigation}
      />

      <HorizontalDrinkList
        title="New Arrivals"
        data={newDrinks}
        navigation={navigation}
      />

      <TouchableOpacity
        style={ homeStyles.ViewFullMenuButton }
        onPress={() => navigation.navigate('DrinkListScreen')}
      >
        <Text style={{ color: '#fff', fontFamily: 'Gantari-Bold' }}>
          View Full Menu
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default HomeScreen;
