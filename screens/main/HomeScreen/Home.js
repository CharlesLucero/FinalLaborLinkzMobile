import React, { useContext, useState, useCallback, useEffect } from 'react';
import {Modal, View, Text, SafeAreaView, StyleSheet, TouchableOpacity, RefreshControl, Image, TextInput, ScrollView, TouchableHighlight,} from 'react-native';
import FooterMenu from '../../../components/Menus/FooterMenu';
import { MaterialCommunityIcons, Feather , FontAwesome , Ionicons, SimpleLineIcons  } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PostContext } from '../../../context/postContext';
import PostCard from '../../../components/PostCard';
import CustomCard from '../../../components/CustomCard';
import CustomModal from '../../../components/CustomModal';

const Home = ({navigation}) => {
    //global state
    const [posts, getAllPosts] = useContext(PostContext);
    const [refreshing, setRefreshing] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 10;

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

    const getFilteredPosts = () => {
        return posts.filter(post =>
            post.title.toLowerCase().includes(searchText.toLowerCase()) ||
            post.description.toLowerCase().includes(searchText.toLowerCase())
        );
    };

    const highlightSearchText = (text, search) => {
        if (!search) {
            return text; // No search text, return the original text
        }
    
        const regex = new RegExp(`(${search})`, 'gi');
        const parts = text.split(regex);
    
        return parts.map((part, index) => (
            regex.test(part) ? <Text key={index} style={{ backgroundColor: '#B1ACAC', fontWeight: 'bold' }}>{part}</Text> : part
        ));
    };
    
     //fresh controll
     const onRefresh = useCallback(() => {
        setRefreshing(true);
        getAllPosts;
        setTimeout(() => {
            setRefreshing(false);
        }, 500);
    }, []);


    return (
        
        <SafeAreaView style = {{flex:1, backgroundColor: 'white'}}>
        <View style = {styleS.container}>
        
        <View style={styleS.header}>
        
        {/* Subscribe**/}
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
        <View>
            <Image source={require('../../../assets/image/logoblack.png')} style={{ width: 32, height: 32, }} />
        </View>
        {/* Add Post**/}
        <TouchableHighlight
            activeOpacity={0.8}
            underlayColor="#fff"
            onPress={() => navigation.navigate('CreatePost')}>
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
        <View style = {{flexDirection: 'row', backgroundColor: '#f0f0f0', borderRadius: 20, padding: 14, marginHorizontal: 24, justifyContent: 'center', alignItems: 'center', marginBottom: 12}}>
                <Feather style = {{paddingHorizontal: 5}} name="search" size={18} color="#00CCAA" />
                <TextInput
                    style={{fontSize: 13}} 
                    placeholder='What service are you looking for?'
                    value={searchText}
                    onChangeText={(text) => setSearchText(text)} >
                </TextInput>
        </View>
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
                            title: highlightSearchText(post.title, searchText),
                            description: highlightSearchText(post.description, searchText),
                        }]}
                    />
                </TouchableOpacity>
            ))}
            <Modal
                animationType="slide"
                transparent={true}
                visible={isModalVisible}
                onRequestClose={() => setIsModalVisible(false)}
            >
                <View style={styleS.modalContainer}>
                    <View style={[styleS.modalContent, { zIndex: 10 }]}>
                        <Text>This is a modal with z-index of 10</Text>
                        {/* Add your modal content here */}
                        <TouchableOpacity onPress={() => setIsModalVisible(false)}>
                            <Text>Close Modal</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>

                {getFilteredPosts().length === 0 && (
                    <Text style={{ textAlign: 'center', marginTop: 10, color: 'red' }}>
                        No results found for "{searchText}"
                    </Text>
                )}
           
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
            <View style = {{backgroundColor: '#ffffff', borderWidth: .5, borderColor:'gray', paddingHorizontal: 20, borderTopRightRadius: 20, borderTopLeftRadius: 20, paddingTop:5}}>
                <FooterMenu />
            </View>
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
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
      },
      modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        elevation: 5, // For Android shadow
        shadowColor: '#000', // For iOS shadow
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        width: 340,
        height: 340
      },
})
export default Home;