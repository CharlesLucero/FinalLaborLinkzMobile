import React, { useContext, useState, useCallback, useEffect } from 'react';
import {View, Text, SafeAreaView, StyleSheet, TouchableOpacity, RefreshControl, Image, TextInput, ScrollView,} from 'react-native';
import FooterMenu from '../components/Menus/FooterMenu';
import { MaterialCommunityIcons, Feather , FontAwesome , Ionicons  } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PostContext } from '../context/postContext';
import PostCard from '../components/PostCard';

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
        <ScrollView showsVerticalScrollIndicator={false}  refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
        <View style={styleS.header}>
                        <TouchableOpacity>
                            <FontAwesome name="diamond" size={24} color="#00CCAA" />
                        </TouchableOpacity>
                        <Image source={require('../assets/image/logoblack.png')} style={{ width: 45, height: 45, }} />
                        <TouchableOpacity onPress={() => navigation.navigate('CreatePost')}>
                            <Ionicons name="create" size={24} color="#00CCAA"  />
                        </TouchableOpacity>
                        {/* <TouchableOpacity onPress={() => navigation.navigate('Notifications')}>
                            <FontAwesome name="bell" size={24} color="#00CCAA" left={8} />
                        </TouchableOpacity> */}
                    </View>


            <TouchableOpacity>
            <View style = {{flexDirection: 'row', borderColor: '#00CCAA',  borderWidth: 1, borderRadius: 20, paddingHorizontal: 20, paddingVertical: 3}}>
                <Feather style = {{paddingHorizontal: 5}} name="search" size={24} color="#00CCAA" />
                <TextInput  
                    placeholder='What kind of job are you looking for?'
                    value={searchText}
                    onChangeText={(text) => setSearchText(text)} >
                </TextInput>
            </View>
            </TouchableOpacity>

            <View>
                <Text style = {{color: '#000000', fontWeight: '600', textAlign:'center', marginTop: 10}}> Search 
                <Text style = {styleS.heading}> {posts?.length} </Text> jobs now</Text>
            </View>

            <View style = {{marginTop:15,  paddingHorizontal: 20,}}>
                <Text style = {{fontWeight:'600', fontSize: 17}}>Jobs Category</Text>
            </View>

            <View style = {{flexDirection: 'row', marginTop: 5, paddingHorizontal:10 }}>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                    <View style = {{paddingRight: 10}}>
                        <TouchableOpacity onPress={() => navigation.navigate('Carpenter')}>
                            <Image source={require('../assets/image/carpenter.jpg')} style = {{height: 250, position: 'relative', backgroundColor: 'black', width: 150, borderWidth: .2, borderColor:'black', borderRadius: 20  }}></Image>
                            <Text style = {{position: 'absolute', textAlign:'center', top: 90,  left: 0, right: 0, backgroundColor: 'rgba(0, 0, 0, 0.3)', color: '#00CCAA',  fontSize: 20, paddingVertical: 20, fontWeight: 'bold',  borderRadius: 10}}>CARPENTER</Text>
                        </TouchableOpacity>
                    </View>

                    <View style = {{paddingRight: 10}}>
                        <TouchableOpacity onPress={() => navigation.navigate('Technician')}>
                            <Image source={require('../assets/image/technician.jpg')} style = {{height: 250, position: 'relative', backgroundColor: 'black', width: 150, borderWidth: .2, borderColor:'black', borderRadius: 20  }}></Image>
                            <Text style = {{position: 'absolute', textAlign:'center', top: 90,  left: 0, right: 0, backgroundColor: 'rgba(0, 0, 0, 0.3)', color: '#00CCAA',  fontSize: 20, paddingVertical: 20, fontWeight: 'bold',  borderRadius: 10}}>TECHNICIAN</Text>
                        </TouchableOpacity>
                    </View>

                    <View style = {{paddingRight: 10}}>
                        <TouchableOpacity onPress={() => navigation.navigate('Driver')}>
                            <Image source={require('../assets/image/driver.jpg')} style = {{height: 250, position: 'relative', backgroundColor: 'black', width: 150, borderWidth: .2, borderColor:'black', borderRadius: 20  }}></Image>
                            <Text style = {{position: 'absolute', textAlign:'center', top: 90,  left: 0, right: 0,  backgroundColor: 'rgba(0, 0, 0, 0.3)', color: '#00CCAA',  fontSize: 20, paddingVertical: 20, fontWeight: 'bold',  borderRadius: 10}}>DRIVER</Text>
                        </TouchableOpacity>
                    </View>

                    <View style = {{paddingRight: 10}}>
                        <TouchableOpacity onPress={() => navigation.navigate('Plumber')}>
                            <Image source={require('../assets/image/plumber.jpg')} style = {{height: 250, position: 'relative', backgroundColor: 'black', width: 150, borderWidth: .2, borderColor:'black', borderRadius: 20  }}></Image>
                            <Text style = {{position: 'absolute', textAlign:'center', top: 90,  left: 0, right: 0, backgroundColor: 'rgba(0, 0, 0, 0.3)', color: '#00CCAA',  fontSize: 20, paddingVertical: 20, fontWeight: 'bold',  borderRadius: 10}}>PLUMBER</Text>
                        </TouchableOpacity>
                    </View>

                    <View style = {{paddingRight: 10}}>
                        <TouchableOpacity onPress={() => navigation.navigate('Maid')}>
                            <Image source={require('../assets/image/maid.jpg')} style = {{height: 250, position: 'relative', backgroundColor: 'black', width: 150, borderWidth: .2, borderColor:'black', borderRadius: 20  }}></Image>
                            <Text style = {{position: 'absolute', textAlign:'center', top: 90,  left: 0, right: 0, backgroundColor: 'rgba(0, 0, 0, 0.3)', color: '#00CCAA',  fontSize: 20, paddingVertical: 20, fontWeight: 'bold',  borderRadius: 10}}>MAID</Text>
                        </TouchableOpacity>
                    </View>

                    <View style = {{paddingRight: 10}}>
                        <TouchableOpacity onPress={() => navigation.navigate('Electrician')}>
                            <Image source={require('../assets/image/electrician.jpg')} style = {{height: 250, position: 'relative', backgroundColor: 'black', width: 150, borderWidth: .2, borderColor:'black', borderRadius: 20  }}></Image>
                            <Text style = {{position: 'absolute', textAlign:'center', top: 90,  left: 0, right: 0, backgroundColor: 'rgba(0, 0, 0, 0.3)', color: '#00CCAA',  fontSize: 20, paddingVertical: 20, fontWeight: 'bold',  borderRadius: 10}}>ELECTRICIAN</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>

            <View style = {{marginTop: 10, paddingHorizontal: 20,}}>
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
        margin:10,
        marginTop: 40,
        backgroundColor:'white',
      
    },
    heading:{
        color: '#00CCAA',    
        justifyContent: 'center',
        alignItems:'center' 
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 5,
        paddingHorizontal: 20,
        marginBottom: 20,
        alignItems: 'center',
        // Adjusted margin to bring the icons closer
        marginRight: 10,
    },
    
})
export default Home;