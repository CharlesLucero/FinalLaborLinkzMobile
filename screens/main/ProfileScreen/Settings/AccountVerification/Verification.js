import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  SafeAreaView,
  Alert
} from "react-native";
import { Feather, Entypo } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import Icon from "react-native-vector-icons/FontAwesome";
import * as ImagePicker from "expo-image-picker";
import { Dropdown } from "react-native-element-dropdown";
import { AuthContext } from "../../../../../context/authContext";
import { host } from "../../../../../APIRoutes";
import axios from "axios";
import { useNavigation } from '@react-navigation/native';

const Verification = () => {

  const [state, setState] = useContext(AuthContext);
  const { user, token } = state;


  const [idType, setIdType] = useState("");
  const [frontId, setFrontId] = useState(null);
  const [backId, setBackId] = useState(null);
  const [email] = useState(user?.email || "");
  const [showIdDropdown, setShowIdDropdown] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();


  

  const typeData = [
    { label: "Passport", value: "Passport" },
    { label: "Driver's License", value: "Driver's License" },
    { label: "National ID", value: "National ID" },
  ];

  const handleFrontIdUpload = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setFrontId(result.uri);
    }
  };

  const handleBackIdUpload = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setBackId(result.uri);
    }
  };

  const handleVerifyAccount = async () => {
    try {
      setLoading(true);


      const formData = new FormData();
      formData.append("email", email);
      formData.append("idType", idType); // Add the selected ID type

      // Append front and back images if they are selected
      if (frontId) {
        const frontUriParts = frontId.split(".");
        const frontFileType = frontUriParts[frontUriParts.length - 1];
        const frontFileName = `frontId.${frontFileType}`;
        formData.append("idImages", {
          uri: frontId,
          name: frontFileName,
          type: `image/${frontFileType}`,
        });
      }

      if (backId) {
        const backUriParts = backId.split(".");
        const backFileType = backUriParts[backUriParts.length - 1];
        const backFileName = `backId.${backFileType}`;
        formData.append("idImages", {
          uri: backId,
          name: backFileName,
          type: `image/${backFileType}`,
        });
      }

      // Make the PUT request to update user information
      const response = await axios.put("/auth/update-veri", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.success) {
        Alert.alert("Success", response.data.message, [
          {
            text: "OK",
            onPress: () => {
            },
            
          },
        ]);
      } else {
        Alert.alert("Error", response.data.message);
      }
  

      // Handle response
      console.log(response.data);
      // Handle success response
    } catch (error) {
      console.error(error);
      // Handle error
    } finally {
      setLoading(false);
    }
  };

  // const toggleIdDropdown = () => {
  //   setShowIdDropdown(!showIdDropdown);
  // };

  return (
    <SafeAreaView style={styles.container}>
     <View style={{paddingHorizontal: 5,paddingVertical: 10,}}>
            <TouchableOpacity onPress={() => navigation.navigate('AccountVerification')}>
              <Entypo name="chevron-left" size={32} color="#A9A9A9" />
            </TouchableOpacity>
          </View>
      <Text style={styles.title}>Verify Account</Text>
      {/* <View style={styles.maindropContainer}>
        <TouchableOpacity
          onPress={toggleIdDropdown}
          style={styles.dropdownContainer}
        >
          <Text style={styles.selectedIdType}>
            {idType ? idType : "Select ID Type"}
            <Icon
              name={showIdDropdown ? "angle-up" : "angle-down"}
              size={20}
              color="#00CCAA"
              style={styles.icon}
            />
          </Text>
          {showIdDropdown && (
            <Picker
              selectedValue={idType}
              onValueChange={(itemValue) => setIdType(itemValue)}
              style={styles.picker}
            >
              <Picker.Item label="Passport" value="Passport" />
              <Picker.Item label="Driver's License" value="Drivers License" />
              <Picker.Item label="National ID" value="National ID" />
            </Picker>
          )}
        </TouchableOpacity>

      </View> */}

      <Dropdown
        style={styles.maindropContainer}
        placeholderStyle={styles.selectedIdType}
        selectedTextStyle={styles.selectedIdType}
        inputSearchStyle={styles.inputSearchStyle}
        containerStyle={{
          backgroundColor: "#f6f6f6",
          borderRadius: 8,
          marginTop: 4,
          padding: 6,
        }}
        data={typeData}
        labelField="label"
        valueField="value"
        placeholder="Select ID Type"
        value={idType}
        onChange={(item) => setIdType(item.value)}
      />

      <Text style={styles.Text}>Front Identification Card</Text>

      <View style={styles.uploadContainer}>
        <TouchableOpacity
          style={styles.uploadButton}
          onPress={handleFrontIdUpload}
        >
          <View>
            <Feather
              name="upload"
              size={24}
              color="#00CCAA"
              style={styles.icon1}
            />
          </View>
          <Text style={styles.uploadText}>Upload</Text>
          {frontId && <Image source={{ uri: frontId }} style={styles.image} />}
        </TouchableOpacity>
      </View>
      <Text style={styles.Text}>Back Identification Card</Text>
      <View style={styles.uploadContainer}>
        <View style={styles.icontext}>
          <Feather
            name="upload"
            size={24}
            color="#00CCAA"
            style={styles.icon1}
          />
        </View>
        <TouchableOpacity
          style={styles.uploadButton}
          onPress={handleBackIdUpload}
        >
          <Text style={styles.uploadText}>Upload</Text>
        </TouchableOpacity>
        {backId && <Image source={{ uri: backId }} style={styles.image} />}
      </View>

      <TouchableOpacity
        style={[styles.submitButton]}
        onPress={handleVerifyAccount}
        // disabled={!idType || !frontId || !backId}
      >
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#FFFFFF",
  },
  title: {
    fontSize: 30,
    fontWeight: "600",
    marginBottom: 20,
    alignSelf: "center",
    color: "#00CCAA",
    marginTop: 40,
  },
  maindropContainer: {
    marginTop: 40,
    margin: 20,
    backgroundColor: "#343434",
    borderRadius: 10,
    height: 50,
  },
  dropdownContainer: {
    flexDirection: "row",
  },
  selectedIdType: {
    color: "#00CCAA",
    margin: 10,
    fontSize: 16,
    fontWeight: "500",
  },
  icon1: {
    left: "43%",
    paddingTop: 15,
  },
  uploadText: {
    color: "#00CCAA",
    fontSize: 16,
    alignSelf: "center",
  },
  picker: {
    position: "absolute",
    top: "100%",
    left: 0,
    right: 0,
  },
  uploadContainer: {
    margin: 20,
    backgroundColor: "#F6F6F6",
    borderRadius: 10,
    height: 100,
    width: 200,
    borderStyle: "dashed",
    borderWidth: 1,
    marginLeft: "10%",
  },
  uploadButton: {
    backgroundColor: "#F6F6F6",
    padding: 10,
    borderRadius: 10,
  },
  Text: {
    color: "#A9A9A9",
    fontWeight: "500",
    fontSize: 16,
    marginLeft: "7%",
    alignItems: "center",
    marginTop: 25,
  },
  image: {
    alignSelf: "center",
    width: "30%",
    height: "14%",
    bottom: 5,
  },
  submitButton: {
    backgroundColor: "#343434",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    marginHorizontal: 30,
  },
  submitButtonText: {
    color: "#00CCAA",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Verification;