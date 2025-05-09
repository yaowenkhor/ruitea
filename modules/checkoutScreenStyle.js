// modules/checkoutScreenStyle.js
import {StyleSheet} from 'react-native';

export const checkoutStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF9F6',
    padding: 20,
    alignItems: 'center',
  },
  sectionTitle: {
    fontFamily: 'Gantari-Bold',
    fontSize: 16,
    marginTop: 20,
    alignSelf: 'flex-start',
  },
  paymentOptionGroup: {
    alignSelf: 'flex-start',
    marginTop: 10,
    gap: 12,
  },
  paymentOption: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioOuter: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#4A6B57',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  radioInner: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: '#4A6B57',
  },
  paymentText: {
    fontFamily: 'Gantari-Bold',
    color: '#333',
  },
  errorText: {
    color: '#B00020',
    marginTop: 8,
    fontFamily: 'Gantari-Bold',
  },
  summaryBox: {
    backgroundColor: 'white',
    width: '100%',
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    marginTop: 30,
  },
  summaryTitle: {
    fontFamily: 'Gantari-Bold',
    fontSize: 16,
  },
  summaryText: {
    fontFamily: 'Gantari-Bold',
    color: '#444',
    marginTop: 6,
  },
  summaryTotal: {
    fontFamily: 'Gantari-Bold',
    fontSize: 16,
    marginTop: 10,
  },
  backLink: {
    marginTop: 15,
  },
});
