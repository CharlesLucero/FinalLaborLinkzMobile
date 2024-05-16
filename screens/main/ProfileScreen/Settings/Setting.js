import React, { useState, useContext } from 'react';
import {Text, TouchableOpacity,TouchableWithoutFeedback, View, StyleSheet, Image, TextInput, ImageBackground, ScrollView} from 'react-native';
import { Entypo, MaterialCommunityIcons } from '@expo/vector-icons';
import HeaderText from '../../../../components/HeaderText';
import BodyText from '../../../../components/BodyText'
import {MaterialIcons} from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import {AuthContext} from '../../../../context/authContext'
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';

const Setting = ({navigation}) => {
    const [state, setState] = useContext(AuthContext);

    const handleLogout = async () => {
        try {
            // Clear the token from SecureStore
            await SecureStore.deleteItemAsync('jwtToken');
            
            // Clear the token and user data from state
            setState({ token: '', user: null });
    
            // Remove any other relevant data from AsyncStorage if needed
            await AsyncStorage.removeItem('@auth');
    
            // Navigate to the Login screen
            navigation.navigate('Login');
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    return(
        <View style = {styles.maincontainer}>
            <View style = {{marginTop:50, paddingHorizontal: 20}}>
                <TouchableOpacity>
                    <Entypo name="chevron-left" size={24} color="black" onPress={() => navigation.navigate('Account')}/>
                </TouchableOpacity>
            </View>

            <View style = {{paddingHorizontal: 35}}>
                <HeaderText
                 text = 'Settings'
                />
            </View>

            <View style = {{paddingHorizontal:20, marginTop: 35}}>
                <TouchableOpacity onPress={() => navigation.navigate('EditProfile')}>
                    <View style = {styles.format}>
                    <MaterialCommunityIcons name="account-edit-outline" size={27} color="#00CCAA" />
                            <BodyText
                            text = 'Setup Profile'
                            fontSize={18}
                            fontWeight={600}
                            color = "#F6F6F6"  
                            />
            
                    </View>
                </TouchableOpacity>
            </View>

            <View style = {{paddingHorizontal:20, marginTop: 5}}>
                <TouchableOpacity onPress={() => navigation.navigate('AccountSetting')}>
                    <View style = {styles.format}>
                    <MaterialCommunityIcons name="account-cog-outline" size={27} color="#00CCAA" />
                 
                            <BodyText
                            text = 'Account Settings'
                            fontSize={18}
                            fontWeight={600}
                            color = "#F6F6F6"  
                            />
                         
                    </View>
                </TouchableOpacity>
            </View>
            <View style = {{paddingHorizontal:20, marginTop: 5}}>
                <TouchableOpacity onPress={() => navigation.navigate('Security')}>
                    <View style = {styles.format}>
                    <MaterialCommunityIcons name="account-lock-open-outline" size={27} color="#00CCAA" />
                            <BodyText
                            text = 'Security'
                            fontSize={18}
                            fontWeight={600}
                            color = "#F6F6F6"  
                            />
                         
                    </View>
                </TouchableOpacity>
            </View>

            <View style={{ paddingHorizontal: 20, marginTop: 5 }}>
        <TouchableOpacity
          onPress={() => navigation.navigate("AccountVerification")}
        >
          <View style={styles.format}>
          <MaterialCommunityIcons name="account-multiple-check-outline" size={27} color="#00CCAA" />
            <BodyText
              text="Account Verification"
              fontSize={18}
              fontWeight={600}
              color="#F6F6F6"
            />
          </View>
        </TouchableOpacity>
      </View>


            <View style={{ paddingHorizontal: 32, marginTop: 40, alignItems: 'center', flex:1, justifyContent:'flex-end' , marginBottom: 20}}>
                <TouchableOpacity style = {{backgroundColor: '#00CCAA', width: 220, height: 45, borderRadius: 18, justifyContent: 'center', alignItems: 'center'}} onPress = {handleLogout} >
                    <Text style = {{fontWeight: '500'}}>Logout</Text>
                </TouchableOpacity>
            </View>


        </View>
    )
}

const styles = StyleSheet.create({
    maincontainer:{
        flex:1
    },
    format:{
        backgroundColor:'#343434',
        flexDirection:'row',
        height:75,
        width:371,
        borderRadius: 15,
        alignSelf:'center',
        alignItems:'center',
        paddingHorizontal:30,
        marginVertical:10,
        gap: 5
  
    },
})
export default Setting