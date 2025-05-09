// CartScreenStyle.js
import {StyleSheet} from 'react-native';

export const cartStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  title: {
    fontFamily: 'Gantari-Bold',
    fontSize: 20,
    color: '#4A6B57',
    marginBottom: 10,
    textAlign: 'center',
  },
  card: {
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
  },
  image: {
    height: 60,
    width: 60,
    borderRadius: 10,
  },
  info: {
    flex: 1,
  },
  name: {
    fontFamily: 'Gantari-Bold',
    fontSize: 16,
  },
  price: {
    fontFamily: 'Gantari-Bold',
    color: '#777',
  },
  detail: {
    fontFamily: 'Gantari-Bold',
    color: '#999',
    fontSize: 12,
  },
  qtyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  swipeDelete: {
    backgroundColor: '#B00020',
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    marginTop: 25,
    height: '50%',
    borderRadius: 50,
  },
  totalContainer: {
    width: '100%',
    marginTop: 20,
  },
  totalText: {
    fontFamily: 'Gantari-Bold',
    fontSize: 18,
  },
});
