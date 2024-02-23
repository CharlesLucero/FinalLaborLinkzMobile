import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import React, { useContext, useState, useEffect } from "react";
import moment from "moment";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import axios from "axios"; // Import axios
import { useNavigation } from "@react-navigation/native";
import EditModal from "./EditModal";
import { AuthContext } from '../context/authContext';
import Home from "../screens/Home";

const PostCard = ({ posts, Account, addToFavorites, removeFromFavorites }) => {
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [post, setPost] = useState({});
  const [showApplyButton, setShowApplyButton] = useState(false); 
  const [showAuthorInfo, setShowAuthorInfo] = useState(false); // State for author information visibility
  const [state, setState] = useContext(AuthContext);
  const { user, token } = state;

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
      {Account && (
        <EditModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          post={post}
        />
      )}
      {/* Sort the posts array by creation date in descending order */}
      {posts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).map((post, i) => (
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
                    onPress={() => {
                      setPost(post), setModalVisible(true);
                    }}
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

          <TouchableOpacity onPress={() => handleView(post)}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 5,
              }}
            >
              <Text style={{ fontSize: 15 }}>Client Request: {post?.title} </Text>
              {/* Toggle Apply button visibility */}
            </View>

            <View style={{ marginTop: 20 }}>
              <Text style={{ color: "gray", fontSize: 13 }}>
                Location: {post?.postedBy?.location}{" "}
              </Text>
            </View>

            <View style={{ marginTop: 20 }}>
              <Text style={{ color: "gray", fontSize: 13 }}>
                Ratings: {post?.postedBy?.rating}{" "}
              </Text>
            </View>

            <View style={{ flexDirection: "row" }}>
              <Text style={{ color: "gray", fontSize: 13 }}>
                Rate: P{post?.minRate}.00 -{" "}
              </Text>
              <Text style={{ color: "gray", fontSize: 13 }}>
                P{post?.maxRate}.00
              </Text>
            </View>

            <View style={{ marginTop: 20 }}>
              <Text style={{ fontSize: 14 }}>Description: {post?.description} </Text>
              <Text style={{ borderBottomWidth: 0.5 }}></Text>
            </View>

            <View
              style={{
                marginTop: 10,
                alignItems:'flex-end'
              }}
            >
              <Text style={{ color: "gray", fontSize: 13, textAlign: "right" }}>
                {" "}
                <AntDesign name="clockcircleo" size={14} color="#00CCAA" /> Posted{" "}
                {moment(post?.createdAt).fromNow()} {/* Display relative time */}
              </Text>
            </View>

            {!Account && ( // Hide Apply button and toggle arrow for the user who posted the job
              <View style = {{ alignItems:'flex-end', paddingTop: 10}}>
                <TouchableOpacity
                  onPress={() => setShowApplyButton(!showApplyButton)}
                >
                  <AntDesign
                    name={showApplyButton ? "down" : "right"}
                    size={20}
                    color="black"
                  />
                </TouchableOpacity>
              </View>
            )}

       
            

            {showApplyButton && !Account && ( // Hide Apply button for the user who posted the job
              <View style={{ marginTop: 10 }}>
                {post?.postedBy?.firstName && (
                  <Text>
                    <FontAwesome name="user" size={16} color="#00CCAA" /> Posted By:{""}
                    {post?.postedBy?.firstName} {post?.postedBy?.lastName}
                  </Text>
                )}
              </View>
            )}

            {showApplyButton && !Account && ( // Hide Apply button for the user who posted the job
              <TouchableOpacity
                style={{
                  marginTop: 10,
                  backgroundColor: "#00CCAA",
                  paddingVertical: 5,
                  paddingHorizontal: 10,
                  borderRadius: 5,
                }}
                onPress={() => handleApply(post?._id, user?._id, post?.postedBy?._id)} // Pass the post ID and receiver ID to handleApply
              >
                <Text style={{ color: "white", textAlign: "center" }}>Apply</Text>
              </TouchableOpacity>
            )}
          </TouchableOpacity>
        </View>
      ))}
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
    backgroundColor: "#F6F6F6",
    borderWidth: 0.2,
    borderColor: "gray",
    padding: 20,
    borderRadius: 5,
    marginBottom: 10,
    marginVertical: 10,
  },
});

export default PostCard;
