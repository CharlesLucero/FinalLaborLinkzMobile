import React, { useState, useContext, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  TextInput,
  FlatList,
  StyleSheet,
  SafeAreaView,
  Modal,
} from "react-native";
import axios from "axios";
import { useNavigation, useRoute } from "@react-navigation/native";
import { AuthContext } from "../context/authContext";
import { FontAwesome, Feather, Entypo, AntDesign } from "@expo/vector-icons";
import { Dropdown } from "react-native-element-dropdown";
const Process = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { application } = route.params;

  const [state, setState] = useContext(AuthContext);
  const [message, setMessage] = useState("");
  const [chats, setChats] = useState([]);
  const [buttonsVisible, setButtonsVisible] = useState(true);
  const [reportModalVisible, setReportModalVisible] = useState(false);
  const [violation, setViolation] = useState(null);
  const [description, setDescription] = useState("");
  const [ratingModal, setRatingModal] = useState(false);
  const [ratingModalVisible, setRatingModalVisible] = useState(false);
  const [starRating, setStarRating] = useState(0);
  const [loading, setLoading] = useState(false);
  const [isFocus, setIsFocus] = useState(false);
  const data = [
    { label: "Spam", violation: "Spam" },
    { label: "Scam", violation: "Scam" },
    { label: "Fake User", violation: "Fake User" },
    { label: "Trolling", violation: "Trolling" },
    { label: "Others ", violation: "Others" },
  ];

  useEffect(() => {
    fetchChats();
  }, []);

  const fetchChats = async () => {
    try {
      const response = await axios.get(`/chats/${state.user._id}`, {
        headers: {
          Authorization: `Bearer ${state.token}`,
        },
      });
      setChats(response.data.chats);
      console.log(response.data.chats);
    } catch (error) {
      console.error("Error fetching chats:", error);
      Alert.alert("Error", "Failed to fetch chats. Please try again later.");
    }
  };

  const handleStarPress = (rating) => {
    // Toggle the selected star rating
    if (starRating === rating) {
      // If the same star is clicked again, unselect it (set rating to 0)
      setStarRating(0);
    } else {
      // Otherwise, select the clicked star
      setStarRating(rating);
    }
  };

  const handleSubmitRating = async () => {
    try {
      const response = await axios.post("/auth/ratings", {
        userId: application.senderId._id, // Assuming application.senderId._id contains the user's ID
        rating: starRating,
      });

      console.log("Rating submitted successfully:", response.data);
      setStarRating(0);
      setRatingModalVisible(false);
    } catch (error) {
      console.error("Error handling rating:", error);
      Alert.alert("Error", "Failed to handle rating. Please try again later.");
    }
  };

  const handleAccept = async () => {
    try {
      const response = await axios.put(
        `/hiring/accept-application/${application._id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${state.token}`,
          },
        }
      );
      Alert.alert("Success", response.data.message);
      setButtonsVisible(false);
    } catch (error) {
      console.error("Error accepting application:", error);
      Alert.alert(
        "Error",
        "Failed to accept application. Please try again later."
      );
    }
  };

  const handleDecline = async () => {
    try {
      const response = await axios.put(
        `/hiring/decline-application/${application._id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${state.token}`,
          },
        }
      );
      Alert.alert("Success", "Sucessfully Declined the Application");
      setButtonsVisible(false);
    } catch (error) {
      console.error("Error declining application:", error);
      Alert.alert(
        "Error",
        "Failed to decline application. Please try again later."
      );
    }
  };

  const handleDone = () => {
    setRatingModal(true);
  };

  const showReportModal = () => {
    setReportModalVisible(true);
  };

  const hideReportModal = () => {
    setReportModalVisible(false);
  };

  const reportUserHandler = async () => {
    if (!violation.trim() || !description.trim()) {
      Alert.alert(
        "Warning",
        "Please fill in all fields before submitting the report."
      );
      return;
    }

    setViolation("");
    setDescription("");

    const reportedUserId = application.senderId._id;
    const reportedBy = state.user._id;

    try {
      await axios.post("/report/report-user", {
        reportedUserId,
        reportedBy,
        violation,
        description,
      });

      Alert.alert("Success", "Report submitted successfully", [
        {
          text: "OK",
          onPress: () => {
            hideReportModal();
          },
        },
      ]);
    } catch (error) {
      console.error("Error submitting report", error);
    }
  };

  const handleMessageSend = async () => {
    try {
      const response = await axios.post("/chats/send", {
        senderId: state.user._id,
        receiverId: application.senderId._id,
        message: message,
      });

      console.log("Message sent successfully:", response.data);
      setMessage("");
      Alert.alert("Success", "Message sent successfully");
      fetchChats();
    } catch (error) {
      console.error("Error sending message:", error);
      Alert.alert("Error", "Failed to send message. Please try again later.");
    }
  };
  
  const renderLabel = () => {
    return data.map((item, index) => (
      <TouchableOpacity
        key={index}
        onPress={() => setViolation(item.violation)}
      >
        <Text>{item.label}</Text>
      </TouchableOpacity>
    ));
  };


  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TouchableOpacity onPress={() => navigation.navigate("Home")}>
        <Entypo name="chevron-left" size={32} color="#A9A9A9" />
      </TouchableOpacity>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <View style={styles.headerInfo}>
            <FontAwesome
              name="user"
              size={50}
              color="#00CCAA"
              style={{ marginRight: 5, marginLeft: 5 }}
            />
            <Text
              style={styles.name}
            >{`${application.senderId.firstName} ${application.senderId.lastName}`}</Text>
            <Text style={styles.active}>{`Status: ${application.status}`}</Text>
            <Text
              style={styles.name}
            >{`${application.receiverId.firstName} ${application.receiverId.lastName}`}</Text>
            <Text style={styles.active}>{`Status: ${application.status}`}</Text>
          </View>
        </View>
      </View>
      <FlatList
        data={chats}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View>
            <Text>{`${item.senderId.firstName}: ${item.message}`}</Text>
          </View>
        )}
      />
      {buttonsVisible ? (
        <View style={styles.actionContainer}>
          <TouchableOpacity onPress={handleAccept} style={styles.actionButton}>
            <Text style={styles.actionText}>Accept</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleDecline} style={styles.actionButton}>
            <Text style={styles.actionText}>Decline</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.actionContainer}>
          <TouchableOpacity onPress={handleDone} style={styles.actionButton}>
            <Text style={styles.actionText}>Done</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={showReportModal}
            style={styles.actionButton}
          >
            <Text style={styles.actionText}>Report</Text>
          </TouchableOpacity>
        </View>
      )}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          onChangeText={setMessage}
          value={message}
          placeholder="Type your message here"
        />
        <TouchableOpacity onPress={handleMessageSend} style={styles.buttonSend}>
          <Text style={styles.textButton}>Send</Text>
        </TouchableOpacity>
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
              style={styles.violationInput}
              placeholder="Violation"
              placeholderTextColor="#000000"
              value={violation}
              onChangeText={(text) => setViolation(text)}
            />

            {renderLabel()}
            <Dropdown
              style={[styles.dropdown, isFocus && { borderColor: "blue" }]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={data}
              search
              maxHeight={300}
              labelField="label"
              valueField="violation"
              placeholder={!isFocus ? "Violation" : "..."}
              searchPlaceholder="Search..."
              value={violation}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={(item) => {
                setViolation(item.violation);
                setIsFocus(false);
              }}
              renderLeftIcon={() => (
                <AntDesign
                  style={styles.icon}
                  color={isFocus ? "blue" : "black"}
                  name="Safety"
                  size={20}
                />
              )}
            />
            <TextInput
              style={styles.DescriptionInput}
              placeholder="Description"
              placeholderTextColor="#000000"
              value={description}
              onChangeText={(text) => setDescription(text)}
              multiline
            />

            <TouchableOpacity
              style={styles.reportButton}
              onPress={reportUserHandler}
            >
              <Text
                style={{
                  color: "#FFFFFF",
                  fontWeight: "700",
                  alignSelf: "center",
                }}
              >
                Submit Report
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={hideReportModal}
            >
              <Text
                style={{
                  color: "#000000",
                  fontWeight: "700",
                  alignSelf: "center",
                }}
              >
                Cancel
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal animationType="slide" transparent={true} visible={ratingModal}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Ratings</Text>

            <View style={{ flexDirection: "row" }}>
              {[1, 2, 3, 4, 5].map((rating) => (
                <TouchableOpacity
                  key={rating}
                  onPress={() => handleStarPress(rating)}
                >
                  {rating <= starRating ? (
                    <FontAwesome name="star" size={24} color="black" />
                  ) : (
                    <Feather name="star" size={24} color="yellow" />
                  )}
                </TouchableOpacity>
              ))}
            </View>

            <TouchableOpacity
              style={styles.reportButton}
              onPress={handleSubmitRating}
            >
              <Text
                style={{
                  color: "#FFFFFF",
                  fontWeight: "700",
                  alignSelf: "center",
                }}
              >
                Submit
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    backgroundColor: "#FFFFFF",
    height: 150,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    marginBottom: 10,
    bottom: 50,
  },
  headerInfo: {
    top: 40,
    marginTop: 10,
    padding: 16,
    flexDirection: "row",
    marginLeft: 5,
  },
  name: {
    marginTop: 2,
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 5,
    marginLeft: 10,
  },
  active: {
    fontSize: 12,
    marginTop: 0,
    color: "#00CCAA",
    position: "absolute",
    marginLeft: 15,
    top: 50,
    left: 60,
  },
  actionContainer: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  actionButton: {
    padding: 15,
    borderRadius: 4,
    backgroundColor: "#FFFFFF",
    marginRight: 10,
    borderRadius: 15,
  },
  actionText: {
    color: "#00CCAA",
    fontSize: 16,
  },
  inputContainer: {
    backgroundColor: "#FFFFFF",
    height: 90,
    flexDirection: "row",
    top: 30,
  },
  input: {
    height: 50,
    width: "70%",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 10,
    marginHorizontal: 8,
    marginTop: 15,
    marginLeft: 15,
    borderRadius: 40,
  },
  buttonSend: {
    width: "20%",
    height: 50,
    backgroundColor: "#00CCAA",
    borderRadius: 40,
    marginTop: 15,
  },
  textButton: {
    alignSelf: "center",
    fontSize: 18,
    fontWeight: "500",
    marginTop: 12,
    color: "#FFFFFF",
  },
  modalContainer: {
    backgroundColor: "#FFFFFF",
    top: "25%",
    margin: 15,
    borderRadius: 17,
    height: "40%",
  },
  modalContent: {
    padding: 30,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "700",
    paddingTop: 10,
  },
  violationInput: {
    borderColor: "#000000",
    borderWidth: 1,
    borderRadius: 5,
    height: "10%",
    marginTop: 20,
    fontSize: 12,
  },
  DescriptionInput: {
    borderColor: "#000000",
    borderWidth: 1,
    borderRadius: 5,
    height: "35%",
    marginTop: 10,
    fontSize: 12,
    color: "#000000",
  },
  reportButton: {
    padding: 15,
    borderRadius: 4,
    backgroundColor: "#000000",
    marginRight: 10,
    borderRadius: 15,
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 5,
  },
  cancelButton: {
    padding: 15,
    borderRadius: 4,
    backgroundColor: "#C8C8C8",
    marginRight: 10,
    borderRadius: 15,
    marginLeft: 5,
  },
});

export default Process;
