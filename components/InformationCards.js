
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { AntDesign, FontAwesome, Entypo, MaterialIcons, EvilIcons, Octicons   } from '@expo/vector-icons';
import moment from 'moment';

const InformationCards = ({info, navigation }) => {
    
    const navigateToProfile = () => {
        // Only navigate if the navigation prop is available
        navigation && navigation.navigate('ViewProfile');
    };


    return(
        <View>
            {info?.map( ( infos, i) => (
                <View style = {styles.card} key ={i}>

                <View style = {{flexDirection:'row', borderBottomWidth: 1, paddingVertical: 15}}>
                    <Entypo name="info-with-circle" size={24} color="#00CCAA" />
                    <Text style = {styles.info}>   Bio:  {infos?.bio}</Text>
                    <Text style = {{borderBottomWidth: .5}}></Text>
                </View>

                <View style = {{flexDirection:'row', borderBottomWidth: 1, paddingVertical: 15}}>
                    <Octicons name="number" size={24} color="#00CCAA" />
                    <Text style = {styles.info}>     Age:  {infos?.age}</Text>
                </View>

                <View style = {{flexDirection:'row', borderBottomWidth: 1, paddingVertical: 15}}>
                    <MaterialIcons name="hardware" size={24} color="#00CCAA" />
                    <Text style = {styles.info}>   Job:   {infos?.job}</Text>
                </View>

                 <View style = {{flexDirection:'row', paddingVertical: 15}}>
                    <Entypo name="address" size={24} color="#00CCAA" />
                    <Text style = {styles.info}>  Location: {" "}
                    {infos?.createdBy?.barangay?.name},{" "}
                    {infos?.createdBy?.city?.name}{" "}
                    {infos?.createdBy?.province?.name} </Text>
                </View>
                </View>
            ))}
        </View>
    )
}

const styles = StyleSheet.create({
    info:{
        textAlign:'center',
        color:'black',
        fontWeight:'500'
    },
    card:{
        paddingHorizontal: 50,
        backgroundColor: "#343434",
        padding: 20,
        borderRadius: 5,
        color: "#FFFFFF",
        marginHorizontal: 10,
        marginTop: 10,
    },
    info:{
        textAlign:'center',
        color:'#FFFFFF',
        fontWeight:'500'
    },
    
})
export default InformationCards;