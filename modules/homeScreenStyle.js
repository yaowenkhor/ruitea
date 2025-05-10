import {StyleSheet, Dimensions} from 'react-native';

const screenWidth = Dimensions.get('window').width;

export const homeStyles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#FAF9F6',
  },

  // Logo
  logoContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  logoImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
  },

  // Banner
  bannerWrapper: {
    width: screenWidth - 32,
    alignSelf: 'center',
    height: 200,
    marginBottom: 20,
    position: 'relative',
    borderRadius: 24,
    overflow: 'hidden',
  },
  bannerImage: {
    width: screenWidth - 32,
    height: 200,
    resizeMode: 'cover',
  },

  indicatorWrapper: {
    flexDirection: 'row',
    position: 'absolute',
    top: 10,
    left: 10,
    zIndex: 1,
  },
  dot: {
    height: 8,
    width: 8,
    borderRadius: 4,
    backgroundColor: '#444',
    marginHorizontal: 4,
  },

  // Titles
  categoryTitle: {
    fontFamily: 'Gantari-Bold',
    fontSize: 18,
    marginBottom: 8,
    alignSelf: 'flex-start',
    paddingHorizontal: 16,
  },
  welcomeText: {
    fontSize: 30,
    textAlign: 'center',
    color: '#355E3B',
    marginBottom: 20,
    fontFamily: 'Gantari-Bold',
  },

  // Drink card
  drinkCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    width: (screenWidth - 48) / 2,
    marginBottom: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: 1},
    shadowRadius: 3,
    elevation: 3,
    marginRight: 15,
  },

  drinkImage: {
    width: 120,
    height: 120,
    borderRadius: 8,
    resizeMode: 'contain',
    marginBottom: 8,
  },
  drinkName: {
    fontSize: 15,
    fontFamily: 'Gantari-Bold',
    textAlign: 'center',
  },
  drinkPrice: {
    fontSize: 14,
    color: 'gray',
    textAlign: 'center',
    fontFamily: 'Gantari-Bold',
  },
  ViewFullMenuButton: {
    backgroundColor: '#4A6B57',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    alignSelf: 'center',
    marginTop: 20,
  },
});
