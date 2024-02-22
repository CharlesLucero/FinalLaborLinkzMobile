import React, { useContext, useState, useCallback, useEffect } from 'react';
import {View, Text, SafeAreaView, StyleSheet, TouchableOpacity, RefreshControl, Image, TextInput, ScrollView, TouchableHighlight,} from 'react-native';
import FooterMenu from '../../../components/Menus/FooterMenu';
import { MaterialCommunityIcons, Feather , FontAwesome , Ionicons, SimpleLineIcons  } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PostContext } from '../../../context/postContext';
import PostCard from '../../../components/PostCard';
import CustomCard from '../../../components/CustomCard';

const Home = ({navigation}) => {
    //global state
    const [posts, getAllPosts] = useContext(PostContext);
    const [refreshing, setRefreshing] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 10;

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
        
        <View style={{flexDirection: 'row', justifyContent: 'center', marginBottom: 20, alignItems: 'center', gap: 8}}>
            <Image source={require('../../../assets/image/logoblack.png')} style={{ width: 32, height: 32, }} />
        </View>
        <ScrollView showsVerticalScrollIndicator={false}  refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
        {/* Search Desc**/}
        <View>
            <Text style = {{color: '#000000', fontWeight: '600', textAlign:'center', marginTop: 2, marginBottom: 12}}> Search from 
            <Text style = {styleS.heading}> {posts?.length}</Text> available jobs now</Text>
        </View>
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
                                width: 140                     
                                }}>
                                    <SimpleLineIcons name="diamond" size={18} color="white" />
                                
                                <Text style={{color: 'white', fontSize: 14}}>Subscribe</Text>
             </View>
        </TouchableHighlight>
        
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
                            width: 140,
                            }}>
                        <TouchableOpacity onPress={() => navigation.navigate('CreatePost')}>
                            <Ionicons name="create-outline" size={18} color="white"  />
                        </TouchableOpacity>
                            <Text style={{color: 'white', fontSize: 14}}>Add Post</Text>
            </View>
        </TouchableHighlight>
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
                            <PostCard
                                key={post._id}
                                post = {post} 
                                navigation={navigation}  // Assuming _id is the unique identifier for a post
                                posts={[{
                                    ...post,
                                    title: highlightSearchText(post.title, searchText),
                                    description: highlightSearchText(post.description, searchText),
                                }]}
                        
                            />
                        ))}
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
        justifyContent: 'center',
        paddingHorizontal: 10,
        marginBottom: 20,
        alignItems: 'center',
        gap: 8
    },
    
})
export default Home;