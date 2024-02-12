import React, { useContext, useState, useEffect } from 'react';
import { View, Text, Alert, SafeAreaView, Image, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { AntDesign, MaterialCommunityIcons,  Entypo, MaterialIcons, Octicons  } from '@expo/vector-icons';

import axios from 'axios';

import {useAuth} from '../context/FavContext';
import moment from 'moment';
import { Modal } from 'react-native';

const ViewProfile = ({ route, navigation }) => {
  const { profileData } = route.params;
  const { addToFavorites, favorites } = useAuth();
  const [isFavorite, setIsFavorite] = useState(false);
  const { profilepost } = route.params;
  const [violation, setViolation] = useState('');
  const [description, setDescription] = useState('');
  const [reportModalVisible, setReportModalVisible] = useState(false);
  

  useEffect(() => {
      if (profileData && profilepost) {
          const isInFavorites = favorites.some(
              (fav) => fav.userId === profileData.userId && fav.postId === profilepost.postId
          );
          setIsFavorite(isInFavorites);
      }
  }, [favorites, profileData, profilepost]);

  const addToFavoritesHandler = () => { 
      addToFavorites(profileData, profilepost ); // Add only profileData to favorites
      setIsFavorite(!isFavorite);
  };
  const navigateToChat = () => {
     const dataToSend = { profileData, profilepost };
  
    navigation.navigate('Chat', {
      data: dataToSend,
    });
  };


    const showReportModal = () => {
        setReportModalVisible(true);
      };
    
      const hideReportModal = () => {
        setReportModalVisible(false);
      };
    
      const reportUserHandler = async () => {
        // Check if violation and description are not empty
        if (!violation.trim() || !description.trim()) {
          // Display a warning alert if any field is empty
          Alert.alert('Warning', 'Please fill in all fields before submitting the report.');
          return;
        }
      
        // Clear input fields
        setViolation('');
        setDescription('');
      
        const reportedUserId = `${profileData?.createdBy?._id || ''}-${profilepost?._id || ''}`;
      
        try {
          await axios.post('/report/report-user', {
            reportedUserId,
            violation,
            description,
          });
      
          // Display a simple success alert
          Alert.alert('Success', 'Report submitted successfully', [
            {
              text: 'OK',
              onPress: () => {
                // Hide the report modal
                hideReportModal();
              },
            },
          ]);
        } catch (error) {
          // Handle error
          console.error('Error submitting report', error);
        }
      };

   
    return (
        <SafeAreaView>
            <ScrollView>
            <View style = {{marginTop:30, paddingHorizontal: 20}}>

            <View style={{flexDirection:'row', justifyContent:'space-between'}}>
               
                <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                    <Entypo name="chevron-left" size={32} color="#A9A9A9" />
                </TouchableOpacity>
             
                <TouchableOpacity
                    style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 20,
                    marginTop: 10,
                    }}
                    onPress={showReportModal}
                    >
                    <MaterialIcons name="report" size={32} color="black" />
                </TouchableOpacity>
            </View>


            <View style = {{marginTop: 20, alignSelf:'center'}}>
                <Image source={{uri:'https://www.pngall.com/wp-content/uploads/5/Profile-Transparent.png'}} 
                style = {{ height: 120, width: 120, borderRadius: 100, borderWidth: 5, borderColor: 'black'}}></Image>
            </View>

            <View style = {{alignSelf:'center'}}>
                <Text style = {styles.username}>{profileData?.createdBy?.firstName} {profileData?.createdBy?.lastName} {profilepost?.postedBy?.firstName} {profilepost?.postedBy?.lastName}</Text>
            </View>

            <View style = {{flexDirection: 'row', gap: 20, height: 50, paddingHorizontal: 50, marginTop: 10}}>
                <TouchableOpacity style = {{backgroundColor: '#343434', flex: 1, alignItems:"center", justifyContent:'center', borderRadius: 20}} onPress={addToFavoritesHandler}>
                {isFavorite ? (
                <AntDesign name="heart" size={32} color="#00CCAA" />
                ) : (
                <AntDesign name="hearto" size={32} color="#00CCAA" />
                )}   
                </TouchableOpacity>

                <TouchableOpacity style = {{backgroundColor: '#343434', flex: 1, alignItems:"center", justifyContent:'center', borderRadius: 20}} onPress={navigateToChat}>
                    <MaterialCommunityIcons name="chat" size={32} color = '#00CCAA'/>
                </TouchableOpacity>
            </View>
            
            <View>
                <Text style = {styles.user}>User Information</Text>
            </View>

            <View style = {styles.card}>
            <View style = {{flexDirection:'row', borderBottomWidth: 1, paddingVertical: 15}}>
                    <Entypo name="info-with-circle" size={24} color="#00CCAA" />
                    <Text style = {styles.info}>   Bio:  {profileData?.bio}</Text>
                    <Text style = {{borderBottomWidth: .5}}></Text>
                </View>

                <View style = {{flexDirection:'row', borderBottomWidth: 1, paddingVertical: 15}}>
                    <Octicons name="number" size={24} color="#00CCAA" />
                    <Text style = {styles.info}>     Age:  {profileData?.age}</Text>
                </View>
                

                <View style = {{flexDirection:'row', borderBottomWidth: 1, paddingVertical: 15}}>
                    <MaterialIcons name="hardware" size={24} color="#00CCAA" />
                    <Text style = {styles.info}>   Job:  {profileData?.job}</Text>
                </View>

                 <View style = {{flexDirection:'row', paddingVertical: 15}}>
                    <Entypo name="address" size={24} color="#00CCAA" />
                    <Text style = {styles.info}>   Address:  {profileData?.address}</Text>
                </View>
            </View>


            <View>
                <Text style = {styles.user}>Active Job Listings</Text>

            </View>
        
            <View style = {styles.card}>
                <Text style = {{fontSize: 17, marginBottom: 10}}> Title: {profilepost?.title} </Text>
                <Text style = {{color: 'gray', fontSize: 13}}> Location: {profilepost?.postedBy?.location}</Text>
                <Text style = {{color: 'gray', fontSize: 13}}> Rate: P{profilepost?.minRate}.00 - P{profilepost?.maxRate}.00</Text>
                <Text style = {{fontSize: 17, marginTop: 10}}> Description: {profilepost?.description} </Text>
                <Text style = {{borderBottomWidth: .5}}></Text>
                
                

                <View>
                    <Text style = {{color: 'gray', marginTop: 10, fontSize: 13, textAlign:'right'}}>{""}<AntDesign name="clockcircleo" size={14} color="#00CCAA" />{" "}
                    Posted {moment(profilepost?.createdAt).format('DD:MM:YYYY || HH:mm')} </Text>
                </View>

                <Modal
            animationType="slide"
            transparent={true}
            visible={reportModalVisible}
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Report User</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Violation"
                  value={violation}
                  onChangeText={(text) => setViolation(text)}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Description"
                  value={description}
                  onChangeText={(text) => setDescription(text)}
                  multiline
                />
                <TouchableOpacity
                  style={styles.reportButton}
                  onPress={reportUserHandler}
                >
                  <Text style={{ color: '#fff' }}>Submit Report</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={hideReportModal}
                >
                  <Text style={{ color: '#000' }}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>

                
                
            </View>


            </View>
            </ScrollView>
        </SafeAreaView>
    );
}
 const styles = StyleSheet.create({
    username:{
        color: '#00CCAA',
        fontSize: 32,
        fontWeight: '600',
    },
    user:{
        fontSize: 17,
        fontWeight: '800',
        color: '#00CCAA',
        marginTop: 20, 
   
    },
    card:{
        width: '100%',
        backgroundColor:'#F6F6F6',
        borderWidth: 0.2,
        borderColor: 'gray',
        padding: 20,
        borderRadius: 5,
        marginBottom: 10,
        marginVertical: 10,
        
        
    }, 
    info:{
        fontSize: 17,  
    },
    card:{
        width: '100%',
        backgroundColor:'#F6F6F6',
        borderWidth: 0.2,
        borderColor: 'gray',
        padding: 20,
        borderRadius: 5,
        marginBottom: 10,
        marginVertical: 10
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
   
      },
      modalContent: {
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        justifyContent: 'center',
        borderRadius: 10,
        elevation: 5,
        width: '80%', 
        height: '45%', 
      },
      modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
      },
      input: {
        borderBottomWidth: 1,
        marginBottom: 10,
      },
      reportButton: {
        backgroundColor: '#343434',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        padding: 10,
        marginTop: 10,
      },
      cancelButton: {
        backgroundColor: '#eee',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        padding: 10,
        marginTop: 10,
      },
    });
    
export default ViewProfile;
