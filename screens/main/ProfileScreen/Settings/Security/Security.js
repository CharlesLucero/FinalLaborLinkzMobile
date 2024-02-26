import React, { useContext, useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import axios from "axios";
import { AuthContext } from "../../../../../context/authContext";
import { host } from "../../../../../APIRoutes";

const Security = ({ navigation }) => {
  const [state, setState] = useContext(AuthContext);
  const { user, token } = state;

  const [oldPassword, setOldPassword] = useState(user?.password || "");
  const [newPassword, setNewPassword] = useState(user?.password || "");
  const [email] = useState(user?.email || "");
  const [loading, setLoading] = useState(false);

  const handleUpdate = async () => {
    try {
      setLoading(true);
  
      const requestData = {
        email,
        oldPassword: oldPassword,
        newPassword: newPassword,
      };
  
      const { data } = await axios.put("/auth/update-pass", requestData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
  
      setLoading(false);
  
      if (data.success) {
        // Password updated successfully
        console.log('Old Pass==>', {email, oldPassword});
        console.log('New Pass==>', {email, newPassword});

        Alert.alert("Success", data.message, [
          {
            text: "OK",
            onPress: () => {
              // Navigate to another screen or perform any other action
            },
          },
        ]);
      } else {
        // Password update failed, display error message
        Alert.alert("Error", data.message);
      }
    } catch (error) {
      // Handle network errors or other exceptions
      setLoading(false);
      Alert.alert("Error", "An error occurred. Please try again later.");
      console.error("Password update error:", error);
    }
  };
    
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ paddingHorizontal: 20 }}>
          <TouchableOpacity>
            <Entypo
              name="chevron-left"
              size={24}
              color="black"
              onPress={() => navigation.navigate("Setting")}
            />
          </TouchableOpacity>
        </View>

        <View style={{ paddingHorizontal: 20, marginTop: 20 }}>
          <Text style={{ fontSize: 25, fontWeight: "600" }}>
            Change Password
          </Text>
        </View>

        <View>
          {/* <TextInput
            style={styles.inputBoxLong}
            value={email}
            editable={false}
          /> */}
        </View>

        <View>
          <TextInput
            style={styles.inputBoxLong}
            value={oldPassword}
            placeholder="Current Password"
            onChangeText={(text) => setOldPassword(text)}
            secureTextEntry={true}
          />
        </View>
        <View>
          <TextInput
            style={styles.inputBoxLong}
            value={newPassword}
            placeholder="New Password"
            onChangeText={(text) => setNewPassword(text)}
            secureTextEntry={true}
          />
        </View>

        <View style={{ alignItems: "center" }}>
          <TouchableOpacity style={styles.btnsave} onPress={handleUpdate}>
            <Text style={styles.btntext}>
              {loading ? "Please Wait" : "Save"}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    margin: 10,
    marginTop: 40,
  },
  username: {
    color: "#00CCAA",
    fontSize: 32,
    fontWeight: "600",
  },
  inputBox: {
    backgroundColor: "white",
    fontSize: 10,
    height: 50,
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
    height: 50,
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
  imageborder: {
    height: 170,
    width: 170,
    borderRadius: 100,
    borderWidth: 5,
    borderColor: "black",
  },
  placeholderStyle: {
    fontSize: 15,
  },
  selectedTextStyle: {
    fontSize: 15,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  dropdown: {
    backgroundColor: "white",
    // height: 30,
    // width: 175,
    borderColor: "#D2CECE",
    borderWidth: 1,
    borderRadius: 15,
    paddingHorizontal: 8,
    paddingLeft: 15,
  },
});

export default Security;