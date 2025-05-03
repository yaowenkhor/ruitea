import React from 'react'
import { View, Text } from 'react-native'
import { Flow } from 'react-native-animated-spinkit'

const LoadingComponent = ({title}) => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Flow size={55} color="#B4D3B2"/>
        <Text>{title}</Text>
    </View>
  )
}

export default LoadingComponent
