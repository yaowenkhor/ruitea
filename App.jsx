import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

import SignUpScreen from './screens/SignUpScreen';
import LoginScreen from './screens/LoginScreen';

import HomeScreen from './screens/Home/HomeScreen'
import DrinksListScreen from './screens/Home/DrinksListScreen';
import DrinkDetailScreen from './screens/Home/DrinkDetailScreen';

import CartScreen from './screens/Cart/CartScreen';
import CheckoutScreen from './screens/Cart/CheckoutScreen';

import OrderTrackingScreen from './screens/Orders/OrderTrackingScreen';
import OrderHistoryScreen from './screens/Orders/OrderHistoryScreen';
import FeedbackScreen from './screens/Orders/FeedbackScreen';

import ProfileScreen from './screens/Profile/ProfileScreen';
import AboutUsScreen from './screens/Profile/AboutUsScreen';

const App = () =>{
    return(
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen 
                    name='SignUpScreen'
                    component={SignUpScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen 
                    name='LoginScreen'
                    component={LoginScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen 
                    name='BottomTab'
                    component={BottomTab}
                    options={{ headerShown: false }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

const BottomTab = () =>{
    return(
            <Tab.Navigator 
                initialRouteName={'Home'}
                screenOptions={{
                    tabBarStyle: {
                        height: 55,
                        paddingBottom: 10,
                        backgroundColor: '#FAF9F6',
                        borderTopLeftRadius: 20,
                        borderTopRightRadius: 20,

                    }, 
                    tabBarLabelStyle: {
                        fontFamily: 'Gantari-Bold',
                        borderTopColor: '#E6E6E6',
                    },
                    tabBarActiveTintColor: '#4A6B57',
                    tabBarInactiveTintColor: '#D3D3D3',
                }}
            >
                <Tab.Screen 
                    name='Home' 
                    component={Home}
                    options={{
                        tabBarIcon: ({focused}) =>{
                            return <Ionicons name="home-outline" size={23} color={focused ? '#4A6B57' : '#D3D3D3'}/>;
                        },
                        headerShown: false
                    }}/>
                <Tab.Screen 
                    name='Cart'
                    component={Cart} 
                    options={{
                        tabBarIcon: ({focused}) =>{
                            return <Ionicons name="cart-outline" size={23} color={focused ? '#4A6B57' : '#D3D3D3'} />;
                        },
                        headerShown: false
                     }}/>
                <Tab.Screen 
                    name='Orders'
                    component={Orders} 
                    options={{
                        tabBarIcon: ({focused}) =>{
                            return <Ionicons name="receipt-outline" size={23} color={focused ? '#4A6B57' : '#D3D3D3'} />;
                        },
                        headerShown: false
                    }}/>
                <Tab.Screen 
                    name='Profile'
                    component={Profile} 
                    options={{
                        tabBarIcon: ({focused}) =>{
                            return <Ionicons name="person-outline" size={23} color={focused ? '#4A6B57' : '#D3D3D3'} />;
                        },
                        headerShown: false
                    }}/>
            </Tab.Navigator>
    )
}

const Home = () =>{
    return(
            <Stack.Navigator initialRouteName={'HomeScreen'}>
                <Stack.Screen 
                    name='HomeScreen'
                    component={HomeScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen 
                    name='DrinkListScreen'
                    component={DrinksListScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen 
                    name='DrinkDetailScreen'
                    component={DrinkDetailScreen}
                    options={{ headerShown: false }}
                />
            </Stack.Navigator>
    )
}

const Cart = () =>{
    return(
            <Stack.Navigator initialRouteName={'CartScreen'}>
                <Stack.Screen 
                    name='CartScreen'
                    component={CartScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen 
                    name='CheckoutScreen'
                    component={CheckoutScreen}
                    options={{ headerShown: false }}
                />
            </Stack.Navigator>
    )
}

const Orders = () =>{
    return(
            <Stack.Navigator initialRouteName='OrderTrackingScreen'>
                <Stack.Screen
                    name='OrderTrackingScreen'
                    component={OrderTrackingScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name='OrderHistoryScreen'
                    component={OrderHistoryScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name='FeedbackScreen'
                    component={FeedbackScreen}
                    options={{ headerShown: false }}
                />
            </Stack.Navigator>
    )
}

const Profile = () =>{
    return(
            <Stack.Navigator initialRouteName='ProfileScreen'>
                <Stack.Screen 
                    name='ProfileScreen'
                    component={ProfileScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen 
                    name='AboutUsScreen'
                    component={AboutUsScreen}
                    options={{ headerShown: false }}
                />
            </Stack.Navigator>
    )
}






export default App;
