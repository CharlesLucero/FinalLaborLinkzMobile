import React, { useState, useContext } from 'react';
import {View,SafeAreaView,TouchableWithoutFeedback,Keyboard,TouchableOpacity, ScrollView, Text, TextInput} from 'react-native';
import { Entypo } from '@expo/vector-icons';
import HeaderText from '../components/HeaderText';
import BodyText from '../components/BodyText';
import axios from 'axios'; 
import { PostContext } from '../context/postContext';

const CreatePost = ({ navigation }) => {
     // global state
    const [posts, setPosts] = useContext(PostContext);
    // local state
    const [title, setTitle] = useState("");
    const [description, setDecription] = useState("");
    const [minRate, setMinRate] = useState("");
    const [maxRate, setMaxRate] = useState("");
    const [loading, setLoading] = useState(false);
   

    //handle form data post DATA
    const handleSubmit = async () => {
        try {
            setLoading(true);
            if (!title) {
              alert("Please add post title ");
            }
            if (!description) {
              alert("Please add post  description");
            }
            if (!minRate) {
                alert("Please add post  minimum rate");
              }
            if (!maxRate) {
              alert("Please add post  maximum rate");
            }
            const { data } = await axios.post("/post/create-post", {
              title,
              description,
              minRate,
              maxRate,
            });
            setLoading(false);
            setPosts([...posts, data?.post]);
            alert(data?.message);
            navigation.navigate("Home");
          } catch (error) {
            alert(error.response.data.message || error.message);
            setLoading(false);
            console.log(error);
          }
    }
        
  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#ffffff', marginTop: 30}}>
  
      <TouchableWithoutFeedback onPress={dismissKeyboard}>
        <View style = {{flex: 1}}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{paddingHorizontal: 24,paddingVertical: 20,}}>
            <TouchableOpacity onPress={() => navigation.navigate('Home')}>
              <Entypo name="chevron-left" size={32} color="#A9A9A9" />
            </TouchableOpacity>
          </View>

          <View style={{ paddingHorizontal: 32, paddingTop: 10,}}>
            <HeaderText text="Create a Post" />
            <BodyText
              text="Insert all the following requirement:"
              color="#00CCAA"
              marginTop={10}
              fontSize={16}
            />
          </View>

          <View style={{ paddingHorizontal: 32, marginTop: 10 }}>
                <TextInput 
                style = {{backgroundColor: '#F6F6F6', height: 70, borderRadius: 15, paddingLeft: 15  }}
                placeholder='Title'
                value={title}
                onChangeText ={(text) => setTitle(text)}
                />
          </View>

          <View style={{ paddingHorizontal: 32, marginTop: 10 }}>
                <TextInput 
                style = {{backgroundColor: '#F6F6F6', height: 70, borderRadius: 15, paddingLeft: 15, textAlignVertical: "top", height: 150, paddingTop: 10  }}
                placeholder='Enter the description'
                multiline = {true}
                numberOfLines={10}
                value={description}
                onChangeText ={(text) => setDecription(text)}
                />
          </View>


          <View style={{flexDirection: 'row', paddingHorizontal: 35, marginTop: 10, gap: 10}}>
            <View style={{ flex: 1 }}>
                <TextInput 
                style = {{backgroundColor: '#F6F6F6', height: 70, borderRadius: 15, paddingLeft: 15  }}
                placeholder = "Minimum. Rate"
                value = {minRate}
                onChangeText ={(text) => setMinRate(text)}
                keyboardType='numeric'
                />
            </View>

            <View style={{ flex: 1 }}>
                <TextInput
                style = {{backgroundColor: '#F6F6F6', height: 70, borderRadius: 15, paddingLeft: 15  }}
                placeholder = "Maximum. Rate"
                value = {maxRate}
                onChangeText ={(text) => setMaxRate(text)}
                keyboardType='numeric'
                />
            </View>
          </View>
          

            <View style={{ paddingHorizontal: 32, alignItems: 'center', marginTop: 50 }}>
                <TouchableOpacity style = {{backgroundColor: '#00CCAA', width: 220, height: 45, borderRadius: 18, justifyContent: 'center', alignItems: 'center'}} onPress = {handleSubmit} >
                    <Text style = {{fontWeight: '500'}}>Create Post</Text>
                </TouchableOpacity>
            </View>
            
      </ScrollView>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default CreatePost;
