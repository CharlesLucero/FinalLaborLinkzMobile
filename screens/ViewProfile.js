import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Image,
  Alert
} from "react-native";
import { AntDesign, MaterialCommunityIcons ,  Feather, MaterialIcons, Entypo } from "@expo/vector-icons";
import axios from "axios";
import moment from "moment";
import { Modal } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { TextInput } from "react-native-paper";
import { AuthContext } from "../context/authContext"; 
import { host } from "../APIRoutes";


const ViewProfile = ({ route, navigation }) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [violation, setViolation] = useState("");
  const { profilepost } = route.params;
  const [description, setDescription] = useState("");
  const [reportModalVisible, setReportModalVisible] = useState(false);
  const [showPicker, setShowPicker] = useState(false);
  const [state, setState] = useContext(AuthContext);
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
        } else {
          console.log("User ID not found in route parameters.");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [route.params]);

  const togglePicker = () => {
    setShowPicker(!showPicker);
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

    const reportedUserId = `${userData?.userInfo?._id || ""}`;

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

  const addFavorite = async () => {
    try {
      const senderId = 'YOUR_USER_ID'; // Replace 'YOUR_USER_ID' with the actual sender's ID
      const receiverId = userData.userInfo._id; // Assuming userData is populated
      await axios.post("/favorite/add", { senderId, receiverId });
      
      // Display a success message or perform any other action upon successful addition
      Alert.alert("Success", "User added to favorites successfully");
    } catch (error) {
      console.error("Error adding user to favorites", error);
      // Display an error message or handle the error in an appropriate way
      Alert.alert("Error", "Failed to add user to favorites");
    }
  };

  const violationOptions = [
    "Spam",
    "Scam",
    "Fake User",
    "Trolling",
    "Others (please specify)",
  ];

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
                uri: host+userData?.userInfo?.image,
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
              onPress={addFavorite} // Add onPress handler to call addFavorite function
            >
              <AntDesign name="hearto" size={32} color="#00CCAA" />
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
                    {userData?.userInfo?.barangay?.name},{" "}
                    {userData?.userInfo?.city?.name}{" "}
                    {userData?.userInfo?.province?.name}
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
                      Location: {" "}
                    {userData?.userInfo?.barangay?.name},{" "}
                    {userData?.userInfo?.city?.name}{" "}
                    {userData?.userInfo?.province?.name}
                    </Text>
                    <View style={styles.descriptionContainer}>
                    <Text style={styles.description}>{post.description}</Text>
                    </View>
                    <View>
                      <Text
                        style={{
                          color: "#FFFFFF",
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
            animationType="fade"
            transparent={true}
            visible={reportModalVisible}
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Report User</Text>
                <TouchableOpacity
                  onPress={togglePicker}
                  style={styles.violationInput}
                >
                  <Text>{violation || "Select Violation"}</Text>
                  <Feather name="chevron-down" size={24} color="black" />
                </TouchableOpacity>
                {showPicker && (
                  <Picker
                    selectedValue={violation}
                    onValueChange={(itemValue, itemIndex) => {
                      setViolation(itemValue);
                      togglePicker(); // Hide picker after selection
                    }}
                    style={{ width: "100%" }}
                    itemStyle={{ fontSize: 12, height: 50 }} // Adjust font size and height of dropdown item
                  >
                    {violationOptions.map((option, index) => (
                      <Picker.Item label={option} value={option} key={index} />
                    ))}
                  </Picker>
                )}
                <TextInput
                  mode="outlined"
                  label="Description"
                  placeholder="Type something"
                  right={<TextInput.Affix text="/100" />}
                  style={styles.DescriptionInput}
                  value={description}
                  onChangeText={(text) => setDescription(text)}
                />
                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    style={styles.reportButton}
                    onPress={reportUserHandler}
                  >
                    <Text style={{ color: "#FFFFFF", fontWeight: "700" }}>
                      Submit
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.cancelButton}
                    onPress={hideReportModal}
                  >
                    <Text style={{ color: "#000000", fontWeight: "700" }}>
                      Cancel
                    </Text>
                  </TouchableOpacity>
                </View>
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
    backgroundColor: "#343434",
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
    color: "#FFFFFF",
  },
  card: {
    width: "100%",
    backgroundColor: "#343434",
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
    color: "#FFFFFF"
  },
  rate: {
    fontSize: 12,
    color: "#00CCAA",
  },
  descriptionContainer: {
    textDecorationLine: "underline",
    borderBottomWidth: 1,
  },
  description: {
    fontSize: 13,
    color: "#FFFFFF",
    marginTop: 10,
    marginBottom: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#ffffff",
    padding: 20,
    borderRadius: 10,
    width: "80%",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  violationInput: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  DescriptionInput: {
    fontSize: 12,
    backgroundColor: "#FFFFFF",
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 10,
    minHeight: 100, // Adjust the height if needed
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  reportButton: {
    padding: 15,
    backgroundColor: "#00CCAA",
    marginRight: 10,
    borderRadius: 15,
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 5,
    flex: 1,
    alignItems: "center",
  },
  cancelButton: {
    padding: 15,
    backgroundColor: "#C8C8C8",
    marginRight: 10,
    borderRadius: 15,
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 5,
    flex: 1,
    alignItems: "center",
  },
});

export default ViewProfile;
