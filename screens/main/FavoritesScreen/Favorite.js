import React, { useContext, useState, useEffect} from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Image, Alert} from 'react-native';
import FooterMenu from '../../../components/Menus/FooterMenu';
import { useAuth } from '../../../context/FavContext';
import { AntDesign, Feather } from '@expo/vector-icons';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import { ImageF, host } from "../../../APIRoutes";


const Favorite = () => {
    const { favorites, removeFromFavorites } = useAuth();
    const [favoriteUsers, setFavoriteUsers] = useState([]);
    const [userId, setUserId] = useState(null); // State to store user ID

    useEffect(() => {
      console.log(`USE EFFECT+++++++++++++++++++++++`);
      console.log('Inside useEffect'); 
      fetchFavoriteUsers();
    }, []);
  
    const fetchFavoriteUsers = async () => {
      
      const userId = await SecureStore.getItemAsync('userId');

      console.log(`THIS IS THE USER ID FOR FAVORITES: ${userId}`)
      try {
        const response = await axios.get(`/favorite/favorite-users/${userId}`);
        setFavoriteUsers(response.data.data); // Update state with response.data
        console.log(`TESTER ESROARORW WOA : ${JSON.stringify(favoriteUsers)}`);

      } catch (error) {
        console.error("Error fetching favorite users:", error);
        Alert.alert("Error", "Failed to fetch favorite users");
      }
    };
  
    const handleRemoveFavorite = async (index, favoriteId) => {
      try {
        await axios.delete(`/favorite/remove/${favoriteId}`);
        removeFromFavorites(index);
        fetchFavoriteUsers();
        Alert.alert("Success", "Favorite removed successfully");
      } catch (error) {
        console.error("Error removing favorite:", error);
        Alert.alert("Error", "Failed to remove favorite");
      }
    };

  return (
  
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <View style={styles.container}>
        <Text style={{ color: '#343434', fontSize: 25, fontWeight: 'bold', marginBottom: 10 }}>
          Your Favoriteswqwrwrqwrq
        </Text>
        <AntDesign style={{ marginTop: 4 }} name="heart" size={24} color="#00CCAA" />
      </View>

      <View style={{ flex: 1, paddingHorizontal: 30}}>
        {favoriteUsers.map((favorite, index) => (
          <View style={styles.card} key={index}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
            <Image
                source={{ uri: host + favorite?.receiverId?.image }}
                style={{
                  height: 60,
                  width: 60,
                  borderRadius: 100,
                  borderWidth: 1,
                  borderColor: "black",
                }}
              />
              <View style={{ marginLeft: 10 }}>
                <Text style={{fontSize: 14, color: '#00CCAA', fontWeight: 500}}>
                  {favorite?.receiverId?.firstName} {favorite?.receiverId?.lastName}
                </Text>
                <Text style={{marginTop: 2, fontSize: 14, color: 'white'}}>{favorite?.receiverId?.barangay?.name}, {favorite?.receiverId?.city?.name} {favorite?.receiverId?.province?.name}</Text>
              </View>
            </View>
            <View>
            {/* <TouchableOpacity style={styles.remove}onPress={() => handleRemoveFavorite(index)}>
            <Feather name="trash-2" size={18} color="#F02" />
            </TouchableOpacity> */}
            </View>
          </View>
        ))}
      </View>
        <FooterMenu />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginTop: 40,
    paddingHorizontal: 20,
  },
  background: {
    marginTop: 20,
    backgroundColor: '#343434',
    borderRadius: 20,
    paddingHorizontal: 30,
    paddingVertical: 18,
    marginBottom: 20, // Add margin bottom to separate each favorite item
    flexDirection: "row",
  },
  info: {
    color: '#00CCAA',
    fontSize: 15,
    fontWeight: '600',
    marginTop: 5, // Adjust spacing between each text item
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
    left: 30,
  },
  card: {
    width: "100%",
    backgroundColor: "#343434",
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderRadius: 5,
    marginBottom: 10,
    marginVertical: 10,
    height: 'auto',
  },
});

export default Favorite;
