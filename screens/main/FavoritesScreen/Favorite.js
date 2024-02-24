import React, { useContext } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Image } from 'react-native';
import FooterMenu from '../../../components/Menus/FooterMenu';
import { useAuth } from '../../../context/FavContext';
import { AntDesign, Feather } from '@expo/vector-icons';

const Favorite = () => {
  const { favorites, removeFromFavorites } = useAuth();

  const handleRemoveFavorite = (index) => {
    removeFromFavorites(index);
  };

  return (
  
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <View style={styles.container}>
        <Text style={{ color: '#343434', fontSize: 25, fontWeight: 'bold', marginBottom: 10 }}>
          Your Favorites
        </Text>
        <AntDesign style={{ marginTop: 4 }} name="heart" size={24} color="#00CCAA" />
      </View>

      <View style={{ flex: 1, paddingHorizontal: 30}}>
        {favorites.map((favorite, index) => (
          <View style={styles.background} key={index}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image
                source={{ uri: favorite.profilepost.postedBy?.image }}
                style={{
                  height: 60,
                  width: 60,
                  borderRadius: 100,
                  borderWidth: 5,
                  borderColor: "black",
                }}
              />
              <View style={{ marginLeft: 10 }}>
                <Text style={styles.info}>
                  {favorite.profilepost.postedBy?.firstName} {favorite.profilepost.postedBy?.lastName}
                </Text>
                <Text style={styles.info}>Location: {favorite.profilepost.postedBy?.location}</Text>
                <Text style={styles.info}>
                  Rate: {favorite.profilepost.minRate} - {favorite.profilepost.maxRate}
                </Text>
                <Text style={styles.info}>Description: {favorite.profilepost.description}</Text>
              </View>
            </View>
            <View>
            <TouchableOpacity style={styles.remove}onPress={() => handleRemoveFavorite(index)}>
            <Feather name="trash-2" size={18} color="#F02" />
            </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>

      <View style={styles.footer}>
        <FooterMenu />
      </View>
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
    backgroundColor: 'black',
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
});

export default Favorite;