import { sendMessageRoute, recieveMessageRoute } from "../APIRoutes";
import React, { useState, useEffect, useRef } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import ChatInput from './ChatInput';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';



export default function ChatContainer({ currentChat, socket }) {
    const [messages, setMessages] = useState([]);
    const scrollRef = useRef(null);
    const [arrivalMessage, setArrivalMessage] = useState(null);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const storedData = await AsyncStorage.getItem('@user');
          const data = JSON.parse(storedData);
  
          const response = await axios.post(recieveMessageRoute, {
            from: data._id,
            to: currentChat._id,
          });
  
          setMessages(response.data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
  
      fetchData();
    }, [currentChat]);
  
    const handleSendMsg = async (msg) => {
      try {
        const storedData = await AsyncStorage.getItem('@user');
        const data = JSON.parse(storedData);
  
        socket.current.emit('send-msg', {
          to: currentChat._id,
          from: data._id,
          msg,
        });
  
        await axios.post(sendMessageRoute, {
          from: data._id,
          to: currentChat._id,
          message: msg,
        });
  
        const updatedMessages = [...messages, { fromSelf: true, message: msg }];
        setMessages(updatedMessages);
      } catch (error) {
        console.error('Error sending message:', error);
      }
    };
  
    useEffect(() => {
      if (socket.current) {
        socket.current.on('msg-recieve', (msg) => {
          setArrivalMessage({ fromSelf: false, message: msg });
        });
      }
    }, [socket]);
  
    useEffect(() => {
      arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
    }, [arrivalMessage]);
  
    useEffect(() => {
      scrollRef.current?.scrollToEnd({ animated: true });
    }, [messages]);
  
    return (
      <View style={styles.container}>
        <View style={styles.chatHeader}>
          {/* Your header content here */}
        </View>
        <ScrollView style={styles.chatMessages} ref={scrollRef}>
          {messages.map((message) => (
            <View key={uuid.v4()} style={[styles.message, message.fromSelf ? styles.sended : styles.received]}>
              <View style={styles.content}>
                <Text>{message.message}</Text>
              </View>
            </View>
          ))}
        </ScrollView>
        <ChatInput handleSendMsg={handleSendMsg} />
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      backgroundColor: '#131324',
    },
    chatHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 20,
      paddingVertical: 10,
    },
    chatMessages: {
      flex: 1,
      padding: 10,
    },
    message: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 10,
    },
    content: {
      maxWidth: '40%',
      overflowWrap: 'break-word',
      padding: 10,
      borderRadius: 10,
      fontSize: 16,
      color: '#d1d1d1',
      backgroundColor: '#9900ff20', // Default background color
    },
    sended: {
      justifyContent: 'flex-end',
      alignSelf: 'flex-end',
      backgroundColor: '#4f04ff21',
    },
    received: {
      justifyContent: 'flex-start',
      alignSelf: 'flex-start',
    },
  });
  