import React from "react";
import {Text,  View, StyleSheet, ImageBackground, TouchableOpacity} from 'react-native';
import HeaderText from "../../components/HeaderText";
import BodyText from "../../components/BodyText";
import CustomButton from "../../components/CustomButton";
import Login from "./Login";

const SplashScreen = ({navigation}) => {
    const handleSubmit = () => {
        navigation.navigate('Login');
      };
    

    return (
        <View style = {styles.maincontainer}>
            <ImageBackground style = {styles.background}  source={require('../../assets/image/background.png')}>

            <View style = {{marginTop: '150%', paddingHorizontal: 20}}>
                <HeaderText
                text="LaborLinkz"
                color="white"
                marginTop={50}
                fontSize = {32}
                />
            </View>

            <View style = {{paddingHorizontal: 20}}>
                <BodyText
                text="Join our community of skilled laborers today and start connecting with potential clients in your area!"
                color="white"
                fontWeight = 'bold'
                fontSize={16}
                />
            </View>

            <View style = {{paddingHorizontal: 20, marginTop: 10}}>
                <Text style = {{color: 'white', fontSize: 16, fontWeight: 'bold' }}>By continuing, you agree to our <Text style = {{color:'#00CCAA'}} onPress={() => navigation.navigate('TermsnCondition')}>terms and conditions</Text> and <Text style = {{color:'#00CCAA'}} onPress={() => navigation.navigate('PrivacyPolicy')}> privacy policy </Text> </Text>
            </View>

            <View style = {{marginTop: '10%', alignItems:'center'}}>
          
                <CustomButton
                title="Let's Go"
                color="white"
                fontWeight = 'bold'
                fontSize={16}
                marginTop={20}   
                handleSubmit ={handleSubmit}
                />

            </View>
            </ImageBackground>
        </View>
    )
}

const styles = StyleSheet.create({
        maincontainer:{
            flex:1
        },
        background:{
            flex:1,
            resizeMode:'cover'
        },
})
export default SplashScreen;