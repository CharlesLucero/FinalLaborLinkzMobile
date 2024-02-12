import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const BodyText = ({ fontSize, text, color, marginTop, fontWeight }) => {
  const textStyle = {
    fontSize: fontSize || 20,
    color: color || 'black',
    fontWeight: fontWeight || 'normal'
  };

  const containerStyle = {
    marginTop: marginTop || 0,
  };

  return (
    <View style={[containerStyle]}>
      <Text style={textStyle}>{text}</Text>
    </View>
  );
};

export default BodyText;
