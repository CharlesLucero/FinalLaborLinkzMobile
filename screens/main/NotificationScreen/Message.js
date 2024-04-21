import React, { useContext, useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Alert,
  StyleSheet,
  SafeAreaView,
  RefreshControl,
  Modal,
  TouchableHighlight,
  Button,
  Image,
} from "react-native";
import axios from "axios";
import { AuthContext } from "../../../context/authContext";
import moment from "moment";
import { useNavigation } from "@react-navigation/native";
import FooterMenu from "../../../components/Menus/FooterMenu";
import { Feather, FontAwesome } from "@expo/vector-icons";
import { Dropdown } from "react-native-element-dropdown";
import { Picker } from "@react-native-picker/picker";
import { TextInput } from "react-native-paper";
import { AirbnbRating } from "react-native-ratings";
import { host } from "../../../APIRoutes";

const Message = () => {
  const [state, setState] = useContext(AuthContext);
  const { token, user } = state;
  const [receivedApplications, setReceivedApplications] = useState([]);
  const [sentApplications, setSentApplications] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalText, setModalText] = useState("");
  const [modalName, setModalName] = useState("");
  const [modalTime, setModalTime] = useState("");
  const [modalDate, setModalDate] = useState("");
  const [starRating, setStarRating] = useState(0);
  const navigation = useNavigation();
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [acceptDone, setAcceptDone] = useState(false);
  const [declineDone, setDeclineDone] = useState(false);
  const [reportModalVisible, setReportModalVisible] = useState(false);
  const [showPicker, setShowPicker] = useState(false);
  const [violation, setViolation] = useState(null);
  const [description, setDescription] = useState("");
  //Submit Modal
  const [showOngoingWorkModal, setShowOngoingWorkModal] = useState(false);
  const [showDoneModal, setShowDoneModal] = useState(false);
  const [rating, setRating] = useState(0);
  // const [data, setData] = useState([]);
  const [isFocus, setIsFocus] = useState(false);

  useEffect(() => {
    fetchApplications();
  }, []);

  const togglePicker = () => {
    setShowPicker(!showPicker);
  };

  const toggleOngoingWorkModal = () => {
    setShowOngoingWorkModal(!showOngoingWorkModal);
  };

  //Submit Modal
  const toggleDoneModal = () => {
    setShowDoneModal(!showDoneModal);
  };

  const closeModal = () => {
    setModalVisible(false);
    setShowDoneModal(false);
    setReportModalVisible(false);
  };

  const fetchApplications = async () => {
    try {
      const receivedResponse = await axios.get(
        `/hiring/received-applications/${user._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setReceivedApplications(receivedResponse.data.data);

      const sentResponse = await axios.get(
        `/hiring/sent-applications/${user._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSentApplications(sentResponse.data.data);
    } catch (error) {
      console.error("Error fetching applications:", error);
      Alert.alert("Error", "Failed to fetch applications.");
    } finally {
      setRefreshing(false);
    }
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

    const reportedUserId = selectedApplication?.senderId?._id;
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

  const violationOptions = [
    "Spam",
    "Scam",
    "Fake User",
    "Trolling",
    "Others (please specify)",
  ];

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
  //May bagong nadagdag dito
  // 
  
  const handleAccept = async () => {
    Alert.alert(
      "Attention",
      `Are you sure you want to accept ${selectedApplication.senderId.firstName} ${selectedApplication.senderId.lastName}?`,
      [
        {   
          text: "Cancel",
          onPress: () => console.log("Accept canceled"),
          style: "cancel"
        },
        {
          text: "Accept",
          onPress: async () => {
            try {
              const response = await axios.put(
                `/hiring/accept-application/${selectedApplication._id}`,
                {},
                {
                  headers: {
                    Authorization: `Bearer ${state.token}`,
                  },
                }
              );
              Alert.alert("Success", response.data.message);
              setModalVisible(false);
              setAcceptDone(true);
              setModalName("");
              setModalTime("");
              setModalDate("");
              toggleOngoingWorkModal(); // Close ongoing work modal
              setShowDoneModal(true); // Display new modal
              fetchApplications(); // Refresh applications after accepting
  
              // Close "Done" modal
              setShowOngoingWorkModal(false);
            } catch (error) {
              console.error("Error accepting application:", error);
              Alert.alert(
                "Error",
                "Failed to accept application. Please try again later."
              );
            }
          }
        }
      ],
      { cancelable: false }
    );
  };


  const handleDecline = async () => {
    try {
      const response = await axios.put(
        `/hiring/decline-application/${selectedApplication._id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${state.token}`,
          },
        }
      );
      Alert.alert("Success", "Successfully Declined the Application");
      setModalVisible(false);
      setDeclineDone(true);
      setModalName("");
      setModalTime("");
      setModalDate("");
      fetchApplications(); // Refresh applications after declining
    } catch (error) {
      console.error("Error declining application:", error);
      Alert.alert(
        "Error",
        "Failed to decline application. Please try again later."
      );
    }
  };

  const handleDone = async () => {
    try {
      const response = await axios.put(
        `/hiring/done-application/${selectedApplication._id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${state.token}`,
          },
        }
      );
      Alert.alert("Success", "Successfully Done the Application");
      setShowDoneModal(true);
    } catch (error) {
      console.error("Error declining application:", error);
      Alert.alert(
        "Error",
        "Failed to decline application. Please try again later."
      );
    }
  };

  const handelCancel = async () => {
    try {
      const response = await axios.put(
        `/hiring/cancel-application/${selectedApplication._id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${state.token}`,
          },
        }
      );
      Alert.alert("Success", "Successfully Cancel the Application");
      setShowDoneModal(false);
      closeModal();
    } catch (error) {
      console.error("Error cancel application:", error);
      Alert.alert(
        "Error",
        "Failed to cancel application. Please try again later."
      );
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
        userId: selectedApplication.senderId._id, // Assuming application.senderId._id contains the user's ID
        rating: starRating,
      });

      console.log("Rating submitted successfully:", response.data);
      setStarRating(0);
      closeModal();
    } catch (error) {
      console.error("Error handling rating:", error);
      Alert.alert("Error", "Failed to handle rating. Please try again later.");
    }
  };

  const handleApplicationPress = (application) => {
    setSelectedApplication(application);
    setModalText(
      application.isSent ? "Sent Application" : "Received Application"
    );
    setModalName(
      application.isSent
        ? `${application.receiverId.firstName} ${application.receiverId.lastName}`
        : `${application.senderId.firstName} ${application.senderId.lastName}`
    );
    const createdAt = moment(application.createdAt);
    setModalTime(createdAt.format("h:mm a")); // Set modal time
    setModalDate(createdAt.format("MMMM Do YYYY")); // Set modal date
    setModalVisible(true);
  };

  const renderApplicationItem = ({ item, isSent }) => {
    const createdAt = moment(item.createdAt);
    const formattedDate = createdAt.format("MMMM Do YYYY");
    const formattedTime = createdAt.format("h:mm a");

    const isSentByUser = isSent && item.senderId._id === user._id;

    let statusColor;
    switch (item.status) {
      case "accepted":
        statusColor = "#00CCAA"; // Green color for accepted
        break;
      case "declined":
        statusColor = "#FF0000"; // Red color for declined
        break;
      case "done":
        statusColor = "#FFA500"; // Red color for declined
        break;
        case "cancelled":
        statusColor = "#000000"; // Red color for declined
        break;
      default:
        statusColor = "#AAA9A9"; // Gray color for pending
        break;
    }

    return (
      <TouchableOpacity onPress={() => handleApplicationPress(item)}>
        <View style={styles.itemContainer}>

          <View style={styles.rowContainer}>
            <Text style={styles.received}>
              {isSent
                ? "You Sent an Application to:"
                : "Sent you a application"}
            </Text>

            <Text style={styles.time}>{formattedTime}</Text>
          </View>

          <Text style={styles.name}>
            {isSent ? `${item.receiverId.firstName} ${item.receiverId.lastName} ` : `${item.senderId.firstName} ${item.senderId.lastName}`}
          </Text>

          <View style={styles.rowContainer}>
            <Text style={styles.date}>{formattedDate}</Text>
            <Text style={[styles.status, { color: statusColor }]}>
              {item.status}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchApplications();
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text style={styles.headerTitle}>Notifications</Text>
        <FlatList
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          data={[
            ...sentApplications.map((app) => ({
              ...app,
              isSent: true,
              key: `${app._id}_sent`,
            })),
            ...receivedApplications.map((app) => ({
              ...app,
              isSent: false,
              key: `${app._id}_received`,
            })),
          ]}
          renderItem={({ item }) =>
            renderApplicationItem({ item, isSent: item.isSent })
          }
          keyExtractor={(item) => item.key}
          contentContainerStyle={styles.flatListContainer}
        />
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View style={{ alignSelf: "flex-end" }}>
                <TouchableHighlight
                  onPress={() => {
                    setModalVisible(!modalVisible);
                  }}
                >
                  <Feather name="x" size={20} color="black" />
                </TouchableHighlight>
              </View>

              {/* <View style={{ alignSelf: "center" }}>
                <Text
                  style={{ color: "#343434", fontSize: 20, fontWeight: "600" }}
                >
                  Notification
                </Text>
              </View> */}

              {modalText === "Received Application" && (
                <View style={styles.ReceiveContainer}>
                  <Text
                    style={{
                      color: "#343434",
                      fontSize: 20,
                      fontWeight: "600",
                      textAlign: "center",
                    }}
                  >
                    Received
                  </Text>
                  {selectedApplication.status === "pending" ? (
                    <>
                      <View
                        style={{
                          flexDirection: "row",
                          marginTop: 20,
                        }}
                      >
                        <Text
                          style={{
                            color: "#00CCAA",
                            fontSize: 16,
                            fontWeight: "600",
                            marginRight: "35%",
                          }}
                        >
                          Wants to hire you
                        </Text>
                        <Text
                          style={{
                            color: "#343434",
                            fontSize: 14,
                            fontWeight: "600",
                          }}
                        >
                          {modalTime}
                        </Text>
                      </View>
                      <View style={{}}>
                        <Text
                          style={{
                            color: "#343434",
                            fontSize: 20,
                            fontWeight: "600",
                            marginTop: 15,
                          }}
                        >
                          {modalName}
                        </Text>
                        <Text
                          style={{
                            color: "#AAA9A9",
                            fontSize: 14,
                            fontWeight: "600",
                            marginTop: 20,
                            textAlign: "right",
                          }}
                        >
                          {modalDate}
                        </Text>
                      </View>
                      <View style={styles.buttonContainer}>
                        <TouchableOpacity
                          style={[styles.buttonWrapper, { borderRadius: 10 }]}
                        >
                          <Text
                            style={{
                              backgroundColor: "#00CCAA",
                              color: "#343434",
                              textAlign: "center",
                              paddingVertical: 10,
                            }}
                            onPress={handleAccept}
                          >
                            Accept
                          </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={[styles.buttonWrapper, { borderRadius: 10 }]}
                        >
                          <Text
                            style={{
                              backgroundColor: "#F64747",
                              color: "#FFFFFF",
                              textAlign: "center",
                              paddingVertical: 10,
                            }}
                            onPress={handleDecline}
                          >
                            Decline
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </>
                  ) : (
                    
                    <View>
                      <Text
                        style={{
                          color: "#343434",
                          fontSize: 20,
                          fontWeight: "600",
                          textAlign: "center",
                        }}
                      >
                        Ongoing Work
                       

                      </Text>
                      <Text style={{ marginTop: 5, fontSize: 16, marginBottom: 10 }}>
                      You can contact the User using the number provided: <Text style = {{fontWeight: 'bold'}}>{selectedApplication.senderId.contactNumber}</Text>
                      </Text>
                      <Image
                        source={require("../../../assets/image/ongoing.jpg")}
                        style={{
                          width: 200,
                          height: 120,
                          alignSelf: "center",
                          marginBottom: 10,
                          marginTop: 20,
                        }}
                      />
                      <View style={{ marginTop: 20 }}></View>
                      <View style={styles.buttonContainer}>
                        <TouchableOpacity
                          style={[styles.buttonWrapper, { borderRadius: 10 }]}
                          onPress={() => {
                            handleDone();
            
                          }}
                        >
                          <Text
                            style={{
                              backgroundColor: "#00CCAA",
                              color: "#343434",
                              textAlign: "center",
                              paddingVertical: 10,
                            }}
                          >
                            Done
                          </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                          onPress={showReportModal}
                          style={[styles.buttonWrapper, { borderRadius: 10 }]}
                        >
                          <Text
                            style={{
                              backgroundColor: "#F64747",
                              color: "#FFFFFF",
                              textAlign: "center",
                              paddingVertical: 10,
                            }}
                          >
                            Report
                          </Text>
                        </TouchableOpacity>
                      </View>
                      {selectedApplication.isSent && (
                        <>
                          <View
                            style={{
                              flexDirection: "row",
                              justifyContent: "space-between",
                              alignItems: "center",
                              marginTop: 20,
                              paddingHorizontal: 20,
                            }}
                          >
                            <Text
                              style={{
                                color: "#343434",
                                fontSize: 17,
                                fontWeight: "600",
                              }}
                            >
                              {modalName}
                            </Text>
                            <Text
                              style={{
                                color: "#343434",
                                fontSize: 14,
                                fontWeight: "600",
                              }}
                            >
                              {modalTime}
                            </Text>
                          </View>
                          <View
                            style={{
                              alignSelf: "flex-end",
                              marginRight: 20,
                              marginBottom: 20,
                            }}
                          >
                            <Text style={{ color: "#AAA9A9" }}>
                              {modalDate}
                            </Text>
                          </View>
                        </>
                      )}
                    </View>
                  )}
                </View>
              )}

              {modalText === "Sent Application" && (
                <View style={styles.SentContainer}>
                  <Text
                    style={{
                      color: "#343434",
                      fontSize: 20,
                      fontWeight: "600",
                      textAlign: "center",
                    }}
                  >
                    Sent
                  </Text>
                  {selectedApplication.status === "pending" ? <></> : null}
                  <View
                    style={{
                      flexDirection: "row",
                      marginTop: 20,
                    }}
                  >
                    <Text
                      style={{
                        color: "#00CCAA",
                        fontSize: 16,
                        fontWeight: "600",
                        marginRight: "26%",
                      }}
                    >
                      You sent a application
                    </Text>
                    <Text
                      style={{
                        color: "#343434",
                        fontSize: 14,
                        fontWeight: "600",
                        alignSelf: "flex-end",
                        alignItems: "flex-end",
                        textAlign: "right",
                      }}
                    >
                      {modalTime}
                    </Text>
                  </View>
                  <View style={{}}>
                    <Text
                      style={{
                        color: "#343434",
                        fontSize: 20,
                        fontWeight: "600",
                        marginTop: 15,
                      }}
                    >
                      {modalName}
                    </Text> 
                    
                    <Text style={{ marginTop: 5, fontSize: 16, marginBottom: 10 }}>
                      You can contact the User using the number provided: <Text style = {{fontWeight: 'bold'}}>{selectedApplication.receiverId.contactNumber}</Text>
                      </Text>
                    <Text
                      style={{
                        color: "#AAA9A9",
                        fontSize: 14,
                        fontWeight: "600",
                        marginTop: 20,
                        textAlign: "right",
                      }}
                    >
                      {modalDate}
                    </Text>
                  </View>
                  
                  <View style = {{flexDirection: 'row', gap: 30, justifyContent:'center', paddingLeft: 70}}>
                  <TouchableOpacity
                    onPress={() => {
                      setModalVisible(!modalVisible);
                    }}
                    style={{
                      backgroundColor: "#343434",
                      marginTop: 60,
                      paddingVertical: 10,
                      paddingHorizontal: 20,
                      borderRadius: 5,
                      alignSelf: "center",
                    }}
                  >
                    <Text style={{ color: "#00CCAA", fontWeight: "bold" }}>
                      Go Back
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                          onPress={() => {
                            handelCancel();
            
                          }}
                          style={{
                      backgroundColor: "#343434",
                      marginTop: 60,
                      paddingVertical: 10,
                      paddingHorizontal: 20,
                      borderRadius: 5,
                      alignSelf: "center",
                    }}
                  >
                                <Text style={{ color: "#00CCAA", fontWeight: "bold" }}>
                            Cancel
                          </Text>
                        </TouchableOpacity>

                  </View>
                </View>
              )}
              {/* this is modal is for rating */}
              <Modal
                animationType="fade"
                transparent={true}
                visible={showDoneModal}
              >
                <View style={styles.WellDoneContainer}>
                  <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>Job well done</Text>
                    <Text style={styles.modalHeader1}>
                      How was the performance of
                    </Text>
                    <Text style={styles.modalName}>{modalName}</Text>
                    <View style={styles.ratingContainer}>
                        {[1, 2, 3, 4, 5].map((rating) => (
                          <TouchableOpacity
                            key={rating}
                            onPress={() => handleStarPress(rating)}
                          >
                            {rating <= starRating ? (
                              <FontAwesome name="star" size={24} color="yellow" />
                            ) : (
                              <Feather name="star" size={24} color="yellow" />
                            )}
                          </TouchableOpacity>
                        ))}
                      </View>
                    {/* <View style={styles.ratingContainer}>
                      <AirbnbRating
                        count={5}
                        reviews={["Terrible", "Bad", "OK", "Good", "Excellent"]}
                        defaultRating={0}
                        size={30}
                        onFinishRating={(value) => setRating(value)}
                      />
                    </View> */}
                    <TouchableOpacity
                      style={styles.cancelButton}
                      onPress={() => {
                        handleSubmitRating(); // Close all modals
                      }}
                    >
                      <Text style={styles.ratingLabel}>Submit</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </Modal>
            </View>
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
        </Modal>
      </View>
      <FooterMenu />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerTitle: {
    alignSelf: "center",
    color: "#00CCAA",
    fontSize: 24,
    fontWeight: "500",
    textShadowColor: "gray",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
    marginVertical: 10,
  },
  buttonWrapper: {
    borderRadius: 10,
    overflow: "hidden",
    width: "45%",
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 5,
    marginLeft: 15,
    paddingLeft: 15,
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 5,
    marginLeft: 15,
    marginRight: 15,
    marginTop: 10,
  },
  status: {
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 5,
    marginLeft: 15,
    paddingRight: 20,
  },
  received: {
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 5,
    marginLeft: 15,
    color: "#00CCAA",
  },
  date: {
    fontSize: 14,
    fontWeight: "400",
    marginBottom: 5,
    marginLeft: 15,
    color: "#AAA9A9",
  },
  time: {
    fontSize: 15,
    fontWeight: "400",
    marginBottom: 13,
    marginRight: 20,
    alignSelf: "flex-end",
    color: "#343434",
  },
  itemContainer: {
    padding: 10,
    borderBottomWidth: 2.5,
    borderBottomColor: "#C8C8C8",
    elevation: 2,
    borderEndEndRadius: 10,
    borderBottomLeftRadius: 10,
  },
  centeredView: {
    top: "25%",
    margin: 15,
    borderRadius: 17,
    height: "100%",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    // padding: 20, // Adjusted padding for better appearance
    paddingTop: 10,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 30,
    alignItems: "flex-start", // Align items to the top
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginTop: 50,
  },
  SentContainer: {},
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
  WellDoneContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    bottom: 30,
    width: "100%",
    right: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    alignSelf: "center",
    height: 80,
    color: "#343434",
  },
  modalHeader: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    alignSelf: "center",
    color: "#00CCAA",
    bottom: 50,
  },
  modalHeader1: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    alignSelf: "center",
    color: "#00CCAA",
    bottom: 50,
  },
  modalName: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    alignSelf: "center",
    color: "#00CCAA",
    bottom: 50,
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
    backgroundColor: "#00CCAA",
    alignSelf: "center",
    padding: 10,
    bottom: 20,
    borderRadius: 10,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    alignSelf: "center",
    bottom: 30,
  },
  ratingLabel: {
    color: "#343434",
    fontWeight: "700",
    fontSize: 18,
  },
});

export default Message;