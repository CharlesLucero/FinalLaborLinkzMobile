import React, { useContext, useState, useEffect} from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Image, Alert} from 'react-native';
import { useNavigation } from '@react-navigation/native'; 
import { useAuth } from '../../../context/FavContext';
import { AntDesign, Feather } from '@expo/vector-icons';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import { ImageF, host } from "../../../APIRoutes";
import FooterMenu from '../../../components/Menus/FooterMenu';

const Favorite = () => {
    const navigation = useNavigation();
    const { favorites, removeFromFavorites } = useAuth();
    const [favoriteUsers, setFavoriteUsers] = useState([]);
    const [userId, setUserId] = useState(null);

    useEffect(() => {
      fetchFavoriteUsers();
    }, []);
  
    const fetchFavoriteUsers = async () => {
      const userId = await SecureStore.getItemAsync('userId');

      try {
        const response = await axios.get(`/favorite/favorite-users/${userId}`);
        setFavoriteUsers(response.data.data);
      } catch (error) {
        console.error("Error fetching favorite users:", error);
        Alert.alert("Error", "Failed to fetch favorite users");
      }
    };


    const handleRemoveFavorite = async (index, favoriteId) => {
      try {
        await axios.delete(`/favorite/remove/${favoriteId}`);
        removeFromFavorites(index); // Remove the favorite locally from the state
        setFavoriteUsers(prevState => prevState.filter(favorite => favorite._id !== favoriteId)); // Update the state by filtering out the removed favorite
        Alert.alert("Success", "Favorite removed successfully");
      } catch (error) {
        console.error("Error removing favorite:", error);
        Alert.alert("Error", "Failed to remove favorite");
      }
    };
    

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <View style={styles.container}>
          <Text style={{ color: '#343434', fontSize: 18, fontWeight: 'bold', marginBottom: 10, textAlign: 'center' }}>
            Your Favorites
          </Text>
        <AntDesign style={{ marginTop: 4 }} name="heart" size={18} color="#00CCAA" />
      </View>

      <View style={{ flex: 1, paddingHorizontal: 30, backgroundColor: '#f6f6f6'}}>
        {favoriteUsers.map((favorite, index) => (
          <TouchableOpacity key={index} onPress={() => navigation.navigate('ViewProfile', { profilepost: favorite })}> 
            <View style={styles.card}>
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                <Image
                  source={{ uri: host + favorite?.receiverId?.image }}
                  style={{
                    height: 50,
                    width: 50,
                    borderRadius: 100,
                    borderWidth: 1,
                    borderColor: "black",
                  }}
                />
                <View style={{ marginLeft: 10 }}>
                  <Text style={{fontSize: 14, color: '#00CCAA', fontWeight: '500'}}>
                    {favorite?.receiverId?.firstName} {favorite?.receiverId?.lastName}
                  </Text>
                  <Text style={{marginTop: 2, fontSize: 14, color: 'white'}}>{favorite?.receiverId?.barangay?.name}, {favorite?.receiverId?.city?.name} {favorite?.receiverId?.province?.name}</Text>
                </View>
              </View>
              <TouchableOpacity style={styles.remove} onPress={() => handleRemoveFavorite(index, favorite._id)}>
                <Feather name="trash-2" size={18} color="#F02" />
              </TouchableOpacity>
            </View>
          </TouchableOpacity> 
        ))}
      </View>
      <FooterMenu />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: 'white',
    gap: 6,
    justifyContent: 'center'
  },
  background: {
    marginTop: 20,
    backgroundColor: '#343434',
    borderRadius: 20,
    paddingHorizontal: 30,
    paddingVertical: 18,
    marginBottom: 20,
    flexDirection: "row",
  },
  info: {
    color: '#00CCAA',
    fontSize: 15,
    fontWeight: '600',
    marginTop: 5,
  },
  footer: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    backgroundColor: '#ffffff',
    borderWidth: 0.5,
    borderColor: 'gray',
    paddingHorizontal: 20,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    paddingTop: 5,
  },
  remove: {
    position: 'absolute',
    right: 10,
    top: '50%',
    transform: [{translateY: -9}]
  },
  card: {
    width: "100%",
    backgroundColor: "#343434",
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderRadius: 20,
    marginBottom: 10,
    marginVertical: 10,
    height: 'auto',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 20
  },
});

export default Favorite;
