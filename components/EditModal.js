import React, { useEffect, useState } from "react";
import {Alert, Modal, StyleSheet, Text, Pressable, View, TextInput} from 'react-native';
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

const EditModal = ({modalVisible, setModalVisible, post}) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [minRate, setMinRate] = useState("");
    const [maxRate, setMaxRate] = useState(""); 
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();

     //handle update post
    const updatePostHandler = async (id) => {
      try {
        setLoading(true);
        const { data } = await axios.put(`/post/update-post/${id}`, {
          title,
          description,
          minRate,
          maxRate,
        });
        setLoading(false);
        alert(data?.message);
        navigation.push("Account");
      } catch (error) {
        setLoading(false);
        console.log(error);
        alert(error);
      }
    };

    //inital post data\
    useEffect(() => {
        setTitle(post?.title);
        setDescription(post?.description);
        setMinRate(post?.minRate);
        setMaxRate(post?.maxRate);
    }, [post]);
    return(
        <View style={styles.centeredView}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                Alert.alert('Modal has been closed.');
                setModalVisible(!modalVisible);
                }}>
                <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    {/*<Text>{JSON.stringify(post, null, 4)}</Text>*/}
                    <Text style={styles.modalText}>Update Your Posts</Text>
                    <Text>Title</Text>
                    <TextInput  style = {styles.inputBox} value={title}
                    onChangeText={(text) => setTitle(text)}/>

                    <Text>Description</Text>
                    <TextInput style = {styles.inputBox} multiline={true} numberOfLines={5} value={description}
                    onChangeText={(text) => setDescription(text)}/>
                    
                    <Text>Minimum Rate</Text>
                    <TextInput style = {styles.inputBox} value={minRate}
                    onChangeText={(text) => setMinRate(text)} keyboardType="numeric"/>
                    
                    <Text>Maximum Rate</Text>
                    <TextInput style = {styles.inputBox} value={maxRate}
                    onChangeText={(text) => setMaxRate(text)} keyboardType="numeric"/>

                    <View style = {styles.btnContainer}>
                        <Pressable style={[styles.button, styles.buttonClose]} 
                        onPress={() => { updatePostHandler (post && post._id), setModalVisible(!modalVisible)}}>
                            <Text style={styles.textStyle}>{ loading ? 'Please Wait':'UPDATE'}</Text>
                        </Pressable>

                        <Pressable style={[styles.button, styles.buttonClose]} onPress={() => setModalVisible(!modalVisible)}>
                            <Text style={styles.textStyle}>CANCEL</Text>
                        </Pressable>
                    </View>
                </View>
                </View>
            </Modal>

           
        </View>
    )
};
const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 22,
    },
    modalView: {
      margin: 20,
      backgroundColor: 'white',
      borderRadius: 10,
      padding: 35,

      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    inputBox:{
        marginBottom: 20,
        backgroundColor: '#F6F6F6',
        borderColor: 'gray',
        borderWidth: .2,
        borderRadius: 10,
        marginTop: 10,
        paddingLeft: 10,
        textAlignVertical:'top',
        paddingTop: 5
    },
    btnContainer:{
        flexDirection: 'row'
    },
    button: {
      borderRadius: 10,
      padding: 10,
      elevation: 2,
      backgroundColor:'black',
      width: 100,
      margin: 10,

    },
    buttonOpen: {
      //backgroundColor: '#F194FF',//
    },
    buttonClose: {
      ///backgroundColor: '#2196F3',//
    },
    textStyle: {
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    modalText: {
      marginBottom: 15,
      textAlign: 'center',
    },
  });
export default EditModal;















