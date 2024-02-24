import { View, Text, StyleSheet, TouchableOpacity, Alert, Modal, Button} from "react-native";
import React, { useContext, useState, useEffect } from "react";
import moment from "moment";
import { AntDesign, FontAwesome, MaterialIcons, Feather, Ionicons} from "@expo/vector-icons";
import axios from "axios"; // Import axios
import { useNavigation } from "@react-navigation/native";
import CustomButton from "./CustomButton";
import { AuthContext } from '../context/authContext';


const PostCard = ({ posts, Account, addToFavorites, removeFromFavorites }) => {
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [post, setPost] = useState({});
  const [showApplyButton, setShowApplyButton] = useState(false); 
  const [showAuthorInfo, setShowAuthorInfo] = useState(false); // State for author information visibility
  const [state, setState] = useContext(AuthContext);
  const { user, token } = state;
  const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedPost, setSelectedPost] = useState(null);

    const toggleModal = (post) => {
        setSelectedPost(post);
        setIsModalVisible(!isModalVisible);
    };

    const handleOpenModal = (post) => {
      setSelectedPost(post);
      setIsModalVisible(true);
    };
  
    const handleCloseModal = () => {
      setSelectedPost(null);
      setIsModalVisible(false);
    };

  const navigation = useNavigation();

  // More details of the worker
  const handleView = (post) => {
    navigation.navigate("ViewProfile", { profilepost: post });
    console.log(post);
  };

  // Handle sending application
  // Modify handleApply function to include post details and navigate to Message screen
  const handleApply = async (postId, senderId, receiverId, postDetails) => {
    try {
      setLoading(true);
      if (receiverId) {
        const response = await axios.post("/hiring/send-application", {
          senderId,
          receiverId,
          postId,
          postDetails // Include post details in the request body
        });
        setLoading(false);
        Alert.alert("Success", response.data.message);
      } else {
        setLoading(false);
        Alert.alert("Error", "Failed to send application. Receiver ID not found.");
      }
    } catch (error) {
      setLoading(false);
      console.error(error);
      Alert.alert("Error", "Failed to send application. Please try again later.");
    }
  };

  //handle delete prompt
  const handleDeletePrompt = (id) => {
    Alert.alert('Attention', 'Are You Sure Want to delete this post?',
    [{
      text: 'Cancel',
      onPress: () => {console.log("cancel press");
      },
    },
    {
      text:'Delete',
      onPress: () => handleDeletePost(id),
    },
    ]);
  };
  //delete post data
  const handleDeletePost = async (id) => {
    try {
      setLoading(true)
      const {data} = await axios.delete(`/post/delete-post/${id}`)
      setLoading(false);
      alert(data?.message);
      navigation.push('Account');
    } catch (error) {
      setLoading(false)
      console.log(error)
      alert(error)
    }
  }

  return (
    <View>
      {/* Sort the posts array by creation date in descending order */}
      {posts
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .map((post, i) => (
          <View style={styles.card} key={i}>
            <View>
              {Account && (
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text style={{ textAlign: "right" }}>
                    <FontAwesome
                      name="pencil"
                      size={16}
                      color="darkblue"
                    />
                  </Text>
                  <Text style={{ textAlign: "right" }}>
                    <FontAwesome
                      name="trash"
                      size={16}
                      color="red"
                      onPress={() => handleDeletePrompt(post?._id)}
                    />
                  </Text>
                </View>
              )}
            </View>

            <TouchableOpacity onPress={() => handleOpenModal(post)}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginTop: 5,
                }}
              >
                <Text style={{ fontSize: 18, color: 'white' }} numberOfLines={1} ellipsizeMode="tail">{post?.title}</Text>
                {/* Toggle Apply button visibility */}
              </View>

              <View style={{ marginTop: 6, flexDirection: 'row', alignItems: 'center', gap: 2}}>
                <Ionicons name="location-sharp" size={20} color="#00CCAA" />
                <Text style={{ color: "#e4e4e4", fontSize: 14 }}>
                {post?.postedBy?.barangay.name}, {post?.postedBy?.city.name} {post?.postedBy?.province.name}
                </Text>
              </View>

              <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                {[...Array(5)].map((_, index) => (
                  <FontAwesome
                    key={index}
                    name={index < post?.postedBy?.rating ? 'star' : 'star-o'} // Use 'star' for filled stars and 'star-o' for outline stars
                    size={18}
                    color="yellow"
                  />
                ))}
              </View>

              <View style={{ flexDirection: "row", marginTop: 10 }}>
                <Text style={{ color: "#00CCAA", fontSize: 16 }}>
                  P{post?.minRate}.00 -{" "}
                </Text>
                <Text style={{ color: "#00CCAA", fontSize: 16 }}>
                  P{post?.maxRate}.00
                </Text>
              </View>

              <View style={{ marginTop: 20 }}>
                <Text style={{ fontSize: 14, color: "#e4e4e4" }} numberOfLines={1} ellipsizeMode="tail">{post?.description} </Text>
                <Text style={{ borderBottomWidth: 0.5 }}></Text>
              </View>

              <View
                style={{
                  marginTop: 14,
                  alignItems:'flex-start'
                }}
              >
                <View style={{flexDirection: 'row', alignItems: 'center', gap: 2}}>
                  <AntDesign name="clockcircleo" size={18} color="#00CCAA" />
                  <Text style={{ color: "#e4e4e4", fontSize: 13, textAlign: "right" }}>
                    {" "}
                    Posted{" "}
                    {moment(post?.createdAt).fromNow()} {/* Display relative time */}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>

          </View>
        ))}
      <Modal
  animationType="fade"
  transparent={true}
  visible={isModalVisible}
  onRequestClose={handleCloseModal}
>
<TouchableOpacity
    activeOpacity={1}
    onPress={handleCloseModal} // Close modal when background is pressed
    style={styles.modalContainer}
  >
  <View>
    <View style={[styles.modalContent, { zIndex: 10 }]}>
      {/* Post title */}
      <Text style={{marginTop: 16, fontSize: 14}}>Posted by: {selectedPost?.postedBy.firstName} {selectedPost?.postedBy.lastName}</Text>
      <Text style={{fontSize: 18, marginTop: 24}}>{selectedPost?.title}</Text>
      
      {/* Author information */}
      <View style={styles.authorInfoContainer}>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4}}>
                {[...Array(5)].map((_, index) => (
                  <FontAwesome
                    key={index}
                    name={index < selectedPost?.postedBy?.rating ? 'star' : 'star-o'} // Use 'star' for filled stars and 'star-o' for outline stars
                    size={18}
                    color="yellow"
                  />
                ))}
        </View>
        <Text style={{fontSize: 14, marginTop: 10, color: '#939393'}}>
          Location: {selectedPost?.postedBy?.location}
        </Text>
      </View>
      
      {/* Rate */}
      <Text style={{fontSize: 14, marginTop: 4, color: '#939393'}}>
        P{selectedPost?.minRate}.00 - P{selectedPost?.maxRate}.00
      </Text>
      
      {/* Description */}
      <Text style={{marginTop: 16}}>{selectedPost?.description}</Text>
      
      <View style={{flexDirection: 'row', justifyContent: 'center'}}>
        <View style={{ backgroundColor: '#343434', borderRadius: 8, overflow: 'hidden', width: 200, padding: 4, marginTop: 30,  }}>
          <Button
            title="Apply"
            color="#00CCAA"
            style={{ paddingHorizontal: 20 }}
          />
        </View>               
      </View>




      {/* Close button
      <TouchableOpacity onPress={handleCloseModal} style={styles.closeButton}>
        <Text style={styles.closeButtonText}>Close Modal</Text>
      </TouchableOpacity> */}
    </View>
  </View>
  </TouchableOpacity>
</Modal>

    </View>
  );
};


const styles = StyleSheet.create({
  heading: {
    color: "#00CCAA",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    width: "100%",
    backgroundColor: "#343434",
    padding: 20,
    borderRadius: 5,
    marginBottom: 10,
    marginVertical: 10,
    height: 240,
  },
  modalContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
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
    maxHeight: 500, // Maximum height of the modal content
    overflow: 'auto', // Enable scrolling if content exceeds maxHeight
  },
});

export default PostCard;
