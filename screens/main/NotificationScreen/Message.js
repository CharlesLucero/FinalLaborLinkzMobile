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
  Button
} from "react-native";
import axios from "axios";
import { AuthContext } from "../../../context/authContext";
import moment from "moment";
import { useNavigation } from "@react-navigation/native";
import FooterMenu from "../../../components/Menus/FooterMenu";
import { Feather } from '@expo/vector-icons';

const Message = () => {
  const [state, setState] = useContext(AuthContext);
  const { token, user } = state;
  const [receivedApplications, setReceivedApplications] = useState([]);
  const [sentApplications, setSentApplications] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalText, setModalText] = useState('');
  const [modalName, setModalName] = useState('');
  const [modalTime, setModalTime] = useState('');
  const [modalDate, setModalDate] = useState('');
  const navigation = useNavigation();
  const [selectedApplication, setSelectedApplication] = useState(null);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const receivedResponse = await axios.get(`/hiring/received-applications/${user._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setReceivedApplications(receivedResponse.data.data);

      const sentResponse = await axios.get(`/hiring/sent-applications/${user._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setSentApplications(sentResponse.data.data);
    } catch (error) {
      console.error("Error fetching applications:", error);
      Alert.alert("Error", "Failed to fetch applications.");
    } finally {
      setRefreshing(false);
    }
  };

  const handleAccept = async () => {
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
        fetchApplications(); // Refresh applications after accepting
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
        fetchApplications(); // Refresh applications after declining
    } catch (error) {
        console.error("Error declining application:", error);
        Alert.alert(
            "Error",
            "Failed to decline application. Please try again later."
        );
    }
};

  const handleApplicationPress = (application) => {
    setSelectedApplication(application);
    setModalText(application.isSent ? "Sent Application" : "Received Application");
    setModalName(application.isSent ? `${application.receiverId.firstName} ${application.receiverId.lastName}` : `${application.senderId.firstName} ${application.senderId.lastName}`);
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
      case 'accepted':
        statusColor = '#00CCAA'; // Green color for accepted
        break;
      case 'decline':
        statusColor = '#FF0000'; // Red color for declined
        break;
      default:
        statusColor = '#AAA9A9'; // Gray color for pending
        break;
    }
  
    return (
      <TouchableOpacity onPress={() => handleApplicationPress(item)}>
        <View style={styles.itemContainer}>
          <View style={styles.rowContainer}>
            <Text style={styles.received}>
              {isSent ? "You Sent an Application to:" : "Sent you a application"}
            </Text>
           
            <Text style={styles.time}>{formattedTime}</Text>
          </View>
  
          <Text style={styles.name}>
            {isSent ? `${item.receiverId.firstName} ${item.receiverId.lastName}` : `${item.senderId.firstName} ${item.senderId.lastName}`}
          </Text>
          
          <View style={styles.rowContainer}>
            <Text style={styles.date}>{formattedDate}</Text>
            <Text style={[styles.status, { color: statusColor }]}>{item.status}</Text>
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
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
          data={[
            ...sentApplications.map((app) => ({ ...app, isSent: true, key: `${app._id}_sent` })),
            ...receivedApplications.map((app) => ({ ...app, isSent: false, key: `${app._id}_received` })),
          ]}
          renderItem={({ item }) => renderApplicationItem({ item, isSent: item.isSent })}
          keyExtractor={(item) => item.key}
          contentContainerStyle={styles.flatListContainer}
        />
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View style = {{ alignSelf:'flex-end'}}>
              <TouchableHighlight onPress={() => {
                    setModalVisible(!modalVisible);
                  }}>
                    <Feather name="x" size={20} color="black" />
                  </TouchableHighlight>
              </View>

              <View style = {{alignSelf:'center'}}>
                <Text style={{ color: '#343434', fontSize: 20, fontWeight: '600' }}>Notification</Text>
              </View>

              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 20, gap: 117 }}>
                <Text style={{ color: '#343434', fontSize: 17, fontWeight: '600' }}>{modalName}</Text>
                <Text style={{ color: '#343434', fontSize: 14, fontWeight: '600' }}>{modalTime}</Text>
              </View>

        

              <View style={{ marginTop: 50, alignSelf: 'flex-end', marginBottom: 20 }}>
                <Text style={{ color: '#AAA9A9' }}>{modalDate}</Text>
              </View>

                {modalText === "Received Application" && (
                    <View style={styles.buttonContainer}>
                        <View style={[styles.buttonWrapper, { borderRadius: 10, width: '45%' }]}>
                            <Button title="Accept" color="#00CCAA" onPress={handleAccept} />
                        </View>
                        <View style={[styles.buttonWrapper, { borderRadius: 10 }]}>
                            <Button title="Decline" color="#FF0000" onPress={handleDecline} />
                        </View>
                    </View>
                )}

            </View>
          </View>
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
    overflow: 'hidden',
    width: '45%' 
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 5,
    marginLeft: 15,
    paddingLeft: 15
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
    marginLeft: 15,
    marginRight: 15,
    marginTop: 10
  },
  status: {
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 5,
    marginLeft: 15,
    paddingRight: 20
  },
  received: {
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 5,
    marginLeft: 15,
    color: "#00CCAA"
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
    padding: 20, // Adjusted padding for better appearance
    alignItems: "flex-start", // Align items to the top
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },  
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 10,
  }
});

export default Message;
