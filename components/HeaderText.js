import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const HeaderText = ({ text, color, fontWeight}) => {
  const textStyle = {
    fontSize: 28,
    color: color || 'black',
    color: color || 'black',
    fontWeight: fontWeight || 'normal'
  };

  return (
    <View>
      <Text style={[textStyle]}>{text}</Text>
    </View>
  );
};

export default HeaderText;
