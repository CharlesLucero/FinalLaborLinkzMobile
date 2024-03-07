import React, { useContext, useState, useCallback, useEffect } from 'react';
import {Modal, View, Text, SafeAreaView, StyleSheet, TouchableOpacity, RefreshControl, Image, TextInput, ScrollView, TouchableHighlight,} from 'react-native';
import FooterMenu from '../../../components/Menus/FooterMenu';
import { MaterialCommunityIcons, Feather , FontAwesome , Ionicons, SimpleLineIcons, MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PostContext } from '../../../context/postContext';
import PostCard from '../../../components/PostCard';
import CustomCard from '../../../components/CustomCard';
import CustomModal from '../../../components/CustomModal';
import { Alert } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { useFocusEffect } from '@react-navigation/native';

const Home = ({navigation}) => {
    //global state
    const [posts, getAllPosts] = useContext(PostContext);
    const [refreshing, setRefreshing] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [token, setToken] = useState(null); // State to store the token
    const postsPerPage = 10;

    console.log(posts);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedPost, setSelectedPost] = useState(null);

    const toggleModal = (post) => {
        setSelectedPost(post);
        setIsModalVisible(!isModalVisible);
    };


     // Calculate start and end indices for posts to be displayed
     const indexOfLastPost = currentPage * postsPerPage;
     const indexOfFirstPost = indexOfLastPost - postsPerPage;
     const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

        // Function to handle navigation to previous page
        const goToPreviousPage = () => {
            setCurrentPage(currentPage => currentPage - 1);
        };

        // Function to handle navigation to next page
        const goToNextPage = () => {
            setCurrentPage(currentPage => currentPage + 1);
        };

        useFocusEffect(() => {
            // Check for JWT token when component mounts
            checkJWTToken();
            
        });

        const checkJWTToken = async () => {
            try {
                // Retrieve the JWT token from secure storage
                const token = await SecureStore.getItemAsync('jwtToken');
                // Set the token in state
                setToken(token);
            } catch (error) {
                console.error('Error retrieving JWT token:', error);
            }
        };


 
    
     //fresh controll
     const onRefresh = useCallback(() => {
        setRefreshing(true);
        getAllPosts;
        setTimeout(() => {
            setRefreshing(false);
        }, 500);
    }, []);

    const handleAddPost = async () => {
        try {
            // Retrieve the JWT token from secure storage
            const token = await SecureStore.getItemAsync('jwtToken');
            console.log(`+++++++++++++++++++++++`)
            console.log(`THIS IS THE WORKING TOKEN FOR GUEST MODE: ${token}`)
            // Check if token exists
            if (token) {
                // User is logged in, navigate to CreatePost screen
                navigation.navigate('CreatePost');
            } else {
                // Token does not exist, show alert to prompt user to log in
                Alert.alert('Login Required', 'You must log in first.');
            }
        } catch (error) {
            console.error('Error retrieving JWT token:', error);
        }
    };

    return (
        
        <SafeAreaView style = {{flex:1, backgroundColor: 'white'}}>
        <View style = {styleS.container}>
        
        <View style={styleS.header}>
        
        {/* Subscribe**/}
        {!token ? (
        <TouchableHighlight
            activeOpacity={0.8}
            underlayColor="#fff"
            onPress={() => navigation.navigate('Login')}>
            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center', 
                                justifyContent: 'center', 
                                gap: 4, 
                                backgroundColor: '#343434', 
                                padding: 10, 
                                borderRadius: 10,
                                width: 90                    
                                }}>
                                    <MaterialIcons name="login" size={18} color="white" />
                                
                                <Text style={{color: 'white', fontSize: 12}}>Login</Text>
             </View>
        </TouchableHighlight>
        ): null}

        {/* Get Pro - Conditionally render based on JWT token existence */}
        {token ? (
            <TouchableHighlight
                activeOpacity={0.8}
                underlayColor="#fff"
                onPress={() => alert('Pressed!')}>
                <View style={{
                                    flexDirection: 'row',
                                    alignItems: 'center', 
                                    justifyContent: 'center', 
                                    gap: 4, 
                                    backgroundColor: '#343434', 
                                    padding: 10, 
                                    borderRadius: 10,                     
                                    }}>
                                        <SimpleLineIcons name="diamond" size={18} color="white" />
                                    
                                    <Text style={{color: 'white', fontSize: 12}}>Get Pro</Text>
                </View>
            </TouchableHighlight>
        ) : null}
        
        <View>
            <Image source={require('../../../assets/image/logoblack.png')} style={{ width: 32, height: 32, }} />
        </View>
        {/* Add Post**/}
        <TouchableHighlight
            activeOpacity={0.8}
            underlayColor="#fff"
            onPress={handleAddPost}>
            <View style={{
                            flexDirection: 'row', 
                            alignItems: 'center', 
                            justifyContent: 'center', 
                            gap: 4,
                            backgroundColor: '#70948f', 
                            padding: 10, 
                            borderRadius: 10,
                            }}>
                        <TouchableOpacity onPress={() => navigation.navigate('CreatePost')}>
                            <Ionicons name="create-outline" size={18} color="white"  />
                        </TouchableOpacity>
                            <Text style={{color: 'white', fontSize: 12}}>Add Post</Text>
            </View>
        </TouchableHighlight>
        </View>
        <ScrollView showsVerticalScrollIndicator={false}  refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>

        {/* Search Bar**/}
        <TouchableOpacity onPress={() => navigation.navigate('SearchScreen')}>
        <View style = {{flexDirection: 'row', backgroundColor: '#f0f0f0', borderRadius: 20, padding: 14, marginHorizontal: 24, justifyContent: 'center', alignItems: 'center', marginBottom: 12}}>
       
                <Feather style = {{paddingHorizontal: 5}} name="search" size={18} color="#00CCAA" />
         
                    <Text  style={{fontSize: 13}}>What service are you looking for?</Text>
              
        </View>
        </TouchableOpacity>
        {/* Search Desc**/}
        <View>
            <Text style = {{color: '#000000', fontWeight: '600', textAlign:'center', marginTop: 2, marginBottom: 20}}> Search from 
            <Text style = {styleS.heading}> {posts?.length}</Text> available jobs now</Text>
        </View>


        <View style = {{marginTop:0,  paddingHorizontal: 20, marginBottom: 12}}>
                <Text style = {{fontWeight:'600', fontSize: 17}}>Jobs Category</Text>
        </View>

        <View style = {{flexDirection: 'row', marginTop: 5, paddingLeft: 10, marginBottom: 14}}>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                
                    <CustomCard
                        title="Carpenter"
                        imageSource={require('../../../assets/image/carpenter.jpg')}
                        onPress={() => navigation.navigate('Carpenter')}
                    />
                    <CustomCard
                        title="Technician"
                        imageSource={require('../../../assets/image/technician.jpg')}
                        onPress={() => navigation.navigate('Technician')}
                    />
                    <CustomCard
                        title="Driver"
                        imageSource={require('../../../assets/image/driver.jpg')}
                        onPress={() => navigation.navigate('Driver')}
                    />
                    <CustomCard
                        title="Plumber"
                        imageSource={require('../../../assets/image/plumber.jpg')}
                        onPress={() => navigation.navigate('Plumber')}
                    />
                    <CustomCard
                        title="Maid"
                        imageSource={require('../../../assets/image/maid.jpg')}
                        onPress={() => navigation.navigate('Maid')}
                    />
                    <CustomCard
                        title="Electrician"
                        imageSource={require('../../../assets/image/electrician.jpg')}
                        onPress={() => navigation.navigate('Electrician')}
                    />
                </ScrollView>
        </View>

        <View style = {{marginTop: 10, paddingHorizontal: 20, marginBottom: 12}}>
                <Text style = {{fontWeight: 'bold', fontSize: 16}}>Jobs/Services</Text>
        </View>

        <View style={{ paddingHorizontal: 10 }}>
            {currentPosts.map(post => (
                <TouchableOpacity key={post._id} onPress={() => setIsModalVisible(true)}>
                    <PostCard
                        post={post}
                        navigation={navigation}
                        posts={[{
                            ...post,
                       
                        }]}
                    />
                </TouchableOpacity>
            ))}
        </View>

            
                <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, marginTop: 10}}>
                        <TouchableOpacity onPress={goToPreviousPage}>
                            <FontAwesome name="chevron-left" size={24} color="#00CCAA" />
                        </TouchableOpacity>
                        <Text>{currentPage}</Text>
                        <TouchableOpacity onPress={goToNextPage}>
                            <FontAwesome name="chevron-right" size={24} color="#00CCAA" />
                        </TouchableOpacity>
                    </View>



            </ScrollView>
            </View>
            <FooterMenu />
        </SafeAreaView>

       
    );
};

const styleS = StyleSheet.create({
    container:{
        flex:1,
        justifyContent: 'space-between',
        margin:0,
        marginTop: 16,
        backgroundColor:'white',   
    },
    heading:{
        color: '#00CCAA',    
        justifyContent: 'center',
        alignItems:'center' 
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingHorizontal: 10,
        marginBottom: 20,
        alignItems: 'center',
        alignContent: 'center',
        gap: 8
    },
    
})
export default Home;