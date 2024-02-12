// FavoriteCard.js
import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const FavoriteCard = ({ profileData, addToFavoritesHandler, isFavorite }) => {
  return (
    <View style={styles.favoriteCard}>
      <Image
        source={{ uri: 'https://www.pngall.com/wp-content/uploads/5/Profile-Transparent.png' }}
        style={{ height: 80, width: 80, borderRadius: 40, borderWidth: 3, borderColor: 'black' }}
      />
      <Text style={styles.username}>{profileData?.createdBy?.firstName} {profileData?.createdBy?.lastName}</Text>
      <Text style={styles.additionalInfo}>Age: {profileData?.age}</Text>
      <Text style={styles.additionalInfo}>Job: {profileData?.job}</Text>
      <Text style={styles.additionalInfo}>Address: {profileData?.address}</Text>
      <TouchableOpacity style={styles.favoriteButton} onPress={addToFavoritesHandler}>
        {isFavorite ? (
          <AntDesign name="heart" size={24} color="#00CCAA" />
        ) : (
          <AntDesign name="hearto" size={24} color="#00CCAA" />
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  favoriteCard: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F6F6F6',
    padding: 10,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: 'gray',
    margin: 5,
  },
  username: {
    color: '#00CCAA',
    fontSize: 16,
    fontWeight: '600',
    marginTop: 5,
  },
  additionalInfo: {
    color: 'gray',
    fontSize: 14,
    marginTop: 2,
  },
  favoriteButton: {
    backgroundColor: '#343434',
    marginTop: 5,
    padding: 8,
    borderRadius: 15,
  },
});

export default FavoriteCard;
