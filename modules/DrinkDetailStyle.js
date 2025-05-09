import {StyleSheet} from 'react-native';

export const drinkDetailStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  cartIcon: {
    alignSelf: 'flex-end',
    marginBottom: 10,
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
  image: {
    width: 180,
    height: 180,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  name: {
    fontSize: 22,
    fontWeight: '700',
    color: '#4A6B57',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: '#444',
    textAlign: 'center',
    marginBottom: 10,
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#888',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    alignSelf: 'flex-start',
    color: '#4A6B57',
    marginTop: 10,
    marginBottom: 4,
  },
  selector: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 10,
  },
  selectButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
    marginHorizontal: 5,
  },
  selectedButton: {
    backgroundColor: '#4A6B57',
    borderColor: '#4A6B57',
  },
  selectText: {
    fontWeight: '600',
    color: '#4A6B57',
  },
  selectedText: {
    color: 'white',
  },
  quantityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  qtyBtn: {
    paddingHorizontal: 14,
    paddingVertical: 4,
    backgroundColor: '#eee',
    borderRadius: 10,
    marginHorizontal: 10,
  },
  qtyBtnText: {
    fontSize: 20,
    color: '#4A6B57',
    fontWeight: 'bold',
  },
  qtyValue: {
    fontSize: 18,
    fontWeight: '600',
  },
  button: {
    backgroundColor: '#4A6B57',
    paddingVertical: 12,
    paddingHorizontal: 28,
    borderRadius: 25,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
