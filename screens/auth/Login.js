import React, { useState, useContext } from 'react';
import {View, Text, SafeAreaView, TouchableWithoutFeedback, StyleSheet, Keyboard, TouchableOpacity, Image, Vibration, ScrollView, Alert, TextInput,} from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { AuthContext } from '../../context/authContext';
import BodyText from '../../components/BodyText';
import HeaderText from '../../components/HeaderText';
import InputBox from '../../components/InputBox';
import CustomButton from '../../components/CustomButton';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { loginRoutes } from '../../APIRoutes';

const Login = ({navigation}) => {
  //global state
  const [state, setState] = useContext(AuthContext)
    const [email, setEmail] = useState(false);
    const [password, setPassword] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState (false);

  

    const handleSubmit = async ()=>{
        try{
          setLoading(true);
          if (!email || !password){
            Alert.alert('Please Fill All Fields');
            setLoading(false);
            return;
          }
          setLoading(false);

          const {data} = await axios.post(loginRoutes, {
            email, 
            password
          });

          setState(data)
          await AsyncStorage.setItem('@auth', JSON.stringify(data.user));
          alert(data && data.message);
          navigation.navigate('Home')
          console.log('Login Data==>', {email, password});
          
        } catch (error){
          alert(error.response.data.message);
          setLoading(false);
          console.log(error);
        }
       };
       //temp function to check local storage data
       const getLocalStorageData = async () => {
          let data = await AsyncStorage.getItem('@auth');
          console.log("Local Storage ==>", data);
       };
       getLocalStorageData();


   
    const dismissKeyboard = () => {
        Keyboard.dismiss();
      };
    return(
        <SafeAreaView style={styles.container}>
        <ScrollView>
      <TouchableWithoutFeedback onPress={dismissKeyboard}>
        <View>
          <View style={styles.headerContainer}>

            <TouchableOpacity onPress={() => navigation.navigate('LoadingScreen')}>
              <Entypo name="chevron-left" size={32} color="#A9A9A9" />
            </TouchableOpacity>

            <TouchableOpacity onPress={()=>{}}>
              <BodyText text="Skip" fontSize={16} />
            </TouchableOpacity>
          </View>

          <View style={styles.textContainer}>
            <HeaderText text="Welcome to" />
            <HeaderText text="Laborlinkz" />
            <BodyText
              text="Login with your account and"
              color="#00CCAA"
              marginTop={10}
              fontSize={18}
            />
            <BodyText
              text="discover local laborers near you."
              color="#00CCAA"
              fontSize={18}
            />
          </View>

          <View style={styles.inputContainer}>
          <InputBox
              placeholder="Email" // Changed the placeholder to "Email"
              height={70}
              value={email} setValue = {setEmail}
            />

            <InputBox
              placeholder="Password"
              height={70}
              secureTextEntry={!showPassword}
              showPasswordToggle={true}
              value={password} setValue = {setPassword}
            />

          </View>

          <View style={styles.dividerContainer}>
            <View style={styles.divider} />
            <BodyText text="or" color="black" fontSize={14} />
            <View style={styles.divider} />
          </View>

          <View style={styles.googleSignInContainer}>
            <TouchableOpacity onPress={() => {/* Handle Google Sign-In here */}} style={styles.googleSignInButton}>
              <Image source={require("../../assets/image/googleIcon.png")} style={styles.googleIcon} />
              <Text style={styles.googleButtonText}>Sign in with Google</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.signupContainer}>
            <BodyText text="Don't have an account?" color="black" fontSize={14} />

            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <BodyText
              text=" Sign up"
              color="#00CCAA"
              fontSize={14}
              style={styles.underline}
              
            />
          </TouchableOpacity>

          </View>

          <View style={styles.loginButtonContainer}>
            <CustomButton title="Login" 
            loading={loading}
            handleSubmit={handleSubmit}  />
          </View>
        </View>
      </TouchableWithoutFeedback>
      </ScrollView>
    </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#ffffff',
      marginTop: 30
    },
    headerContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 24,
      paddingVertical: 20,
    },
    textContainer: {
      paddingHorizontal: 32,
      paddingTop: 50,
    },
    inputContainer: {
      paddingHorizontal: 32,
    },
    errorMessage: {
      color: 'red',
      marginTop: 8,
    },
    dividerContainer: {
      paddingHorizontal: 32,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginVertical: 20,
    },
    divider: {
      borderBottomColor: 'black',
      borderBottomWidth: 1,
      flex: 1,
    },
    googleSignInContainer: {
      paddingHorizontal: 32,
    },
    googleSignInButton: {
      backgroundColor: '#000000',
      paddingVertical: 12,
      borderRadius: 15,
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'center',
    },
    googleIcon: {
      width: 24,
      height: 24,
      marginRight: 10,
    },
    googleButtonText: {
      color: '#ffffff',
      fontSize: 14,
    },
    signupContainer: {
      paddingHorizontal: 32,
      marginTop: 24,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    underline: {
      textDecorationLine: 'underline',
    },
    loginButtonContainer: {
      paddingHorizontal: 32,
      marginTop: 40,
      alignItems: 'center',
    },
  });
export default Login