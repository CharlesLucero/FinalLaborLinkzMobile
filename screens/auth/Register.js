import React, { useState } from 'react';
import {View, Text, SafeAreaView, TouchableWithoutFeedback, Keyboard, TouchableOpacity, Image, Vibration, ScrollView, Alert,} from 'react-native';
import { Entypo } from '@expo/vector-icons';
import BodyText from '../../components/BodyText';
import HeaderText from '../../components/HeaderText';
import InputBox from '../../components/InputBox';
import CustomButton from '../../components/CustomButton';
import axios from 'axios';

const Register = ({navigation}) => {
  //states
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [gender, setGender] = useState('');
  const [email, setEmail] = useState(''); // Changed the variable name to 'email'
  const [password, setPassword] = useState('');
  const [location, setLocation] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState (false);

 //function
 //btnfunction
 const handleSubmit = async ()=>{
  try{
    setLoading(true);
    if (!firstName || !lastName || !contactNumber || !gender || !location || !email || !password){
      Alert.alert('Please Fill All Fields');
      setLoading(false);
      return;
    }
    setLoading(false);
    const {data} = await axios.post("/auth/register", 
    {firstName, lastName, contactNumber, gender, location, email, password});
    alert(data && data.message);
    navigation.navigate('Login')
    console.log('Register Data==>', {firstName, lastName, contactNumber, gender, location, email, password});
    
  }catch (error){
    alert(error.response.data.message);
    setLoading(false)
    console.log(error)
  }
 };

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };
  return (
 
    <SafeAreaView style = {{flex:1, backgroundColor: 'white'}}>
   <ScrollView>
            <TouchableWithoutFeedback onPress={dismissKeyboard}>
              <View style={{ backgroundColor: '#FFFFFF', flex:1 }}>
                <View style = {{marginTop: 30, paddingHorizontal: 20, flexDirection: 'row', justifyContent: 'space-between'}}>
                  <TouchableOpacity>
                    <Entypo name="chevron-left" size={32} color="#A9A9A9" />
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                    <BodyText text="Skip" fontSize={16} />
                  </TouchableOpacity>
                </View>

                <View style={{ paddingHorizontal: 32, paddingTop: 0 }}>
                  <HeaderText text="Join" />
                  <HeaderText text="Laborlinkz" />
                  <BodyText
                  text="Create an account and discover"
                  color="#00CCAA"
                  marginTop={10}
                  fontSize={18}
                />
                  <BodyText text="local laborers near you." color="#00CCAA" fontSize={18} />
                </View>

                <View
                style={{
                  paddingHorizontal: 32,
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 14,
                }}
              >
                <View style={{ flex: 1 }}>
                  <InputBox
                    placeholder="First Name"
                    height={70}
                    value={firstName} setValue = {setFirstName}
                  />
                </View>

                <View style={{ flex: 1 }}>
                  <InputBox
                    placeholder="Last Name"
                    height={70}
                    value={lastName} setValue = {setLastName}
                  />
                </View>
              </View>

              <View
                style={{
                  paddingHorizontal: 32,
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 14,
                }}
              >
                <View style={{ flex: 1 }}>
                  <InputBox
                    placeholder="Contact Number"
                    height={70}
                    value={contactNumber} setValue = {setContactNumber}
                  />
                </View>

                <View style={{ flex: 1 }}>
                  <InputBox
                    placeholder="Gender"
                    height={70}
                    value={gender} setValue = {setGender}
                  />
                </View>
              </View>

              <View style={{ paddingHorizontal: 32 }}>

              <InputBox
                  placeholder="Location" // Changed the placeholder to "Email"
                  height={70}
                  value={location} setValue = {setLocation}
                />

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

              <View
                style={{
                  paddingHorizontal: 32,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginVertical: 10,
                }}
              >
                <View
                  style={{
                    borderBottomColor: 'black',
                    borderBottomWidth: 1,
                    flex: 1,
                    marginRight: 10,
                  }}
                />
                <BodyText text="or" color="black" fontSize={14} />
                <View
                  style={{
                    borderBottomColor: 'black',
                    borderBottomWidth: 1,
                    flex: 1,
                    marginLeft: 10,
                  }}
                />
              </View>

              <View style={{ paddingHorizontal: 32 }}>
                <TouchableOpacity
                  onPress={() => {
                    // Handle Google Sign-In here
                  }}
                  style={{
                    backgroundColor: '#000000',
                    paddingVertical: 12,
                    borderRadius: 15,
                    alignItems: 'center',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Image
                    source={require("../../assets/image/googleIcon.png")}
                    style={{
                      width: 24,
                      height: 24,
                      marginRight: 10,
                    }}
                  />
                  <Text style={{ color: '#ffffff', fontSize: 14 }}>
                    Sign up with Google
                  </Text>
                </TouchableOpacity>
              </View>

              <View
                style={{
                  paddingHorizontal: 32,
                  marginTop: 24, // Adjust the margin as needed
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
              </View>

              {/* Signup Button */}
              <View style={{ paddingHorizontal: 32, marginTop: 10, alignItems: 'center' }}>
                <CustomButton 
                title="Sign Up" 
                loading={loading}
                handleSubmit={handleSubmit}
                />
              </View>
              {errorMessage ? (
                <Text style={{ color: 'red', marginTop: 8, textAlign: 'center' }}>{errorMessage}</Text>
              ) : null}

              </View>
            </TouchableWithoutFeedback>
            </ScrollView>
    </SafeAreaView>
  
    
  );
};
export default Register;