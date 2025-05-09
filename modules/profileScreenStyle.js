// modules/profileScreenStyle.js
import {StyleSheet} from 'react-native';

export const profileStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#FAF9F6',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  logo: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
    borderRadius: 60,
    marginBottom: 20,
  },
  nameText: {
    fontFamily: 'Gantari-Bold',
    fontSize: 22,
    color: '#333',
    marginBottom: 4,
  },
  phoneText: {
    fontFamily: 'Gantari-Bold',
    color: '#555',
    marginBottom: 20,
  },
  button: {
    width: '100%',
    backgroundColor: '#4A6B57',
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    borderRadius: 24,
    marginTop: 10,
  },
  buttonText: {
    fontFamily: 'Gantari-Bold',
    color: 'white',
  },
  logoutButton: {
    backgroundColor: '#B00020',
  },
});
