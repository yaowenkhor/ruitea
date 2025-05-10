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

import LoadingComponent from '../../components/LoadingComponent';

const banners = [
  require('../../img/banner1.png'),
  require('../../img/banner2.png'),
];

const previewDrinks = [
  {
    drink_id: 8,
    name: 'Matcha Milk Tea',
    description: 'Green tea flavored milk tea',
    price: 4.5,
    image: require('../../img/MilkTea/MatchaMilkTea.png'),
  },
  {
    drink_id: 13,
    name: 'Ice Blended Matcha',
    description: 'Refreshing green tea blended drink',
    price: 5.25,
    image: require('../../img/SmoothieBlended/IceBlendedMatcha.png'),
  },
];

const screenWidth = Dimensions.get('window').width;

const LogoHeader = () => (
  <View style={homeStyles.logoContainer}>
    <TouchableOpacity onPress={() => Alert.alert('Logo Clicked')}>
      <Image
        source={require('../../img/Logo.png')}
        style={homeStyles.logoImage}
      />
    </TouchableOpacity>
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

const HomeScreen = () => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);
  const [currentBanner, setCurrentBanner] = useState(0);
  const bannerRef = useRef(null);

  const checkSession = async () => {
    const session = await _readUserSession();
    if (!session || !session.user_id) {
      Alert.alert('Session Expired', 'Please log in to access the app.');
      navigation.replace('LoginScreen');
    } else {
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
    return (
      <LoadingComponent title={'Loading...'}/>
    );
  }

  return (
    <FlatList
      ListHeaderComponent={
        <>
          <LogoHeader />
          <BannerSlider bannerRef={bannerRef} currentBanner={currentBanner} />
          <Text style={homeStyles.welcomeText}>Welcome to RuiTea!</Text>
          <Text style={homeStyles.categoryTitle}>Best Seller Drinks</Text>
        </>
      }
      data={previewDrinks}
      renderItem={({ item }) => <DrinkCard item={item} navigation={navigation} />}
      keyExtractor={(item) => item.drink_id.toString()}
      numColumns={2}
      columnWrapperStyle={{ justifyContent: 'space-between' }}
      contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 24 }}
      ListFooterComponent={
        <TouchableOpacity
          style={{
            backgroundColor: '#4A6B57',
            paddingVertical: 12,
            paddingHorizontal: 20,
            borderRadius: 25,
            alignSelf: 'center',
            marginTop: 10,
            marginBottom: 30,
          }}
          onPress={() => navigation.navigate('DrinkListScreen')}
        >
          <Text style={{ color: '#fff', fontFamily: 'Gantari-Bold', }}>
            View Full Menu
          </Text>
        </TouchableOpacity>
      }
    />
  );
};

export default HomeScreen;