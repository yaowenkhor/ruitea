import React from 'react';
import { View } from 'react-native';
import StarRating from 'react-native-star-rating-widget';

const RatingComponent = ({ rating, onChange }) => {
  return (
    <View style={{ alignItems: 'center', marginVertical: 20 }}>
      <StarRating rating={rating} onChange={onChange} starSize={36} color="#FFD700" enableHalfStar={false} />
    </View>
  );
};

export default RatingComponent;