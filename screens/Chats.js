import React, { useState, useEffect, useContext } from "react";
import { View, Text, FlatList, StyleSheet, TextInput, Button, Alert } from "react-native";
import axios from "axios";
import { useNavigation, useRoute } from '@react-navigation/native';
import { AuthContext } from '../context/authContext';

const Chats = () => {
  const [chats, setChats] = useState([]);
  const [message, setMessage] = useState('');
  const [state, setState] = useContext(AuthContext);
  const navigation = useNavigation();
  const route = useRoute();
  const { userId, firstName, lastName } = route.params;

  useEffect(() => {
    fetchChats();
  }, []);

  const fetchChats = async () => {
    try {
      const response = await axios.get(`/chats/${userId}?receiverId=${state.userId}`);
      setChats(response.data.chats);
    } catch (error) {
      console.error("Error fetching chats:", error);
      Alert.alert('Error', 'Failed to fetch chats. Please try again later.');
    }
  };

  const handleMessageSend = async () => {
    try {
      const response = await axios.post('/chats/send', {
        senderId: state.userId, // Use the currently logged-in user's ID as senderId
        receiverId: userId, // Use the userId from the route params as receiverId
        message: message
      });
      console.log('Message sent successfully:', response.data);
      setChats([...chats, response.data.data]); // Update chats state with the new chat
      setMessage(''); // Clear message input field
    } catch (error) {
      console.error('Error sending message:', error);
      Alert.alert('Error', 'Failed to send message. Please try again later.');
    }
  };
  return (
    <View style={styles.container}>
      <Text>{`Chatting with: ${firstName} ${lastName}`}</Text>
      <FlatList
        data={chats}
        renderItem={({ item }) => (
          <View style={item.senderId === state.userId ? styles.sentMessageContainer : styles.messageContainer}>
            <Text>{`${item.senderId.firstName} ${item.senderId.lastName}: ${item.message}`}</Text>
          </View>
        )}
        keyExtractor={(item) => item._id}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          onChangeText={setMessage}
          value={message}
          placeholder="Type your message here"
        />
        <Button title="Send" onPress={handleMessageSend} />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Accept Request" onPress={handleAcceptRequest} />
        <Button title="Decline Request" onPress={handleDeclineRequest} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  messageContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  sentMessageContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    backgroundColor: "#e6e6e6", // Example background color for sent messages
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
});

export default Chats;