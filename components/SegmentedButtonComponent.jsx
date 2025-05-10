import React from 'react';
import { View } from 'react-native';
import SegmentedControl from '@react-native-segmented-control/segmented-control';

const SegmentedButtonComponent = ({ options, selectedIndex, onChange }) => {
  return (
    <View style={{ width: '100%', alignItems: 'center', padding: 16 }}>
      <SegmentedControl values={options} selectedIndex={selectedIndex} onChange={onChange} style={{ width: '100%', marginBottom: 12 }}/>
    </View>
  );
};

export default SegmentedButtonComponent;
