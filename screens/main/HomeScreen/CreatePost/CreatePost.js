import React, { useState, useContext } from "react";
import {
  View,
  SafeAreaView,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  ScrollView,
  Text,
  TextInput,
  Image,
  StyleSheet, 
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import HeaderText from "../../../../components/HeaderText";
import BodyText from "../../../../components/BodyText";
import axios from "axios";
import { PostContext } from "../../../../context/postContext";
import * as ImagePicker from "expo-image-picker"; // Import ImagePicker from Expo

const CreatePost = ({ navigation }) => {
  // global state
  const [posts, setPosts] = useContext(PostContext);
  // local state
  const [title, setTitle] = useState("");
  const [description, setDecription] = useState("");
  const [minRate, setMinRate] = useState("");
  const [maxRate, setMaxRate] = useState("");
  const [loading, setLoading] = useState(false);
  const [first, setFirst] = useState(null);
  const [second, setSecond] = useState(null);
  const [third, setThird] = useState(null);

  const handleFirstPicUpload = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setFirst(result.uri);
    }
  };

  const handleSecondPicUpload = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setSecond(result.uri);
    }
  };

  const handleThirdPicUpload = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setThird(result.uri);
    }
  };

  //handle form data post DATA
  const handleSubmit = async () => {
    try {
      setLoading(true);
      // Validate input fields
      if (!title || !description || !minRate || !maxRate) {
        alert("Please fill all fields");
        return;
      }

      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("minRate", minRate);
      formData.append("maxRate", maxRate);

      if (first) {
        const firstUriParts = first.split(".");
        const firstFileType = firstUriParts[firstUriParts.length - 1];
        const firstFileName = `first.${firstFileType}`;
        formData.append("postPics", {
          uri: first,
          name: firstFileName,
          type: `image/${firstFileType}`,
        });
      }

      if (second) {
        const secondUriParts = second.split(".");
        const secondFileType = secondUriParts[secondUriParts.length - 1];
        const secondFileName = `second.${secondFileType}`;
        formData.append("postPics", {
          uri: second,
          name: secondFileName,
          type: `image/${secondFileType}`,
        });
      }

      if (third) {
        const thirdUriParts = third.split(".");
        const thirdFileType = thirdUriParts[thirdUriParts.length - 1];
        const thirdFileName = `third.${thirdFileType}`;
        formData.append("postPics", {
          uri: third,
          name: thirdFileName,
          type: `image/${thirdFileType}`,
        });
      }

      const response = await axios.post("/post/create-post", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setLoading(false);
      setPosts([...posts, response.data?.post]);
      alert(response.data?.message);
      navigation.navigate("Home");
    } catch (error) {
      alert(error.response?.data?.message || error.message);
      setLoading(false);
      console.error(error);
    }
  };

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "#ffffff", marginTop: 30 }}
    >
      <TouchableWithoutFeedback onPress={dismissKeyboard}>
        <View style={{ flex: 1 }}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{ paddingHorizontal: 24, paddingVertical: 20 }}>
              <TouchableOpacity onPress={() => navigation.navigate("Home")}>
                <Entypo name="chevron-left" size={32} color="#A9A9A9" />
              </TouchableOpacity>
            </View>

            <View style={{ paddingHorizontal: 32, paddingTop: 10 }}>
              <HeaderText text="Create a Post" />
              <BodyText
                text="Insert all the following requirement:"
                color="#00CCAA"
                marginTop={10}
                fontSize={16}
              />
            </View>

            <View style={{ paddingHorizontal: 32, marginTop: 10 }}>
              <TextInput
                style={{
                  backgroundColor: "#F6F6F6",
                  height: 70,
                  borderRadius: 15,
                  paddingLeft: 15,
                }}
                placeholder="Title"
                value={title}
                onChangeText={(text) => setTitle(text)}
              />
            </View>

            <View style={{ paddingHorizontal: 32, marginTop: 10 }}>
              <TextInput
                style={{
                  backgroundColor: "#F6F6F6",
                  height: 70,
                  borderRadius: 15,
                  paddingLeft: 15,
                  textAlignVertical: "top",
                  height: 150,
                  paddingTop: 10,
                }}
                placeholder="Enter the description"
                multiline={true}
                numberOfLines={10}
                value={description}
                onChangeText={(text) => setDecription(text)}
              />
            </View>

            <View
              style={{
                flexDirection: "row",
                paddingHorizontal: 35,
                marginTop: 10,
                gap: 10,
              }}
            >
              <View style={{ flex: 1 }}>
                <TextInput
                  style={{
                    backgroundColor: "#F6F6F6",
                    height: 70,
                    borderRadius: 15,
                    paddingLeft: 15,
                  }}
                  placeholder="Minimum. Rate"
                  value={minRate}
                  onChangeText={(text) => setMinRate(text)}
                  keyboardType="numeric"
                />
              </View>

              <View style={{ flex: 1 }}>
                <TextInput
                  style={{
                    backgroundColor: "#F6F6F6",
                    height: 70,
                    borderRadius: 15,
                    paddingLeft: 15,
                  }}
                  placeholder="Maximum. Rate"
                  value={maxRate}
                  onChangeText={(text) => setMaxRate(text)}
                  keyboardType="numeric"
                />
              </View>
            </View>

            <View
              style={{
                flexDirection: "row",
                paddingHorizontal: 35,
                marginTop: 10,
                gap: 10,
              }}
            >
              <TouchableOpacity
                style={{
                  backgroundColor: "#00CCAA",
                  width: 100,
                  height: 45,
                  borderRadius: 18,
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onPress={handleFirstPicUpload}
              >
                <Text style={{ fontWeight: "500" }}>First Image</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  backgroundColor: "#00CCAA",
                  width: 100,
                  height: 45,
                  borderRadius: 18,
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onPress={handleSecondPicUpload}
              >
                <Text style={{ fontWeight: "500" }}>Second Image</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  backgroundColor: "#00CCAA",
                  width: 100,
                  height: 45,
                  borderRadius: 18,
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onPress={handleThirdPicUpload}
              >
                <Text style={{ fontWeight: "500" }}>Third Image</Text>
              </TouchableOpacity>
            </View>

            <View
              style={{
                paddingHorizontal: 32,
                marginTop: 20,
                alignItems: "center",
              }}
            >
              <Text style={{ fontWeight: "500", marginBottom: 10 }}>
                Selected Images:
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                  alignItems: "center",
                }}
              >
                <View style={[styles.imageContainer, { marginRight: 10 }]}>
                  {first && (
                    <Image source={{ uri: first }} style={styles.image} />
                  )}
                </View>
                <View style={[styles.imageContainer, { marginRight: 10 }]}>
                  {second && (
                    <Image source={{ uri: second }} style={styles.image} />
                  )}
                </View>
                <View style={styles.imageContainer}>
                  {third && (
                    <Image source={{ uri: third }} style={styles.image} />
                  )}
                </View>
              </View>
              
            </View>
            <View
              style={{
                paddingHorizontal: 32,
                alignItems: "center",
                marginTop: 50,
              }}
            >
              <TouchableOpacity
                style={{
                  backgroundColor: "#00CCAA",
                  width: 220,
                  height: 45,
                  borderRadius: 18,
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onPress={handleSubmit}
              >
                <Text style={{ fontWeight: "500" }}>Create Post</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    marginBottom: 10, // Adjust the space between images as needed
  },
  image: {
    alignSelf: "center",
    width: 100,
    height: 100,
    bottom: 5,
    borderRadius: 5,
  },
});

export default CreatePost;
