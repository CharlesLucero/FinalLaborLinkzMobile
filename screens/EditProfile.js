import React, { useContext, useState } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, Image, StyleSheet, TextInput, ScrollView } from "react-native";
import { Entypo } from '@expo/vector-icons';
import {AuthContext} from '../context/authContext'
import { InfoElectricianContext } from '../context/infoElectricianContext';
import { InfoPlumberContext } from '../context/infoPlumberContext';
import {InfoMaidContext} from '../context/infoMaidContext';
import {InfoCarpenterContext} from '../context/infoCarpenterContext';
import {InfoTechnicianContext} from '../context/infoTechnicianContext';
import {InfoDriverContext} from '../context/infoDriverContext';
import axios from 'axios';



const EditProfile = ({navigation}) => {
    const [state, setState] = useContext(AuthContext);
    //global sate
    const [info ,setInfo] = useContext( 
    InfoElectricianContext, InfoPlumberContext, InfoMaidContext, InfoCarpenterContext,
    InfoTechnicianContext, InfoDriverContext)
    //local state
    const [bio, setBio] = useState('');
    const [age, setAge] = useState('');
    const [job, setJob] = useState('');
    const [address, setAddress] = useState('');
    const [loading, setLoading] = useState(false);

    //handle form data info data
    const handleSubmit = async () => {
        try {
            setLoading(true);
            if (!bio) {
              alert("Please add bio ");
            }
            if (!age) {
              alert("Please add age");
            }
            if (!job) {
                alert("Please add job");
              }
            if (!address) {
              alert("Please add address");
            }
            const { data } = await axios.post("/information/create-info", { bio, age, job, address });
            setLoading(false);
            setInfo([...info, data?.info])
            alert(data?.message);

            navigation.navigate("Home");
          } catch (error) {
            alert(error.response.data.message || error.message);
            setLoading(false);
            console.log(error);
          }
    }


    return(
        <SafeAreaView style={{ flex: 1, backgroundColor: '#ffffff', marginTop: 30}}>
            <View>
            <ScrollView  showsVerticalScrollIndicator={false} >
                <View style = {{ paddingHorizontal: 20, marginTop: 25}}>
                    <TouchableOpacity>
                        <Entypo name="chevron-left" size={24} color="black" onPress={() => navigation.navigate('Setting')}/>
                    </TouchableOpacity>
                </View>

                <View style = {{alignItems:'center'}}>
                    <Image source={{uri:'https://www.pngall.com/wp-content/uploads/5/Profile-Transparent.png'}} 
                    style = {{ height: 170, width: 170, borderRadius: 100, borderWidth: 5, borderColor: 'black'}}></Image>
                    <Text style = {styles.username}>{state?.user.firstName} {state?.user.lastName}</Text>
                </View>

                <View style = {{paddingHorizontal: 25, marginTop: 20}}>
                    <Text style = {{fontWeight: '500'}}>Edit Information</Text>
                </View>

                <View style = {{paddingHorizontal: 30, marginTop: 20}}>
                    <TextInput
                        style = {{backgroundColor: '#F6F6F6', height: 50, borderWidth: .3, borderRadius: 15, paddingLeft: 15 }}
                        placeholder='Bio'
                        placeholderTextColor={'#00CCAA'}
                        value={bio}
                        onChangeText ={(text) => setBio(text)}
                    />
                </View>

                <View style = {{paddingHorizontal: 30, marginTop: 20}}>
                    <TextInput
                        style = {{backgroundColor: '#F6F6F6', height: 50, borderWidth: .3, borderRadius: 15, paddingLeft: 15 }}
                        placeholder='Age'
                        placeholderTextColor={'#00CCAA'}
                        value={age}
                        onChangeText ={(text) => setAge(text)}
                    />
                </View>

                <View style = {{paddingHorizontal: 30, marginTop: 20}}>
                    <TextInput
                        style = {{backgroundColor: '#F6F6F6', height: 50, borderWidth: .3, borderRadius: 15, paddingLeft: 15 }}
                        placeholder='Job eg; Carpenter, Plumber, Electrician, Maid, Driver, Technician'
                        placeholderTextColor={'#00CCAA'}
                        value={job}
                        onChangeText ={(text) => setJob(text)}
                    />
                </View>

                <View style = {{paddingHorizontal: 30, marginTop: 20}}>
                    <TextInput
                        style = {{backgroundColor: '#F6F6F6', height: 50, borderWidth: .3, borderRadius: 15, paddingLeft: 15 }}
                        placeholder='Address'
                        placeholderTextColor={'#00CCAA'}
                        value={address}
                        onChangeText ={(text) => setAddress(text)}
                    />
                </View>

                <View style={{ paddingHorizontal: 32, alignItems: 'center', marginTop: 50  }}>
                    <TouchableOpacity style = {{backgroundColor: '#343434', width: 220, height: 45, borderRadius: 18, justifyContent: 'center', alignItems: 'center'}} onPress = {handleSubmit}>
                        <Text style = {{fontWeight: '500', color: '#00CCAA'}}>Save</Text>
                    </TouchableOpacity>
                </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    username:{
        color: '#00CCAA',
        fontSize: 32,
        fontWeight: '600',
    },
})
export default EditProfile;















