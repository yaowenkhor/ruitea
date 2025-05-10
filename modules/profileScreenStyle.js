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

export const aboutStyles = StyleSheet.create({
  aboutContainer: {
    padding: 20,
  },
  header: {
    fontFamily: 'Gantari-Bold',
    fontSize: 30,
    color: '#4A6B57',
    textAlign: 'center',
    marginBottom: 15
  },
  subHeader: {
    fontFamily: 'Gantari-Bold',
    fontSize: 22,
    fontWeight: '600',
    color: '#4A6B57',
    marginTop: 20,
    marginBottom: 10
  },
  paragraph: {
    fontFamily: 'Gantari-Bold',
    fontSize: 16,
    lineHeight: 24,
    color: '#4A6B57',
    marginBottom: 10,
  },
  bold: {
    fontWeight: 'bold'
  },
  bulletList: {
    marginLeft: 10,
    marginBottom: 10
  },
  bullet: {
    fontFamily: 'Gantari-Bold',
    fontSize: 15,
    color: '#4A6B57',
    marginVertical: 2
  },
  branchCard: {
    backgroundColor: '#4A6B57',
    borderRadius: 12,
    padding: 15,
    marginVertical: 10
  },
  branchName: {
    fontFamily: 'Gantari-Bold',
    fontSize: 18,
    color: 'white',
    marginBottom: 5
  },
  label: {
    fontFamily: 'Gantari-Bold',
    color: 'white',
    marginTop: 7
  },
  text: {
    fontFamily: 'Gantari-Bold',
    fontSize: 13,
    color: '#D7F2E3',
  },
});
