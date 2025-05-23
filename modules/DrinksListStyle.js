import {StyleSheet, Dimensions} from 'react-native';

const screenWidth = Dimensions.get('window').width;

export const drinksListStyles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  sidebar: {
    width: 80,
    backgroundColor: '#f1f1f1',
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sidebarText: {
    fontSize: 14,
    fontFamily: 'Gantari-Bold',
    marginVertical: 10,
    color: '#4A6B57',
  },
  sectionHeader: {
    fontSize: 18,
    fontFamily: 'Gantari-Bold',
    backgroundColor: '#f0f0f0',
    paddingVertical: 8,
    paddingHorizontal: 10,
    marginTop: 10,
    borderRadius: 6,
    color: '#4A6B57',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 12,
    width: (screenWidth - 120) / 2,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    elevation: 2,
  },
  image: {
    width: 90,
    height: 90,
    resizeMode: 'contain',
    marginBottom: 8,
  },
  name: {
    fontFamily: 'Gantari-Bold',
    textAlign: 'center',
    fontSize: 14,
  },
  price: {
    fontSize: 12,
    color: '#888',
    fontFamily: 'Gantari-Bold',
  },
  cartIcon: {
    position: 'absolute',
    right: 16,
    top: 12,
    zIndex: 10,
  },
  cartBadge: {
    position: 'absolute',
    right: -6,
    top: -6,
    backgroundColor: '#B00020',
    borderRadius: 10,
    paddingHorizontal: 5,
    paddingVertical: 1,
  },
  badgeText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
});
