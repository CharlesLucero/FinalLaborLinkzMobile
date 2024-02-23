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
import { AuthContext } from "../context/authContext";
import FooterMenu from "../components/Menus/FooterMenu";
import axios from "axios";
import { Feather } from "@expo/vector-icons";
import PostCard from "../components/PostCard";
import InformationCards from "../components/InformationCards";
import { ImageF } from "../APIRoutes";

const Account = ({ navigation }) => {
  const [state, setState] = useContext(AuthContext);
  //state
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [info, setInfo] = useState([]);

  //get user post
  const getUserPosts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("/post/get-user-post");
      setLoading(false);
      setPosts(data?.userPosts);
    } catch (error) {
      setLoading(false);
      console.log(error);
      alert(error);
    }
  };
  //initial
  useEffect(() => {
    getUserPosts();
  }, []);

  //get user info
  const getUserInfo = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("/information/get-user-info");
      setLoading(false);
      setInfo(data?.userInfo);
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
                state?.user.image || ImageF
                                }}
              style={{
                height: 120,
                width: 120,
                borderRadius: 100,
                borderWidth: 5,
                borderColor: "black",
              }}
            />
            <Text style={styles.username}>
              {state?.user.firstName} {state?.user.lastName} 
            </Text>
          </View>
     
          <View style={{ paddingHorizontal: 20 }}>
            <Text style={styles.user}>User Information</Text>
          </View>

          <View>
            <InformationCards info={info} />
          </View>

          <View style={{ marginTop: 20, paddingHorizontal: 10 }}>
            <Text style={{ fontSize: 16, fontWeight: "600", color: "#00CCAA" }}>
              Active Job Listings
            </Text>
          </View>

          <View style={{ paddingHorizontal: 10 }}>
            <PostCard posts={posts} Account={true} />
          </View>
        </ScrollView>
      </View>

      <View
        style={{
          backgroundColor: "#ffffff",
          borderWidth: 0.5,
          borderColor: "gray",
          paddingHorizontal: 20,
          borderTopRightRadius: 20,
          borderTopLeftRadius: 20,
          paddingTop: 5,
        }}
      >
        <FooterMenu />
      </View>
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
