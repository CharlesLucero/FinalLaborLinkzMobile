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

const Notifications = () => {
  const [state, setState] = useContext(AuthContext);
  const { token, user } = state;

  const [receivedApplications, setReceivedApplications] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    fetchReceivedApplications();
  }, []);

  const fetchReceivedApplications = async () => {
    try {
      const response = await axios.get(
        `/hiring/received-applications/${user._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const sortedApplications = response.data.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setReceivedApplications(sortedApplications);
    } catch (error) {
      console.error("Error fetching received applications:", error);
      Alert.alert("Error", "Failed to fetch received applications.");
    } finally {
      setRefreshing(false);
    }
  };

  const handleApplicationPress = (application) => {
    navigation.navigate("Process", { application }); // Navigate to Process screen with application data
  };

  const renderApplicationItem = ({ item }) => {
    const createdAt = moment(item.createdAt);
    const formattedDate = createdAt.format("MMMM Do YYYY");
    const formattedTime = createdAt.format("h:mm:ss a");

    return (
      <TouchableOpacity onPress={() => handleApplicationPress(item)}>
        <View style={styles.itemContainer}>
          <Text style={styles.name}>{`${item.senderId.firstName} ${item.senderId.lastName}`}</Text>
          <Text style={styles.date}>{formattedDate}</Text>
          <Text style={styles.time}>{formattedTime}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchReceivedApplications();
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <FlatList
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          }
          ListHeaderComponent={
            <View style={styles.headerContainer}>
              <Image
                source={require("../../../assets/image/logoblack.png")}
                style={{ width: 45, height: 45 }}
              />
              <Text style={styles.headerTitle}>Request Application</Text>
            </View>
          }
          data={receivedApplications}
          renderItem={renderApplicationItem}
          keyExtractor={(item) => item._id}
          contentContainerStyle={styles.flatListContainer}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    flexDirection: "row",
    padding: 25,
    marginLeft: 15,
  },
  headerTitle: {
    alignSelf: "center",
    left: "50%",
    color: "#00CCAA",
    fontSize: 24,
    fontWeight: "500",
    textShadowColor: "gray",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },
  postContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    height: "100%",
    marginTop: 15,
    borderRadius: 40,
    flex: 1,
  },
  userContainer: {
    top: "3%",
    margin: 15,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
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
    marginTop: 15,
    borderBottomWidth: 2.5,
    borderBottomColor: "#C8C8C8",
    elevation: 2,
    borderEndEndRadius: 10,
    borderBottomLeftRadius: 10,
  },
});

export default Notifications;
