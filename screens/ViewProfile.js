import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  Alert,
  SafeAreaView,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import {
  AntDesign,
  MaterialCommunityIcons,
  Entypo,
  MaterialIcons,
  Octicons,
  FontAwesome5,
  Feather,
} from "@expo/vector-icons";
import axios from "axios";
import { useAuth } from "../context/FavContext";
import moment from "moment";
import { Modal } from "react-native";
import { useFonts } from "expo-font";

const ViewProfile = ({ route, navigation }) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addToFavorites, favorites } = useAuth();
  const [isFavorite, setIsFavorite] = useState(false);
  const { profilepost } = route.params;
  const [violation, setViolation] = useState("");
  const [description, setDescription] = useState("");
  const [reportModalVisible, setReportModalVisible] = useState(false);
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId =
          route.params?.profilepost?.postedBy?._id ||
          route.params?.profileData?.createdBy?._id;
  
        if (userId) {
          const response = await axios.get(
            `/viewprofile/users/${userId}/profile`
          );
          setUserData(response.data);
          setLoading(false);
  
          // Check if the user is in favorites when the component mounts
          const isInFavorites = favorites.some(
            (favorite) => favorite.profilepost.postedBy._id === userId
          );
          setIsFavorite(isInFavorites);
        } else {
          console.log("User ID not found in route parameters.");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
  
    fetchUserData();
  }, [favorites, route.params]);

  const addToFavoritesHandler = async () => {
    if (isFavorite) {
      // If the user is already in favorites, do nothing
      Alert.alert('Already in Favorites', 'This user is already in your favorites.');
    } else {
      addToFavorites(userData, profilepost);
      try {
        // Make a POST request to your backend API to add the user to favorites
        await axios.post('/favorites/add', {
          senderId: userData.userInfo._id, // Assuming this is the ID of the current user
          receiverId: profilepost.postedBy._id, // Assuming this is the ID of the user whose profile is being viewed
        });
        
        // If the request is successful, update the local state and show a success message
        setIsFavorite(true);
      } catch (error) {
        console.error('Error adding to favorites:', error);
        // Show an error message if something goes wrong
        Alert.alert('Error', 'Failed to add user to favorites. Please try again later.');
      }
    }
  };
  const navigateToChat = () => {
    const dataToSend = { userData, profilepost };

    navigation.navigate("Chat", {
      data: dataToSend,
    });
  };

  const showReportModal = () => {
    setReportModalVisible(true);
  };

  const hideReportModal = () => {
    setReportModalVisible(false);
  };

  const reportUserHandler = async () => {
    // Check if violation and description are not empty
    if (!violation.trim() || !description.trim()) {
      // Display a warning alert if any field is empty
      Alert.alert(
        "Warning",
        "Please fill in all fields before submitting the report."
      );
      return;
    }

    // Clear input fields
    setViolation("");
    setDescription("");

    const reportedUserId = `${userData?.userInfo?._id || ""}-${userData?._id || ""}`;

    try {
      await axios.post("/report/report-user", {
        reportedUserId,
        violation,
        description,
      });

      // Display a simple success alert
      Alert.alert("Success", "Report submitted successfully", [
        {
          text: "OK",
          onPress: () => {
            // Hide the report modal
            hideReportModal();
          },
        },
      ]);
    } catch (error) {
      // Handle error
      console.error("Error submitting report", error);
    }
  };

  return (
    <SafeAreaView style={{ backgroundColor: "#FFFFFF" }}>
      <ScrollView>
        <View style={{ marginTop: 30, paddingHorizontal: 20 }}>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <TouchableOpacity onPress={() => navigation.navigate("Home")}>
              <Entypo name="chevron-left" size={32} color="#A9A9A9" />
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 20,
                marginTop: 10,
              }}
              onPress={showReportModal}
            >
              <MaterialIcons name="report" size={32} color="black" />
            </TouchableOpacity>
          </View>

          <View style={{ marginTop: 20, alignSelf: "center" }}>
            <Image
              source={{
                uri: "https://www.pngall.com/wp-content/uploads/5/Profile-Transparent.png",
              }}
              style={{
                height: 120,
                width: 120,
                borderRadius: 100,
                borderWidth: 5,
                borderColor: "black",
              }}
            ></Image>
          </View>

          <View style={{ alignSelf: "center" }}>
            {userData && (
              <View>
                <View style={styles.nameContainer}>
                  <Text style={styles.completeName}>
                    {userData.userInfo.firstName} {userData.userInfo.lastName}
                  </Text>
                </View>
                <Text style={styles.infoText}>
                  {userData.userAdditionalInfo.job}
                </Text>
                <Text style={styles.infoText}>
                  {userData.userAdditionalInfo.age} years old
                </Text>
              </View>
            )}
          </View>

          <View
            style={{
              flexDirection: "row",
              gap: 20,
              height: 50,
              paddingHorizontal: 50,
              marginTop: 20,
            }}
          >
            <TouchableOpacity
              style={{
                backgroundColor: "#343434",
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 20,
              }}
              onPress={addToFavoritesHandler}
            >
              {isFavorite ? (
                <AntDesign name="heart" size={32} color="#00CCAA" />
              ) : (
                <AntDesign name="hearto" size={32} color="#00CCAA" />
              )}
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                backgroundColor: "#343434",
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 20,
              }}
              onPress={() => navigation.navigate("Message")}
            >
              <MaterialCommunityIcons name="chat" size={32} color="#00CCAA" />
            </TouchableOpacity>
          </View>
          <Text style={styles.user}>User Information</Text>
          <View>
            {userData && (
              <View style={styles.userInfoContainer}>
                <View style={styles.userContent}>
                  <Feather name="file-text" size={24} color="#00CCAA" />
                  <Text style={styles.userText}>
                    Bio: {userData.userAdditionalInfo.bio}
                  </Text>
                </View>
                <View style={styles.userContent}>
                  <Feather name="smartphone" size={24} color="#00CCAA" />
                  <Text style={styles.userText}>
                    {userData.userInfo.contactNumber}
                  </Text>
                </View>
                <View style={styles.userContent}>
                  <Feather name="users" size={24} color="#00CCAA" />
                  <Text style={styles.userText}>
                    {" "}
                    {userData.userInfo.gender}
                  </Text>
                </View>
                <View style={styles.userContent}>
                  <Feather name="map-pin" size={24} color="#00CCAA" />
                  <Text style={styles.userText}>
                    {" "}
                    {userData.userInfo.location}
                  </Text>
                </View>
                <View style={styles.userContent}>
                  <Feather name="at-sign" size={24} color="#00CCAA" />
                  <Text style={styles.userText}>
                    {" "}
                    {userData.userInfo.email}
                  </Text>
                </View>
              </View>
            )}
          </View>
          <Text style={styles.user}>User Posts</Text>
          <View>
            {userData &&
              userData.userPosts
                ?.slice()
                .reverse()
                .map((post, i) => (
                  <View key={post._id} style={styles.card}>
                    <View style={{ flexDirection: "row", paddingVertical: 10 }}>
                      <Text style={styles.title}>{post.title}</Text>
                    </View>
                    <Text style={styles.rate}>
                      Rate: {post.minRate} - {post.maxRate}
                    </Text>
                    <Text style={styles.rate}>
                      Location: {profilepost?.postedBy?.location}{" "}
                    </Text>
                    <Text style={styles.description}>{post.description}</Text>
                    <View>
                      <Text
                        style={{
                          color: "gray",
                          marginTop: 15,
                          fontSize: 13,
                          textAlign: "right",
                        }}
                      >
                        {""}
                        <AntDesign
                          name="clockcircleo"
                          size={14}
                          color="#00CCAA"
                        />{" "}
                        Posted{" "}
                        {moment(post.createdAt).format("DD:MM:YYYY || HH:mm")}{" "}
                      </Text>
                    </View>
                  </View>
                ))}
          </View>

          <Modal
            animationType="slide"
            transparent={true}
            visible={reportModalVisible}
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Report User</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Violation"
                  value={violation}
                  onChangeText={(text) => setViolation(text)}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Description"
                  value={description}
                  onChangeText={(text) => setDescription(text)}
                  multiline
                />
                <TouchableOpacity
                  style={styles.reportButton}
                  onPress={reportUserHandler}
                >
                  <Text style={{ color: "#fff" }}>Submit Report</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={hideReportModal}
                >
                  <Text style={{ color: "#000" }}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  nameContainer: {
    flexDirection: "row",
  },
  completeName: {
    color: "#00CCAA",
    fontSize: 32,
    fontWeight: "600",
  },
  infoText: {
    fontSize: 18,
    alignSelf: "center",
    marginLeft: 6,
    fontWeight: "500",
  },
  user: {
    fontSize: 17,
    fontWeight: "800",
    color: "#00CCAA",
    marginTop: 20,
    marginLeft: 7,
  },
  userInfoContainer: {
    marginTop: 20,
    backgroundColor: "#F6F6F6",
    padding: 20,
    borderRadius: 5,
  },
  userContent: {
    flexDirection: "row",
    margin: 7,
  },
  userText: {
    fontSize: 15,
    alignSelf: "center",
    marginLeft: 6,
  },
  card: {
    width: "100%",
    backgroundColor: "#F6F6F6",
    borderWidth: 0.2,
    borderColor: "gray",
    padding: 20,
    borderRadius: 5,
    marginBottom: 10,
    marginVertical: 5,
  },
  info: {
    fontSize: 17,
  },
  title: {
    fontSize: 16,
    color: "#262626",
  },
  rate: {
    fontSize: 12,
    color: "#939393",
  },
  description: {
    fontSize: 13,
    color: "#000000",
    marginTop: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    justifyContent: "center",
    borderRadius: 10,
    elevation: 5,
    width: "80%",
    height: "45%",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    borderBottomWidth: 1,
    marginBottom: 10,
  },
  reportButton: {
    backgroundColor: "#343434",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    padding: 10,
    marginTop: 10,
  },
  cancelButton: {
    backgroundColor: "#eee",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    padding: 10,
    marginTop: 10,
  },
});

export default ViewProfile;