import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ToastAndroid,
} from 'react-native';
import {getDBConnection, giveFeedback} from '../../assets/dbConnection';
import {feedbackStyles as styles} from '../../modules/feedbackStyle';
import RatingComponent from '../../components/RatingComponent';
import {_readUserSession} from '../../assets/sessionData';
import io from 'socket.io-client';

const socket = io('http://10.0.2.2:5001/feedback', {
  transports: ['websocket'],
});

const FeedbackScreen = ({route, navigation}) => {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const {order_number} = route.params || {};

  useEffect(() => {
    socket.on('connect', () => {
      console.log('CONNECTED:', socket.id);
      socket.emit('client_connected', {connected: true});
      ToastAndroid.show('Connected to server', ToastAndroid.LONG);
    });

    socket.on('server_send', data => {
      console.log('Server response:', data);
      let message = JSON.parse(data);
      const reply = message.rating_response;
      Alert.alert('Success', reply || 'Thank you for your feedback!', [
        {text: 'OK', onPress: () => navigation.goBack()},
      ]);
    });

    socket.on('error', error => {
      console.error('Socket error:', error);
      ToastAndroid.show('Failed to connect to server', ToastAndroid.LONG);
    });

    if (!socket.connected) {
      console.log('Socket not connected, trying to connect...');
      socket.connect();
    }

    return () => {
      socket.off('connect');
      socket.off('server_send');
      socket.off('error');
    };
  }, []);

  const handleSubmit = async () => {
    try {
      const session = await _readUserSession();
      const user_id = session.user_id;

      if (!rating) {
        Alert.alert('Error', 'Please select a rating');
        return;
      }

      const db = await getDBConnection();
      await giveFeedback(db, order_number, rating, comment, user_id);

      try {
        console.log('Sending rating:', rating);
        socket.emit('client_send', {
          feedback: {
            rating: rating,
          },
        });

        ToastAndroid.show('Sending feedback...', ToastAndroid.SHORT);
      } catch (socketError) {
        console.error('Socket error:', socketError);
        Alert.alert('Success', 'Thank you for your feedback!', [
          {text: 'OK', onPress: () => navigation.goBack()},
        ]);
      }
    } catch (error) {
      console.error('Failed to submit feedback:', error);
      Alert.alert('Error', 'Failed to submit feedback. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Rate Your Experience</Text>

      <View style={styles.ratingContainer}>
        <Text style={styles.ratingLabel}>How was your order?</Text>
        <Text style={styles.ratingLabel}>Order Number : #{order_number}</Text>
        <RatingComponent rating={rating} setRatingChange={setRating} />
      </View>

      <View style={styles.commentContainer}>
        <Text style={styles.commentLabel}>Additional Comments</Text>
        <TextInput
          style={styles.commentInput}
          placeholder="Share your thoughts about the drinks and service..."
          placeholderTextColor="#999"
          multiline={true}
          numberOfLines={5}
          textAlignVertical="top"
          value={comment}
          onChangeText={setComment}
        />
      </View>

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Submit Feedback</Text>
      </TouchableOpacity>
    </View>
  );
};

export default FeedbackScreen;
