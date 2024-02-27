import React, { useContext } from 'react';
import {View, Text , StyleSheet, SafeAreaView ,TouchableOpacity} from 'react-native';


import FooterMenu from '../components/Menus/FooterMenu';
import {useAuth} from '../context/FavContext'                    
import { AntDesign } from '@expo/vector-icons';

const Favorite = () => {
    const { favorites, removeFromFavorites } = useAuth();

    const handleRemoveFavorite = (userId) => {
        removeFromFavorites(userId);
      };
    
    


    return (
        <SafeAreaView style = {{flex:1, backgroundColor: 'white'}}>
            <View style = {styles.container}>
                <Text style = {{color: '#343434', fontSize: 25, fontWeight: 'bold'}}>Your Favorites</Text>
                <AntDesign style = {{marginTop: 4}} name="heart" size={24} color="#00CCAA" />
            </View>

            <View style={{ marginBottom: '130%', paddingHorizontal: 30 }}>
        {favorites.map((favorite, index) => (
          <View style = {styles.background} key={index}>
            {favorite.profileData && (
              <>
                <Text style={styles.info}>Name: {favorite.profileData.createdBy?.firstName} {favorite.profileData.createdBy?.lastName}</Text>
                <Text style={styles.info}>Age: {favorite.profileData.age}</Text>
                <Text style={styles.info}>Job: {favorite.profileData.job}</Text>
                <Text style={styles.info}>Address: {favorite.profileData.address}</Text>
              </>
            )}

            {favorite.profilepost && (
              <>
                <Text style={styles.info}>Name: {favorite.profilepost.postedBy?.firstName} {favorite.profilepost.postedBy?.lastName}</Text>
                <Text style={styles.info}>Location: {favorite.profilepost.postedBy?.location}</Text>
                <Text style={styles.info}>Rate: {favorite.profilepost.minRate} - {favorite.profilepost.maxRate}</Text>
                <Text style={styles.info}>Description: {favorite.profilepost.description}</Text>
              </>
            )}

            <TouchableOpacity onPress={() => handleRemoveFavorite(favorite.userId)}>
              <Text style={{ color: 'red' }}>Remove from Favorites</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>








            <View style = {{backgroundColor: '#ffffff', borderWidth: .5, borderColor:'gray', paddingHorizontal: 20, borderTopRightRadius: 20, borderTopLeftRadius: 20, paddingTop:5}}>
                <FooterMenu />
            </View>
        </SafeAreaView>
    );
};
const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'white',
        flexDirection: 'row',
        marginTop: 40,
        gap: 10,
        paddingHorizontal: 20,
    },
    background: {
        backgroundColor: 'black',
        borderRadius: 20,
        paddingHorizontal: 30,
        paddingVertical: 18
    },
    info:{
        color:'#00CCAA',
        fontSize: 15,
        fontWeight: '600'
    }
})
export default Favorite;