import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { AntDesign, FontAwesome, Entypo, MaterialIcons, Octicons  } from '@expo/vector-icons';
import moment from 'moment';
import { useNavigation } from "@react-navigation/native";


const PlumberCard = ({info}) => {
    const navigation = useNavigation()

    //more details of worker
    const handleView = (infos) => {
        navigation.navigate('ViewProfile', { profileData: infos });
        console.log(infos);
    }
    

    return(
        <View>
            <Text style = {styles.total}>There are {info?.length} Available Carpenters</Text>
            {info?.map( ( infos, i) => (
                <View style = {styles.card} key ={i}>
                <TouchableOpacity onPress={() => handleView( infos)}>
                        <View >
                        {infos?.createdBy?.firstName && (
                            <Text style = {{fontSize: 20,}}>{""}
                            <FontAwesome name="user" size={25} color="#00CCAA" />{"  "}
                            {infos?.createdBy?.firstName} {infos?.createdBy?.lastName}
                            </Text>)}
                            <Text style = {{borderBottomWidth: .5}}></Text>
                        </View>

                        <View style = {{marginTop: 15, flexDirection:'row'}}>
                            <Entypo name="info-with-circle" size={24} color="#00CCAA" />
                            <Text style = {{fontSize: 18, paddingLeft: 6}}>Bio: {infos?.bio}</Text>
                        </View>

                        <Text style = {{borderBottomWidth: .5, borderColor: 'black'}}></Text>
                        
                        <View style = {{marginTop: 15, flexDirection:'row'}}>
                            <Octicons name="number" size={24} color="#00CCAA" />
                            <Text style = {{fontSize: 18, paddingLeft: 6}}>Age: {infos?.age}</Text>
                        </View>

                        <Text style = {{borderBottomWidth: .5, borderColor: 'black'}}></Text>
                        
                        <View style = {{marginTop: 15, flexDirection:'row'}}>
                            <MaterialIcons name="hardware" size={24} color="#00CCAA" />
                            <Text style = {{fontSize: 18, paddingLeft: 6}}>Job: {infos?.job}</Text>
                        </View>

                        <Text style = {{borderBottomWidth: .5, borderColor: 'black'}}></Text>
                        
                        <View style = {{marginTop: 15, flexDirection:'row'}}>
                            <Entypo name="address" size={24} color="#00CCAA" />
                            <Text style = {{fontSize: 18, paddingLeft: 6}}>Address: {infos?.address}</Text>
                        </View>


                    </TouchableOpacity>
                </View>
            ))}
        </View>
    )
}

const styles = StyleSheet.create({
    total:{
        color: 'green',
        marginTop: 20,
        textAlign:'center'
    },
    card:{
        width: '100%',
        backgroundColor:'#F6F6F6',
        padding: 20,
        borderRadius: 5,
        marginBottom: 10,
        marginVertical: 10,
        paddingHorizontal: 40
    },
})
export default PlumberCard;






















