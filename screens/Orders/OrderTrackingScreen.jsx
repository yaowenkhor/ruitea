import React, { useEffect, useState } from 'react'
import { View, Text, Image, FlatList } from 'react-native'
import { orderDetailStyle } from '../../modules/orderDetailsStyle'
import { getDBConnection, getOrderDetails } from '../../assets/dbConnection'

import LoadingComponent from '../../components/LoadingComponent'


const OrderTrackingScreen = ({route}) => {

  const [ordersDetail, setOrdersDetail] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const orderNumber = route.params?.orderNumber;

  useEffect(()=>{
    const fetchData = async () =>{
      try {
        const db = await getDBConnection();
        const detailsData = await getOrderDetails(db, orderNumber);
        setOrdersDetail(detailsData);
      } catch (error) {
        console.log('Failed to get order details', orderNumber);
      }finally{
        setIsLoading(false)
      }
    }
    fetchData();
  },[])

  const renderOrderCard = ({ item }) => (
    <View style={orderDetailStyle.orderCard}>
      <View style={orderDetailStyle.cardRow}>
        <View style={orderDetailStyle.imageContainer}>
          <Image 
            source={item.image} 
            style={orderDetailStyle.drinkImage}
            resizeMode="contain"
          />
        </View>
        <View style={orderDetailStyle.detailsContainer}>
          <Text style={orderDetailStyle.drinkName}>{item.name}</Text>
          <View style={orderDetailStyle.specRow}>
            <Text style={orderDetailStyle.specLabel}>Size:</Text>
            <Text style={orderDetailStyle.specValue}>{item.size}</Text>
          </View>
          <View style={orderDetailStyle.specRow}>
            <Text style={orderDetailStyle.specLabel}>Sugar:</Text>
            <Text style={orderDetailStyle.specValue}>{item.sugar}</Text>
          </View>
          <View style={orderDetailStyle.specRow}>
            <Text style={orderDetailStyle.specLabel}>Quantity:</Text>
            <Text style={orderDetailStyle.specValue}>{item.quantity}</Text>
          </View>
        </View>
      </View>
    </View>
  );


  if(isLoading) return <LoadingComponent title={'Loading...'} />

  return (
    <View style={orderDetailStyle.container}>
      <Text style={orderDetailStyle.title}>Order Details #{orderNumber}</Text>
      <View >  
        <FlatList
          data={ordersDetail}
          renderItem={renderOrderCard}
        />
      </View>
    </View>
  )
}

export default OrderTrackingScreen
