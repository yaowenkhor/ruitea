import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import SegmentedButtonComponent from '../../components/SegmentedButtonComponent';
import { getDBConnection, getOrderHistory } from '../../assets/dbConnection';
import { _readUserSession } from '../../assets/sessionData';
import io from 'socket.io-client';

const SOCKET_URL = 'http://localhost:5000/order'; // Change to your server IP if not running on emulator

const OrderHistoryScreen = ({ navigation }) => {
  const [orderHistory, setOrderHistory] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [userId, setUserId] = useState(null);
  const socketRef = useRef(null);

  // Fetch user session and order history
  useEffect(() => {
    const fetchData = async () => {
      try {
        const session = await _readUserSession();
        const user_id = parseInt(session?.user_id, 10);
        setUserId(user_id);

        const db = await getDBConnection();
        const history = await getOrderHistory(db, user_id);
        setOrderHistory(history);
        setFilteredOrders(history.filter(order => order.status === 'Preparing'));
      } catch (error) {
        Alert.alert('Error', 'Failed to fetch order history.');
        console.error('Error fetching order history:', error);
      }
    };

    fetchData();
  }, []);

  // Setup socket connection for real-time status updates
  useEffect(() => {
    if (!userId) return;

    socketRef.current = io(SOCKET_URL, {
      transports: ['websocket'],
      path: '/order/socket.io',
      autoConnect: true,
    });

    socketRef.current.on('connect', () => {
      // Optionally emit a client_connected event if your backend expects it
      socketRef.current.emit('client_connected', { connected: true });
    });

    socketRef.current.on('server_send', async (msg) => {
      // msg is a JSON string
      try {
        const data = JSON.parse(msg);
        // Update the status of the order in the local state
        setOrderHistory(prevOrders => {
          const updated = prevOrders.map(order =>
            order.order_number === data.order_number
              ? { ...order, status: data.status }
              : order
          );
          // Also update filteredOrders based on the current segment
          setFilteredOrders(
            updated.filter(order =>
              selectedIndex === 0
                ? order.status === 'Preparing'
                : order.status === 'Ready to pick up'
            )
          );
          return updated;
        });
      } catch (e) {
        console.error('Socket message parse error:', e);
      }
    });

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, [userId, selectedIndex]);

  // Segment filter
  const filterOrders = index => {
    setSelectedIndex(index);
    setFilteredOrders(
      orderHistory.filter(order =>
        index === 0
          ? order.status === 'Preparing'
          : order.status === 'Ready to pick up'
      )
    );
  };

  const renderOrderCard = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() =>
        navigation.navigate('OrderTrackingScreen', {
          orderNumber: item.order_number,
        })
      }
    >
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
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Order History</Text>
      <SegmentedButtonComponent
        options={['Preparing', 'Ready to Pick Up']}
        selectedIndex={selectedIndex}
        onChange={event =>
          filterOrders(event.nativeEvent.selectedSegmentIndex)
        }
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
});

export default OrderHistoryScreen;
