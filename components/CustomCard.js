import React from 'react';
import { View, TouchableOpacity, Image, Text, StyleSheet } from 'react-native';

const CustomCard = ({ title, imageSource, onPress }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      >
        <Image source={imageSource} style={styles.image} />
        <View style={styles.overlay} />
        <Text style={styles.title}>{title}</Text>
      </TouchableOpacity>
    </View>

  );
};

const styles = StyleSheet.create({
  container: {
    paddingRight: 10,
  },
  image: {
    height: 250,
    width: 150,
    borderWidth: 0.2,
    borderColor: 'black',
    borderRadius: 20,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 20,
  },
  title: {
    position: 'absolute',
    textAlign: 'center',
    top: 90,
    left: 0,
    right: 0,
    fontSize: 20,
    paddingVertical: 20,
    fontWeight: 'bold',
    color: '#00CCAA',
    borderRadius: 10,
  },
});

export default CustomCard;
