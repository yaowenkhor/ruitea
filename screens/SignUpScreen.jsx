import React,{useState, useLayoutEffect} from 'react'
import {View, Text, Image, TouchableOpacity, TextInput, Alert} from 'react-native';
import { styles } from '../modules/loginoutStyle';

import LoadingComponent from '../components/LoadingComponent';

import { _readUserSession } from '../assets/sessionData';
let config = require('../Config');

const SignUpScreen = ({route, navigation}) => {

    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [phone, setPhone] = useState();
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
        setName('');
        setEmail('');
        setPhone('');
        setPassword('');
    }

    const inputValidation = () =>{
        if(!name || !email || !phone || !password){
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

    const _createUser = () =>{
        let url = config.settings.serverPath + 'api/user/create';

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
                name: name,
                phone: phone,
                password: password
            })
        }).then(async (response) => {
            const data = await response.json();
            if(response.ok){
                Alert.alert('Sign Up Successful', `${data.success}\n\nPlease log in with your new account details`);
                clearInput();
                navigation.navigate('LoginScreen');
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
        <Text style={styles.title}>Sip Happens! Sign Up Now</Text>
        <View>
            <Image style={styles.logo} source={require('../img/Logo.png')}/>
        </View>   
        <TextInput
            style={styles.input} 
            placeholder='Name'
            value={name}
            onChangeText={(text) =>{
                setName(text)
            }}
            autoCapitalize='none'
        />
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
            placeholder='Phone Number'
            value={phone}
            onChangeText={(text) =>{
                setPhone(text)
            }}
            keyboardType='numeric'
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
        <TouchableOpacity style={styles.button} onPress={_createUser}>
            <Text style={styles.button_text}>Sign Up</Text>
        </TouchableOpacity>
        <View style={styles.loginContainer}>
            <Text>Already have an account?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}><Text style={styles.link_text}>Login Here</Text></TouchableOpacity>
        </View>
        
    </View>
    )
}

export default SignUpScreen
