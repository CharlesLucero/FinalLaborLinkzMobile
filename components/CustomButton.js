import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const CustomButton = ({ title, handleSubmit,  loading }) => {
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={handleSubmit}
    >
      <Text style={styles.buttonText}>
       {loading ? "Please Wait..." : title}
       </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#00CCAA',
    paddingVertical: 16,
    borderRadius: 15,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    width: 260
  },
  buttonText: {
    color: '#000000',
    fontSize: 14,
    marginLeft: 10,
  
  },
});

export default CustomButton;
