import React, { useState } from 'react';
import { TextInput, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Entypo } from '@expo/vector-icons';

const InputBox = ({ placeholder, value, secureTextEntry, borderRadius, showPasswordToggle, multiline, height, borderColor, paddingTop, setValue, borderWidth }) => {
  const [isPasswordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!isPasswordVisible);
  };

  const eyeIconName = isPasswordVisible ? 'eye' : 'eye-with-line';

  return (
    <View style={styles.inputContainer}>
      <TextInput style={[ styles.input, value ? { color: 'black' } : null ]}
        placeholder={placeholder}
        value={value}
        secureTextEntry={secureTextEntry && !isPasswordVisible} // Set secureTextEntry based on props
        multiline={multiline} // Enable multiline input based on props
        numberOfLines={4} // You can adjust the number of lines as needed
        height={height}
        paddingTop= {paddingTop}
        borderColor = {borderColor}
        borderWidth = {borderWidth}
        borderRadius = {borderRadius}
        onChangeText = {(text) => setValue(text)}
      />
      {showPasswordToggle && secureTextEntry && (
        <TouchableOpacity onPress={togglePasswordVisibility}>
          <Entypo name={eyeIconName} size={24} color="black" style={styles.icon} />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F6F6F6',
    marginTop: 10,
    borderRadius: 8,
  },
  input: {
    flex: 1,
    color: '#C8C8C8',
    paddingHorizontal: 14
  },
  icon: {
    paddingHorizontal: 20,
  },
});

export default InputBox;
