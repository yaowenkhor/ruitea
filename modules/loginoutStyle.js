import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FAF9F6',
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    title:{
        fontSize: 25,
        color: '#4A6B57',
        fontFamily: 'Gantari-Bold'
    },
    logo:{
        height: 280,
        width: 280,
        resizeMode: 'contain',
    },
    input:{
        height: 45,
        width: '100%',
        margin: 10,
        borderWidth: 1,
        borderColor: '#DDDDDD',
        padding: 10,
        borderRadius: 24,
        backgroundColor: 'white',
        fontWeight: '400',
        color: '#333333',
        fontFamily: 'Gantari-Bold'
    },
    loginContainer:{
        flexDirection: 'row',
        marginTop: 20,
        gap: 5
    },
    button:{
        width: '100%',
        backgroundColor: '#4A6B57',
        alignItems: 'center',
        justifyContent: 'center',
        height: 40,
        borderRadius: 24,
        marginTop: 20
    },
    button_text:{
        fontWeight: 'bold',
        color: 'white',
        fontFamily: 'Gantari-Bold'
    },
    link_text:{
        textDecorationLine: 'underline',
        fontFamily: 'Gantari-Bold'
    }
});