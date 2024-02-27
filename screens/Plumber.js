import React, { useContext, useState, useEffect } from "react";
import { View, StyleSheet, Text , TouchableOpacity, RefreshControl, Image, SafeAreaView, ScrollView} from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { InfoPlumberContext } from "../context/infoPlumberContext";
import PlumberCard from "../components/PlumberCard";
import axios from 'axios';

const Plumber = ({navigation}) =>{
    const [info, setInfo] = useContext(InfoPlumberContext)
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = async () => {
        try {
        setRefreshing(true);
        const {data} = await axios.get('/information/getinfoplumber')
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
                        <Text style = {styles.Plumber}>PLUMBER</Text>
                    </View>

                    <View style = {{paddingHorizontal: 20}}>
                    <PlumberCard  info = {info}/>
                    </View>

                    <View>
                        <Text>{JSON.stringify(info, null, 4)}</Text>
                    </View>
                        

                </ScrollView>
            </View>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    Plumber:{
        color: '#00CCAA',
        fontWeight: 'bold',
        fontSize: 25,
        textShadowColor: 'gray',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2,
    }
})
export default Plumber;

