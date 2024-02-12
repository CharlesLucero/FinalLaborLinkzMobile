import { View, Text, StyleSheet, TouchableOpacity , Alert} from "react-native";
import React, { useState } from "react";
import moment from 'moment';
import { AntDesign, FontAwesome } from '@expo/vector-icons';
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import EditModal from "./EditModal";


const PostViewCard = ({posts, Account}) => {
    const [loading, setLoading] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const navigation = useNavigation();
    const [post, setPost] = useState ({});
   
    return(
        <View >
            
            {Account && <EditModal modalVisible={modalVisible} setModalVisible={setModalVisible} post={post}/>}
            {posts?.map( (post, i) =>(
                
                <View style = {styles.card} key ={i}>
                        

                    <TouchableOpacity>
                    <View style = {{flexDirection: 'row', justifyContent:'space-between', marginTop: 5}}>
                        <Text style = {{fontSize: 15}}>Title: {post?.title} </Text>
                        <TouchableOpacity>
                            <AntDesign name="hearto" size={20} color="#00CCAA" />
                        </TouchableOpacity>
                    </View>

                    <View style = {{ marginTop: 20}}>
                        <Text style = {{color: 'gray', fontSize: 13}}>Location: {post?.postedBy?.location} </Text>
                    </View>

                    <View style = {{flexDirection:'row'}}> 
                        <Text style = {{color: 'gray', fontSize: 13}}>Rate: P{post?.minRate}.00 - </Text>
                        <Text style = {{color: 'gray', fontSize: 13}}>P{post?.maxRate}.00</Text>
                        
                    </View>

                    <View style = {{ marginTop: 20}}>
                        <Text style = {{ fontSize:14}}>Description: {post?.description} </Text>
                        <Text style = {{borderBottomWidth: .5}}></Text>
                    </View>

                    <View style = {{ marginTop: 20, flexDirection: 'row', justifyContent:'space-between'}}>
                        {post?.postedBy?.firstName && (
                        <Text>{""}
                        <FontAwesome name="user" size={16} color="#00CCAA" />{"  "}
                        Posted By: {post?.postedBy?.firstName} {post?.postedBy?.lastName}
                        </Text>)}
                    </View>
                    <View>
                        <Text style = {{color: 'gray', fontSize: 13, textAlign:'right'}}>{""}<AntDesign name="clockcircleo" size={14} color="#00CCAA" />{" "}
                        Posted {moment(post?.createdAt).format('DD:MM:YYYY || HH:mm')} </Text>
                    </View>
                    </TouchableOpacity>
                </View>


            ))}
        </View>
    );
};
const styles = StyleSheet.create({
    heading:{
        color: '#00CCAA',    
        justifyContent: 'center',
        alignItems:'center' 
    },
    card:{
        width: '100%',
        backgroundColor:'#F6F6F6',
        borderWidth: 0.2,
        borderColor: 'gray',
        padding: 20,
        borderRadius: 5,
        marginBottom: 10,
        marginVertical: 10
    },
   
})
export default PostViewCard;