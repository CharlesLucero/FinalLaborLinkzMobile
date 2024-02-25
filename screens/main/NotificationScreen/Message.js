import React, { useContext, useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Alert,
  StyleSheet,
  SafeAreaView,
  Image,
  RefreshControl,
} from "react-native";
import axios from "axios";
import { AuthContext } from "../../../context/authContext";
import moment from "moment";
import { useNavigation } from "@react-navigation/native";
import FooterMenu from "../../../components/Menus/FooterMenu";

const Message = () => {
  const [state, setState] = useContext(AuthContext);
  const { token, user } = state;

  const [receivedApplications, setReceivedApplications] = useState([]);
  const [sentApplications, setSentApplications] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const navigation = useNavigation();

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

  const handleApplicationPress = (application) => {
    navigation.navigate("Process", { application }); // Navigate to Process screen with application data
  };

  const renderApplicationItem = ({ item, isSent }) => {
    const createdAt = moment(item.createdAt);
    const formattedDate = createdAt.format("MMMM Do YYYY");
    const formattedTime = createdAt.format("h:mm:ss a");

    const isSentByUser = isSent && item.senderId._id === user._id;
    
    return (
      <TouchableOpacity onPress={() => handleApplicationPress(item)}>
        <View style={styles.itemContainer}>
          <View style={styles.rowContainer}>
            <Text style={styles.received}>
              {isSent ? "You Sent an Application to:" : "You Received an Application from:"}
            </Text>
            <Text style={styles.status}>{item.status}</Text>
          </View>
          <Text style={styles.name}>
            {isSent ? `${item.receiverId.firstName} ${item.receiverId.lastName}` : `${item.senderId.firstName} ${item.senderId.lastName}`}
          </Text>
          <View style={styles.rowContainer}>
            <Text style={styles.date}>{formattedDate}</Text>
            <Text style={styles.time}>{formattedTime}</Text>
          </View>
          {/* Conditionally render accept and decline buttons */}
          {isSent && !isSentByUser && (
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.acceptButton} onPress={() => handleAccept(item)}>
                <Text style={styles.buttonText}>Accept</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.declineButton} onPress={() => handleDecline(item)}>
                <Text style={styles.buttonText}>Decline</Text>
              </TouchableOpacity>
            </View>
          )}
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

  },
  date: {
    fontSize: 16,
    fontWeight: "400",
    marginBottom: 5,
    marginLeft: 15,
  },
  time: {
    fontSize: 16,
    fontWeight: "400",
    marginBottom: 13,
    marginRight: 20,
    alignSelf: "flex-end",
    color: "#C8C8C8",
  },
  itemContainer: {
    padding: 10,
    borderBottomWidth: 2.5,
    borderBottomColor: "#C8C8C8",
    elevation: 2,
    borderEndEndRadius: 10,
    borderBottomLeftRadius: 10,
  },
});

export default Message;
