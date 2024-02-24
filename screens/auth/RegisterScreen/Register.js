import React, { useState, useEffect } from "react";
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
  StyleSheet,
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
  const [regions, setRegions] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [cities, setCities] = useState([]);
  const [barangays, setBarangays] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedBarangay, setSelectedBarangay] = useState("");
  const [location, setLocation] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [isFocus, setIsFocus] = useState(false);

  const data = [
    { label: "Male", gender: "Male" },
    { label: "Female", gender: "Female" },
  ];

  const onlyCagayanV = [{ name: "Cagayan Valley", code: "020000000" }];

  const renderLabel = () => {
    if (gender || isFocus) {
      return (
        <Text style={[styles.gender, isFocus && { color: "blue" }]}></Text>
      );
    }
    return null;
  };

  useEffect(() => {
    populateRegions().catch((error) =>
      console.error("Error in useEffect (populateRegions):", error)
    );
  }, []);

  const fetchData = async (url) => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
      return [];
    }
  };

  const populateRegions = async () => {
    try {
      const regionsData = await fetchData(
        "https://psgc.gitlab.io/api/regions/"
      );
      setRegions(regionsData);
    } catch (error) {
      console.error("Error populating regions:", error);
    }
  };

  const populateProvinces = async (regionCode) => {
    try {
      const provincesData = await fetchData(
        `https://psgc.gitlab.io/api/regions/${regionCode}/provinces/`
      );
      setProvinces(provincesData);
      setSelectedRegion(regionCode);
    } catch (error) {
      console.error("Error populating provinces:", error);
    }
  };

  const populateCities = async (provinceCode) => {
    try {
      const citiesData = await fetchData(
        `https://psgc.gitlab.io/api/provinces/${provinceCode}/cities-municipalities/`
      );

      setCities(citiesData);
      setSelectedProvince(provinceCode);
    } catch (error) {
      console.error("Error populating cities:", error);
    }
  };

  const populateBarangays = async (cityCode) => {
    try {
      const barangaysData = await fetchData(
        `https://psgc.gitlab.io/api/cities-municipalities/${cityCode}/barangays/`
      );
      setBarangays(barangaysData);
      setSelectedCity(cityCode);
    } catch (error) {
      console.error("Error populating barangays:", error);
    }
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
        !password ||
        !selectedRegion ||
        !selectedProvince ||
        !selectedCity ||
        !selectedBarangay
      ) {
        Alert.alert("Please Fill All Fields");
        setLoading(false);
        return;
      }
      // Validate contact number format
      if (!validateContactNumber(contactNumber)) {
        Alert.alert(
          "Invalid Contact Number",
          "Your Contact Number Should like this '09XXXXXXXXX'"
        );
        setLoading(false);
        return;
      }

      const regionDatabase = await fetchData(
        `https://psgc.gitlab.io/api/regions/${selectedRegion}/`
      );
      const regionData = JSON.parse(JSON.stringify(regionDatabase));
      const regionName = regionData.name;
      const regionCode = regionData.code;

      const provinceDatabase = await fetchData(
        `https://psgc.gitlab.io/api/provinces/${selectedProvince}/`
      );
      const provinceData = JSON.parse(JSON.stringify(provinceDatabase));
      const provinceName = provinceData.name;
      const provinceCode = provinceData.code;

      const cityDatabase = await fetchData(
        `https://psgc.gitlab.io/api/cities-municipalities/${selectedCity}/`
      );
      const cityData = JSON.parse(JSON.stringify(cityDatabase));
      const cityName = cityData.name;
      const cityCode = cityData.code;

      const barangaysDatabase = await fetchData(
        `https://psgc.gitlab.io/api/barangays/${selectedBarangay}/`
      );
      const barangayData = JSON.parse(JSON.stringify(barangaysDatabase));
      const barangayName = barangayData.name;
      const barangayCode = barangayData.code;

      console.log("Updated region:", regionName);
      console.log("Updated province:", provinceName);
      console.log("Updated city:", cityName);
      console.log("Updated barangay:", barangayName);



      setLoading(false);
      const { data } = await axios.post("/auth/register", {
        firstName,
        lastName,
        contactNumber,
        gender,
        location,
        email,
        password,
        regionName,
        regionCode,
        provinceName,
        provinceCode,
        cityName,
        cityCode,
        barangayName,
        barangayCode,
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
        regionName,
        provinceName,
        cityName,
        barangayName,
      });
    } catch (error) {
      alert(error.response.data.message);
      setLoading(false);
      console.log(error);
    }
  };

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

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
              <View
                style={{
                  marginTop: 8,
                  marginBottom: 8,
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 14,
                }}
              >
                <View style={{ flex: 1 }}>
                  <Dropdown
                    style={styles.dropdown}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    data={onlyCagayanV}
                    search
                    searchPlaceholder="Search..."
                    labelField="name"
                    valueField="code"
                    placeholder="Select Region"
                    value={selectedRegion}
                    onChange={(item) => populateProvinces(item.code)}
                  />
                </View>
                <View style={{ flex: 1 }}>
                  <Dropdown
                    style={styles.dropdown}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    data={provinces}
                    search
                    searchPlaceholder="Search..."
                    labelField="name"
                    valueField="code"
                    placeholder="Select Province"
                    value={selectedProvince}
                    onChange={(item) => populateCities(item.code)}
                  />
                </View>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 14,
                }}
              >
                <View style={{ flex: 1 }}>
                  <Dropdown
                    style={styles.dropdown}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    data={cities}
                    search
                    searchPlaceholder="Search..."
                    labelField="name"
                    valueField="code"
                    placeholder="Select City"
                    value={selectedCity}
                    onChange={(item) => populateBarangays(item.code)}
                  />
                </View>
                <View style={{ flex: 1 }}>
                  <Dropdown
                    style={styles.dropdown}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    data={barangays}
                    search
                    searchPlaceholder="Search..."
                    labelField="name"
                    valueField="code"
                    placeholder="Select Barangay"
                    value={selectedBarangay}
                    onChange={(item) => setSelectedBarangay(item.code)}
                  />
                </View>
              </View>

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
                    source={require("../../../assets/image/googleIcon.png")}
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
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: "absolute",
    backgroundColor: "white",
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