import React, { useEffect, useState, useRef } from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import FooterMenu from '../components/Menus/FooterMenu';
import ChatContainer from '../components/ChatContainer';
import Contacts from '../components/Contacts';
import AsyncStorage from '@react-native-async-storage/async-storage';
import io from 'socket.io-client';
import axios from 'axios';
import { allUsersRoute, host } from '../APIRoutes';

const Message = ({ navigation }) => {
  const [contacts, setContacts] = useState([]);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [currentUser, setCurrentUser] = useState(undefined);
  const socket = useRef(null);

  useEffect(() => {
    async function checkCurrentUser() {
      try {
        const storedUser = await AsyncStorage.getItem('@user');
        if (!storedUser) {
          // Navigate to login screen if user is not available
          navigation.navigate("Login");
        } else {
          const parsedUser = JSON.parse(storedUser);
          setCurrentUser(parsedUser);
        }
      } catch (error) {
        console.error('Error fetching or parsing user data:', error);
      }
    }
  
    checkCurrentUser();
  }, []);

  useEffect(() => {
    if (currentUser) {
      socket.current = io(host);
      socket.current.emit('add-user', currentUser._id);
    }
  }, [currentUser]);

  useEffect(() => {
    async function fetchData() {
      try {
        if (currentUser) {
          const response = await axios.get(`${allUsersRoute}/${currentUser._id}`);
          setContacts(response.data);
          console.log('Fetched contacts:', response.data); // Log fetched contacts
        }
      } catch (error) {
        console.error('Error fetching contacts:', error);
      }
    }

    fetchData();
  }, [currentUser]);
  

  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };
 
  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.container}>
        <View style={styles.innerContainer}>
          <Contacts contacts={contacts} changeChat={handleChatChange} />
          {currentChat !== undefined && <ChatContainer currentChat={currentChat} socket={socket} />}
        </View>
      </View>
      <View style={styles.footer}>
        <FooterMenu />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  innerContainer: {
    height: '100%',
    width: '100%',
    backgroundColor: 'rgba(0,0,0,0.6)',
    flexDirection: 'row', // Adjust based on your layout requirements
  },
});

export default Message;
