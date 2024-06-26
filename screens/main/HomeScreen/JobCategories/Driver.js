import React, { useContext, useState, useEffect } from "react";
import { View, StyleSheet, Text , TouchableOpacity, RefreshControl, SafeAreaView, ScrollView} from 'react-native';
import { Entypo } from '@expo/vector-icons';
import DriverCard from "../../../../components/DriverCard"
import {InfoDriverContext} from "../../../../context/infoDriverContext"
import axios from 'axios';
const Driver = ({navigation}) =>{
    const [info, setInfo] = useContext(InfoDriverContext)
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = async () => {
        try {
        setRefreshing(true);
        const {data} = await axios.get('/information/getinfodriver')
        setRefreshing(false)
        setInfo(data?.info)
        } catch (error) {
            setRefreshing(false)
            console.log(error)
            alert(error)
        }
    };
    //initial
    useEffect(() => {
        onRefresh();
    }, []);


    return (
        <SafeAreaView style = {{flex:1, marginTop: 20, backgroundColor: '#ffffff'}}>
            <View style = {{flex:1 , marginTop: 20}}>
            <ScrollView  showsVerticalScrollIndicator={false} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />} >

                    <View style = {{paddingHorizontal: 20}}>
                        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                            <Entypo name="chevron-left" size={32} color="#A9A9A9" />
                        </TouchableOpacity>
                    </View>  

                    <View style = {{ alignSelf:'center', marginTop: 10}}>
                        <Text style = {styles.Driver}>DRIVER</Text>
                    </View>

                    <View style = {{paddingHorizontal: 20}}>
                    <DriverCard info = {info}/>
                    </View>

                    <View>
                        
                    </View>
                        
        
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    Driver:{
        color: '#343434',
        fontWeight: 'bold',
        fontSize: 18,
    }
})
export default Driver;

