import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ToastAndroid,
} from 'react-native';
import SegmentedButtonComponent from '../../components/SegmentedButtonComponent';
import {
  getDBConnection,
  getOrderHistory,
  updateOrderStatus,
  hasFeedback
} from '../../assets/dbConnection';
import {_readUserSession} from '../../assets/sessionData';
import socket from '../../assets/socketConnection';

import LoadingComponent from '../../components/LoadingComponent';

const OrderHistoryScreen = ({navigation, route}) => {
  const [orderHistory, setOrderHistory] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const session = await _readUserSession();
      const user_id = session.user_id;
  
      const db = await getDBConnection();
      const history = await getOrderHistory(db, user_id);
  
      // Add hasFeedback field to each order
      const enrichedHistory = await Promise.all(
        history.map(async order => {
          if (order.status === 'Past') {
            const feedbackGiven = await hasFeedback(db, order.order_number);
            return { ...order, hasFeedback: feedbackGiven };
          }
          return order;
        })
      );
  
      setOrderHistory(enrichedHistory);
      setFilteredOrders(
        enrichedHistory.filter(
          order =>
            order.status === 'Preparing' || order.status === 'Ready to pick up'
        )
      );
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch order history.');
      console.error('Error fetching order history:', error);
    } finally {
      setIsLoading(false);
    }
  };
  

  useEffect(() => {
    socket.on('connect', () => {
      console.log(socket.id);
      socket.emit('client_connected', {connected: true});
      ToastAndroid.show('Connected to server', ToastAndroid.LONG);
    });

    socket.on('server_send', data => {
      console.log('Socket data received:', data);

      (async () => {
        const statusData = typeof data === 'string' ? JSON.parse(data) : data;
        const {order_number, status} = statusData;

        if (status === 'Ready to pick up') {
          try {
            const db = await getDBConnection();
            await updateOrderStatus(db, order_number, status);
            await fetchData();
          } catch (error) {
            console.error('Failed to update order status:', error);
          }
        }

        ToastAndroid.show(
          `Order #${order_number} is now ${status}`,
          ToastAndroid.LONG,
        );
      })();
    });

    fetchData();

    return () => {
      socket.off('connect');
      socket.off('server_send');
      socket.off('error');
    };
  }, [route.params?.refresh]);

  const filterOrders = index => {
    setSelectedIndex(index);
    setFilteredOrders(
      orderHistory.filter(order =>
        index === 0
          ? order.status === 'Preparing' || order.status === 'Ready to pick up'
          : order.status === 'Past',
      ),
    );
  };

  const handleCollect = async orderNumber => {
    try {
      const db = await getDBConnection();
      await updateOrderStatus(db, orderNumber, 'Past');
      await fetchData();
      Alert.alert('Order Collected', 'The order has been collected');
    } catch (error) {
      console.error('Failed to update order status:', error);
    }
  };

  const renderOrderCard = ({item}) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() =>
        navigation.navigate('OrderTrackingScreen', {
          orderNumber: item.order_number,
        })
      }>
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle}>#{item.order_number}</Text>
        <View
          style={[
            styles.statusTag,
            item.status === 'Preparing' ? styles.preparing : styles.ready,
          ]}>
          <Text style={styles.statusText}>{item.status}</Text>
        </View>
      </View>
      <Text style={styles.cardDate}>{item.date}</Text>

      {item.status === 'Ready to pick up' && (
        <TouchableOpacity
          style={styles.collectButton}
          onPress={() => handleCollect(item.order_number)}>
          <Text style={styles.collectText}>Order Collected</Text>
        </TouchableOpacity>
      )}
      {item.status === 'Past' && !item.hasFeedback && (
        <TouchableOpacity
          style={styles.collectButton}
          onPress={() =>
            navigation.navigate('FeedbackScreen', {
              order_number: item.order_number,
            })
          }>
          <Text style={styles.collectText}>Give feedback</Text>
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );

  if (isLoading) {
    return <LoadingComponent title="Loading orders..." />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Order History</Text>
      <SegmentedButtonComponent
        options={['Active', 'Past']}
        selectedIndex={selectedIndex}
        onChange={event => filterOrders(event.nativeEvent.selectedSegmentIndex)}
      />
      <FlatList
        data={filteredOrders}
        keyExtractor={item => item.order_number}
        renderItem={renderOrderCard}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No orders found.</Text>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 26,
    color: '#2D2D2D',
    textAlign: 'center',
    marginBottom: 20,
    fontFamily: 'Gantari-Bold',
  },
  card: {
    backgroundColor: '#fff',
    padding: 18,
    marginVertical: 10,
    borderRadius: 10,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 18,
    color: '#333',
    fontFamily: 'Gantari-Bold',
  },
  cardDate: {
    marginTop: 8,
    fontSize: 15,
    color: '#777',
    fontFamily: 'Gantari-Bold',
  },
  statusTag: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 20,
  },
  preparing: {
    backgroundColor: '#FFE8C3',
  },
  ready: {
    backgroundColor: '#C2F0C2',
  },
  statusText: {
    fontSize: 13,
    color: '#333',
    fontFamily: 'Gantari-Bold',
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#999',
    marginTop: 40,
    fontFamily: 'Gantari-Bold',
  },
  collectButton: {
    marginTop: 10,
    width: '100%',
    backgroundColor: '#4A6B57',
    padding: 10,
    borderRadius: 8,
  },
  collectText: {
    fontFamily: 'Gantari-Bold',
    color: 'white',
  },
});

export default OrderHistoryScreen;
