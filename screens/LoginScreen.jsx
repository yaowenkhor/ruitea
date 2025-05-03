import React,{useState, useLayoutEffect} from 'react'
import {View, Text, Image, TouchableOpacity, TextInput, Alert} from 'react-native';
import { styles } from '../modules/loginoutStyle';

import LoadingComponent from '../components/LoadingComponent';

import { _saveUserSession, _readUserSession } from '../assets/sessionData';
let config = require('../Config');

const LoginScreen = ({route, navigation}) => {

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const [isLoading, setIsLoading] = useState(true);

    const checkSession = async () =>{
        const session = await _readUserSession();
        if(session && session.user_id){
            navigation.navigate('BottomTab');
        }else{
            setIsLoading(false);
        }
    }

    useLayoutEffect(()=>{
        checkSession();
    },[]);

    const clearInput = () =>{
        setEmail('');
        setPassword('');
    }

    const inputValidation = () =>{
        if( !email || !password){
            Alert.alert('Error', 'All field are required');
            return false;
        }

        if(!/\S+@\S+\.\S+/.test(email)){
            Alert.alert('Error', 'Email format is invalid');
            return false;
        }

        if (password.length < 6) {
            Alert.alert('Error', 'Password must be at least 6 characters')
            return false;
        }

        return true;
    }

    const _loginUser = () =>{
        let url = config.settings.serverPath + 'api/user/login';

        if(!inputValidation()){
            return;
        }

        fetch(url,{
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
              },
            body: JSON.stringify({
                email: email,
                password: password
            })
        }).then(async (response) => {
            const data = await response.json();
            if(response.ok){
                Alert.alert('Message', data.success);
                clearInput();
                _saveUserSession(data.user.user_id, data.user.name, data.user.email, data.user.phone);
            }else{
                Alert.alert('Message', data.error);
            }
        }).catch(error =>{
            Alert.alert('Message', error.message);
        })

    }

    if (isLoading) return (
        <LoadingComponent title={'Checking Session...'}/>
    );

    return (
    <View style={styles.container}>
        <Text style={styles.title}>Sign In to Sip Again</Text>
        <View>
            <Image style={styles.logo} source={require('../img/Logo.png')}/>
        </View>   
        <TextInput
            style={styles.input} 
            placeholder='Email'
            value={email}
            onChangeText={(text) =>{
                setEmail(text)
            }}
            autoCapitalize='none'
        />
        <TextInput
            style={styles.input} 
            placeholder='Password'
            value={password}
            onChangeText={(text) =>{
                setPassword(text)
            }}
            secureTextEntry={true}
            autoCapitalize='none'
        />
        <TouchableOpacity style={styles.button} onPress={_loginUser}>
            <Text style={styles.button_text}>Login</Text>
        </TouchableOpacity>
        <View style={styles.loginContainer}>
            <Text>Does not have an account?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('SignUpScreen')}><Text style={styles.link_text}>Sign Up Here</Text></TouchableOpacity>
        </View>
    </View>
  )
}

export default LoginScreen
