import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
  StyleSheet
} from "react-native";
import { Entypo, AntDesign } from "@expo/vector-icons";
import BodyText from "../../../components/BodyText";
import HeaderText from "../../../components/HeaderText";
import InputBox from "../../../components/InputBox";
import CustomButton from "../../../components/CustomButton";
import axios from "axios";
import { Dropdown } from "react-native-element-dropdown";

const Register = ({ navigation }) => {
  // States
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [gender, setGender] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [location, setLocation] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [isFocus, setIsFocus] = useState(false);

  const data = [
    { label: "Male", gender: "Male" },
    { label: "Female", gender: "Female" },
  ];

  const renderLabel = () => {
    if (gender || isFocus) {
      return (
        <Text style={[styles.gender, isFocus && { color: "blue" }]}>
       
        </Text>
      );
    }
    return null;
  };

  // Function to validate contact number
  const validateContactNumber = (number) => {
    const regex = /^09\d{9}$/; // Regex to match the format "09754451009"
    return regex.test(number);
  };

  // Function
  const handleSubmit = async () => {
    try {
      setLoading(true);
      if (
        !firstName ||
        !lastName ||
        !contactNumber ||
        !gender ||
        !location ||
        !email ||
        !password
      ) {
        Alert.alert("Please Fill All Fields");
        setLoading(false);
        return;
      }
      // Validate contact number format
      if (!validateContactNumber(contactNumber)) {
        Alert.alert("Invalid Contact Number","Your Contact Number Should like this '09XXXXXXXXX'");
        setLoading(false);
        return;
      }
      setLoading(false);
      const { data } = await axios.post("/auth/register", {
        firstName,
        lastName,
        contactNumber,
        gender,
        location,
        email,
        password,
      });
      alert(data && data.message);
      navigation.navigate("Login");
      console.log("Register Data==>", {
        firstName,
        lastName,
        contactNumber,
        gender,
        location,
        email,
        password,
      });
    } catch (error) {
      alert(error.response.data.message);
      setLoading(false);
      console.log(error);
    }
  };

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <ScrollView>
        <TouchableWithoutFeedback onPress={dismissKeyboard}>
          <View style={{ backgroundColor: "#FFFFFF", flex: 1 }}>
            <View
              style={{
                marginTop: 30,
                paddingHorizontal: 20,
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <TouchableOpacity>
                <Entypo name="chevron-left" size={32} color="#A9A9A9" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                <BodyText text="Skip" fontSize={16} />
              </TouchableOpacity>
            </View>

            <View style={{ paddingHorizontal: 32, paddingTop: 0 }}>
              <HeaderText text="Join" />
              <HeaderText text="Laborlinkz" />
              <BodyText
                text="Create an account and discover"
                color="#00CCAA"
                marginTop={10}
                fontSize={18}
              />
              <BodyText
                text="local laborers near you."
                color="#00CCAA"
                fontSize={18}
              />
            </View>

            <View
              style={{
                paddingHorizontal: 32,
                flexDirection: "row",
                alignItems: "center",
                gap: 14,
              }}
            >
              <View style={{ flex: 1 }}>
                <InputBox
                  placeholder="First Name"
                  height={70}
                  value={firstName}
                  setValue={setFirstName}
                />
              </View>
              <View style={{ flex: 1 }}>
                <InputBox
                  placeholder="Last Name"
                  height={70}
                  value={lastName}
                  setValue={setLastName}
                />
              </View>
            </View>

            <View
              style={{
                paddingHorizontal: 32,
                flexDirection: "row",
                alignItems: "center",
                gap: 14,
              }}
            >
              <View style={{ flex: 1 }}>
                <InputBox
                  placeholder="Contact Number"
                  height={70}
                  value={contactNumber}
                  setValue={setContactNumber}
                />
              </View>
              <View style={{ flex: 1 }}>
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
                  valueField="gender"
                  placeholder={!isFocus ? "Gender" : "..."}
                  searchPlaceholder="Search..."
                  value={gender}
                  onFocus={() => setIsFocus(true)}
                  onBlur={() => setIsFocus(false)}
                  onChange={(item) => {
                    setGender(item.gender);
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
              </View>
            </View>

            <View style={{ paddingHorizontal: 32 }}>
              <InputBox
                placeholder="Location"
                height={70}
                value={location}
                setValue={setLocation}
              />
              <InputBox
                placeholder="Email"
                height={70}
                value={email}
                setValue={setEmail}
              />
              <InputBox
                placeholder="Password"
                height={70}
                secureTextEntry={!showPassword}
                showPasswordToggle={true}
                value={password}
                setValue={setPassword}
              />
            </View>

            <View style={{ paddingHorizontal: 32, marginTop: 24 }}>
              <TouchableOpacity onPress={() => {}}>
                <View
                  style={{
                    backgroundColor: "#000000",
                    paddingVertical: 12,
                    borderRadius: 15,
                    alignItems: "center",
                    flexDirection: "row",
                    justifyContent: "center",
                  }}
                >
                  <Image
                    source={require("../../assets/image/googleIcon.png")}
                    style={{ width: 24, height: 24, marginRight: 10 }}
                  />
                  <Text style={{ color: "#ffffff", fontSize: 14 }}>
                    Sign up with Google
                  </Text>
                </View>
              </TouchableOpacity>
            </View>

            <View
              style={{
                paddingHorizontal: 32,
                marginTop: 24,
                alignItems: "center",
              }}
            >
              <CustomButton
                title="Sign Up"
                loading={loading}
                handleSubmit={handleSubmit}
              />
              {errorMessage ? (
                <Text
                  style={{ color: "red", marginTop: 8, textAlign: "center" }}
                >
                  {errorMessage}
                </Text>
              ) : null}
            </View>
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
    </SafeAreaView>
  );
};



const styles = StyleSheet.create({
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});


export default Register;
