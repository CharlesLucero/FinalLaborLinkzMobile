import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function Contacts({ contacts, changeChat }) {
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await AsyncStorage.getItem('@user');
        if (data !== null) {
          const parsedData = JSON.parse(data);
          setCurrentUserName(parsedData.firstName);
          setCurrentUserImage(parsedData.avatarImage);
        }
      } catch (error) {
        console.error('Error retrieving data:', error);
      }
    };
    getData();
  }, []);

  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact);
  };

  return (
    <View style={styles.container}>
      {currentUserImage && (
        <View style={styles.brand}>

          <Text style={styles.brandText}>LaborLinkz</Text>
        </View>
      )}
      <ScrollView style={styles.contactsContainer}>
        {contacts && Array.isArray(contacts) && contacts.length > 0 && contacts.map((contact, index) => (
          <TouchableOpacity
            key={contact._id}
            style={[
              styles.contact,
              index === currentSelected ? styles.selectedContact : null,
            ]}
            onPress={() => changeCurrentChat(index, contact)}
          >
            <View style={styles.avatar}>
              <Image
                source={{ uri: `data:image/svg+xml;base64,${contact.avatarImage}` }}
                style={styles.avatarImage}
              />
            </View>
            <View style={styles.username}>
              <Text style={styles.username}>{contact.firstName}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
      {currentUserImage && (
        <View style={styles.currentUser}>
          <View style={styles.avatar}>
            <Image
              source={{ uri: `data:image/svg+xml;base64,${currentUserImage}` }}
              style={styles.currentUserImage}
            />
          </View>
          <View style={styles.username}>
            <Text style={styles.currentUserText}>{currentUserName}</Text>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#080420',
    flex: 1,
    flexDirection: 'column',
  },
  brand: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  brandText: {
    color: 'white',
    textTransform: 'uppercase',
  },
  contactsContainer: {
    flex: 0.75,
  },
  contact: {
    backgroundColor: '#ffffff34',
    minHeight: 120,
    width: '90%',
    borderRadius: 2,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  selectedContact: {
    backgroundColor: '#9a86f3',
  },
  avatar: {},
  username: {},
  currentUser: {
    backgroundColor: '#0d0d30',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    padding: 10,
  },
  currentUserText: {
    color: 'white',
  },
});
