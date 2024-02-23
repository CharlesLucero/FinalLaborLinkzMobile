import React, { useContext, useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import { AuthContext } from '../context/authContext';
import { ImageF } from '../APIRoutes';

const AccountSetting = ({ navigation }) => {
  const [state, setState] = useContext(AuthContext);
  const { user, token } = state;

  const [firstName, setFirstName] = useState(user?.firstName);
  const [lastName, setLastName] = useState(user?.lastName);
  const [contactNumber, setContactNumber] = useState(user?.contactNumber);
  const [location, setLocation] = useState(user?.location);
  const [gender, setGender] = useState(user?.gender);
  const [password, setPassword] = useState(user?.password);
  const [email] = useState(user?.email);
  const [image, setImage] = useState(user?.image);
  const [loading, setLoading] = useState(false);
  const [newProfilePic, setNewProfilePic] = useState('');
  const [isUpdatingProfilePic, setIsUpdatingProfilePic] = useState(false);

  useEffect(() => {
    getPermissionAsync();
  }, [newProfilePic]);

  const getPermissionAsync = async () => {
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert('Permission to access camera roll is required!');
    }
  };

  const selectImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const firstResult = result.assets[0];
      setNewProfilePic(firstResult.uri);
    }
  };

  const handleProfilePicAction = () => {
    if (image && !isUpdatingProfilePic) {
      Alert.alert(
        'Confirm Image Replacement',
        'Are you sure you want to replace the existing image?',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'OK',
            onPress: () => {
              setIsUpdatingProfilePic(true);
              selectImage();
            },
          },
        ]
      );
    } else {
      selectImage();
    }
  };

  const handleUpdate = async () => {
    try {
      setLoading(true);

      const formData = new FormData();
      formData.append('firstName', firstName);
      formData.append('lastName', lastName);
      formData.append('contactNumber', contactNumber);
      formData.append('gender', gender);
      formData.append('location', location);
      formData.append('email', email);

      if (newProfilePic !== image) {
        const uriParts = newProfilePic.split('.');
        const fileType = uriParts[uriParts.length - 1];
        const profilepicFileName = `image.${fileType}`;
        formData.append('image', {
          uri: newProfilePic,
          name: profilepicFileName,
          type: `image/${fileType}`,
        });
      }

      const { data } = await axios.put('/auth/update-user', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });

      setLoading(false);
      setState({ ...state, user: data?.updatedUser, image: data?.updatedUser?.image }); // Update the image state
      alert(data && data.message);
    } catch (error) {
      alert(error.response.data.message);
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ paddingHorizontal: 20 }}>
          <TouchableOpacity>
            <Entypo name="chevron-left" size={24} color="black" onPress={() => navigation.navigate('Setting')} />
          </TouchableOpacity>
        </View>

        <View style={{ alignItems: 'center' }}>
          <TouchableOpacity onPress={handleProfilePicAction}>
            <Image style={styles.imageborder} source={{ uri: newProfilePic || image }} />
          </TouchableOpacity>
          <Text style={styles.username}>{state?.user.firstName} {state?.user.lastName}</Text>
        </View>

        <View style={{ paddingHorizontal: 20, marginTop: 20 }}>
          <Text style={{ fontSize: 16, fontWeight: '600' }}>Edit Information</Text>
        </View>
        {/* <View style={{ paddingHorizontal: 20, marginTop: 20 }}>
          <Text style={{ fontSize: 16, fontWeight: '600' }}>{image}</Text>
        </View> */}

            <View style={{ paddingHorizontal: 32, flexDirection: 'row', alignItems: 'center', gap: 14}}>
                <View style={{ flex: 1 }}>
                <TextInput style = {styles.inputBox}
                value={firstName}
                onChangeText={(text) => setFirstName(text)}
                editable= {false}
                />
                </View>

                <View style={{ flex: 1 }}>
                <TextInput style = {styles.inputBox}
                value={lastName}
                onChangeText={(text) => setLastName(text)}
                editable= {false}
                />
                </View>
            </View>

            <View style={{ paddingHorizontal: 32, flexDirection: 'row', alignItems: 'center', gap: 14}}>
                <View>
                <TextInput style = {styles.inputBox}
                value={contactNumber}
                onChangeText={(text) => setContactNumber(text)}
                editable= {false}
                />
                </View>

                <View style={{ flex: 1 }}>
                <TextInput style = {styles.inputBox}
                value={gender}
                onChangeText={(text) => setGender(text)}
                editable= {false}
                />
                </View>
            </View>

            

            <View style={{ paddingHorizontal: 32}}>
                <View>
                    <TextInput style = {styles.inputBoxLong}
                    value={location}
                    onChangeText={(text) => setLocation(text)}
                    editable= {false}
                    />
                </View>

                <View>
                    <TextInput style = {styles.inputBoxLong}
                    value={email}
                    editable ={false}
                    />
                </View>

                <View>
                    <TextInput style={styles.inputBoxLong}
                        value={password}
                        placeholder='-------------------------- change password here -----------------------'
                        onChangeText={(text) => setPassword(text)}
                        secureTextEntry={true}
                        placeholderTextColor='#00CCAA' // Setting the placeholder text color to green
                    />
                </View>


                <View>
                    <TextInput style = {styles.inputBoxLong}
                    value={state?.user.role}
                    editable= {false}
                    />
                </View>
            </View>

            <View style = {{alignItems:'center'}}>
                <TouchableOpacity style = {styles.btnsave} onPress={handleUpdate}>
                <Text style = {styles.btntext}>{loading ? 'Please Wait' : "Save"}</Text>
                </TouchableOpacity>
            </View>

            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container:{ 
        flex:1,
        justifyContent: 'space-between',
        margin:10,
        marginTop: 40,
    },
    username:{
        color: '#00CCAA',
        fontSize: 32,
        fontWeight: '600',
    },
    inputBox:{
        backgroundColor: 'white',
        fontSize: 10,
        height: 50,
        borderRadius: 20,
        borderColor: '#D2CECE',
        borderWidth: 1,
        fontSize: 15,
        paddingHorizontal: 15,
        marginTop: 5
    },
    inputBoxLong:{
        backgroundColor: 'white',
        fontSize: 10,
        height: 50,
        borderRadius: 20,
        borderColor: '#D2CECE',
        borderWidth: 1,
        fontSize: 15,
        paddingHorizontal: 15,
        marginTop: 10
    },
    btnsave:{
        backgroundColor: '#343434',
        borderRadius: 15,
        height: 50,
        width: 250,
        marginTop: 50,
        justifyContent:'center',
        alignItems:'center',
        
        
    },
    btntext:{
        color:'#00CCAA',
        fontSize: 18,
        fontWeight: '600'

    },
    imageborder: {
        height: 170,
        width: 170,
        borderRadius: 100,
        borderWidth: 5,
        borderColor: "black",
      },    
})

export default AccountSetting;
