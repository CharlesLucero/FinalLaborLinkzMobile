import React, { useState, useEffect, useCallback } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import axios from 'axios';
import { Alert, Text, ActivityIndicator } from 'react-native';

const Chat = ({ route }) => {
  const { userId, username } = route.params;
  const { profileData, profilepost } = route.params.data;
  const { authToken } = route.params;
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [otherUserId, setOtherUserId] = useState(null);

  const fetchChatMessages = async () => {
    try {
      const receiver = `${profileData?.createdBy?._id || ''}-${profilepost?._id || ''}`;
      setOtherUserId(receiver);
  
      try {
        const response = await axios.get(`/api/v1/message/getusermessages/${receiver}`, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
        // Process response data here
  
        const formattedMessages = response.data.userMessages.map((message) => ({
          _id: message._id,
          text: message.content,
          createdAt: new Date(message.createdAt),
          user: {
            _id: message.messageBy === userId ? 1 : 2,
            name: message.messageBy === userId ? 'You' : username,
          },
        }));
  
        const sortedMessages = formattedMessages.sort((a, b) => a.createdAt - b.createdAt);
        setMessages(sortedMessages);
      } catch (error) {
        console.error('Error fetching chat messages:', error);
        setError('Error fetching chat messages. Please try again.');
      } finally {
        setLoading(false);
      }
    } catch (error) {
      console.error('Error in fetchChatMessages:', error);
    }
  };
  
  useEffect(() => {
    fetchChatMessages();
  }, [userId, authToken, username]);

  const onSend = useCallback(async (newMessages = []) => {
    const newMessage = newMessages[0];

    if (!newMessage?.text?.trim() || !otherUserId) {
      Alert.alert('Warning', 'Please fill in all fields before submitting the message.');
      return;
    }

    try {
      await axios.post('message/create-new-message', {
        receiver: otherUserId,
        content: newMessage.text,
      });

      setMessages((previousMessages) => GiftedChat.append(previousMessages, newMessages));
    } catch (error) {
      console.error('Error sending the message:', error);
      setError(`Error sending the message. ${error.response && error.response.data ? error.response.data.message : 'Please try again.'}`);
    }
  }, [otherUserId]);

  if (loading) {
    return <ActivityIndicator size="large" />;
  }

  return (
    <>
      {error && <Text style={{ color: 'red' }}>{error}</Text>}
      <GiftedChat
        messages={messages}
        onSend={onSend}
        user={{
          _id: 1,
          name: 'You',
        }}
        renderUsernameOnMessage
        showUserAvatar
      />
    </>
  );
};

export default Chat;
