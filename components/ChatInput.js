import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
//This is chat
export default function ChatInput({ handleSendMsg }) {
  const [msg, setMsg] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const handleEmojiPickerHideShow = () => {
    setShowEmojiPicker(!showEmojiPicker);
    // Implement logic to toggle Emoji Picker visibility in React Native
  };

  const handleEmojiClick = (emojiObject) => {
    let message = msg;
    message += emojiObject.emoji;
    setMsg(message);
  };

  const sendChat = () => {
    if (msg.length > 0) {
      handleSendMsg(msg);
      setMsg('');
    }
  };

  return (
    <View style={styles.container}>
      {/* Implement your Emoji Picker logic here */}
      {/* Replace TouchableOpacity and Ionicons with your Emoji Picker component */}
      <TouchableOpacity style={styles.emojiButton} onPress={handleEmojiPickerHideShow}>
        <Ionicons name="md-happy" size={24} color="#FFFF00" />
      </TouchableOpacity>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type your message here"
          onChangeText={(text) => setMsg(text)}
          value={msg}
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendChat}>
          <Ionicons name="md-send" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#080420',
    padding: 10,
  },
  emojiButton: {
    marginRight: 10,
  },
  inputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: '#ffffff34',
    padding: 5,
  },
  input: {
    flex: 1,
    height: 40,
    color: 'white',
    fontSize: 16,
  },
  sendButton: {
    padding: 5,
    borderRadius: 20,
    backgroundColor: '#9a86f3',
    marginLeft: 5,
  },
});
