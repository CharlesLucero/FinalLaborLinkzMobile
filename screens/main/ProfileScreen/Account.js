import React, { useContext, useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { AuthContext } from "../../../context/authContext";
import FooterMenu from "../../../components/Menus/FooterMenu";
import axios from "axios";
import { Feather } from "@expo/vector-icons";
import PostCard from "../../../components/PostCard";
import InformationCards from "../../../components/InformationCards";
import { host } from "../../../APIRoutes";
import * as SecureStore from 'expo-secure-store';
import { MaterialIcons } from '@expo/vector-icons';

const Account = ({ navigation }) => {
  const [state, setState] = useContext(AuthContext);
  //state
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [info, setInfo] = useState([]);
  const [data, setData] = useState([]);

  console.log(`SHET++++++++==++++++++++++++++++++++++++++++++++: ${JSON.stringify(posts)}`);
  const [userInfo, setUserInfo] = useState(null); // State to store user details

  // Function to fetch user details
  // Function to fetch user details
const getUserDetails = async () => {
  try {
    // Retrieve user ID from secure storage
    const userId = await SecureStore.getItemAsync('userId');

    // Validate user ID presence
    if (!userId) {
      throw new Error('User ID not found in secure storage');
    }

    // Fetch user details using POST request with userId in body
    const response = await axios.post('/auth/get-user', { id: userId }); // Send 'id' instead of 'userId'

    // Handle success response
    if (response.status === 200) {
      const user = response.data.user;
      setData(user);
      console.log(`POTAAA GUMANAAAA KAA:::::::::::::::::::::::: ${user.verified}`);
      console.log(`DATADATADATADATA:: ${JSON.stringify(response.data.user)}`);
    } else {
      throw new Error('Failed to fetch user details: ' + response.statusText);
    }
  } catch (error) {
    console.error(error); // Log the error for debugging
    // Handle errors appropriately (e.g., display user-friendly error messages)
  }
};


  //get user post
  const getUserPosts = async (navigation) => {
    try {
      setLoading(true);
      const { data } = await axios.get("/post/get-user-post");
      setLoading(false);
      setPosts(data?.userPosts);
      console.log(`AJ RAMOSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS: ${JSON.stringify(data?.userPosts)}`);
    } catch (error) {
      setLoading(false);
      console.log(error);
      alert(error);
    }
  };
  //initial
  useEffect(() => {
    console.log(`__+_+_+_+_+_+_+_+_+__+`);
    getUserDetails();
    getUserPosts();
  }, []);

  //get user info
  const getUserInfo = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("/information/get-user-info");
      setLoading(false);
      setInfo(data?.userInfo);
      console.log(`JASPER CALDERONNNN:N:N:N:N:N::N: ${JSON.stringify(data?.userInfo)}`);
    } catch (error) {
      setLoading(false);
      console.log(error);
      alert("csfsdf", "fjsdfsd");
    }
  };
  //inital
  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ alignItems: "flex-end", paddingHorizontal: 10 }}>
            <TouchableOpacity>
              <Feather
                name="settings"
                size={24}
                color="black"
                onPress={() => navigation.navigate("Setting")}
              />
            </TouchableOpacity>
          </View>
          <View style={{ alignItems: "center" }}>
            <Image
              source={{
                uri:
                host+state?.user.image 
                                }}
              style={{
                height: 120,
                width: 120,
                borderRadius: 100,
                borderWidth: 1,
                borderColor: "#343434",
              }}
            />
            <View style={{ flexDirection: "row", justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
              <Text style={{ fontSize: 18, color: 'black', fontWeight: 500, marginRight: 2 }}>
                {state?.user.firstName} {state?.user.lastName}
              </Text>
              {state?.user.verified &&
                <View style={{ marginLeft: 5 }}>
                  <MaterialIcons name="verified" size={24} color="#3897F0" />
                </View>
              }
            </View>

          </View>
     
          <View style={{ paddingHorizontal: 20 }}>
            <Text style={{color: '#343434', fontSize: 16, fontWeight: 500, marginTop: 14}}>User Information</Text>
          </View>

          <View>
            <InformationCards info={info} />
          </View>

          <View style={{ marginTop: 20, paddingHorizontal: 20 }}>
            <Text style={{color: '#343434', fontSize: 16, fontWeight: 500, marginTop: 14}}>
              Active Job Listings
            </Text>
          </View>
          <View style={{ paddingHorizontal: 10 }}>
            <PostCard posts={posts} Account={true} location={true} data={data} />
          </View>
        </ScrollView>
      </View>

        <FooterMenu />

    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    margin: 10,
    marginTop: 40,
    backgroundColor: "white",
  },
  username: {
    color: "#00CCAA",
    fontSize: 32,
    fontWeight: "800",
  },
  inputBox: {
    backgroundColor: "white",
    fontSize: 10,
    borderRadius: 20,
    borderColor: "#D2CECE",
    borderWidth: 1,
    fontSize: 15,
    paddingHorizontal: 15,
    marginTop: 5,
  },
  inputBoxLong: {
    backgroundColor: "white",
    fontSize: 10,
    borderRadius: 20,
    borderColor: "#D2CECE",
    borderWidth: 1,
    fontSize: 15,
    paddingHorizontal: 15,
    marginTop: 10,
  },
  btnsave: {
    backgroundColor: "#343434",
    borderRadius: 15,
    height: 50,
    width: 250,
    marginTop: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  btntext: {
    color: "#00CCAA",
    fontSize: 18,
    fontWeight: "600",
  },
  user: {
    fontSize: 17,
    fontWeight: "500",
    color: "#00CCAA",
    marginTop: 20,
  },
});
export default Account;
