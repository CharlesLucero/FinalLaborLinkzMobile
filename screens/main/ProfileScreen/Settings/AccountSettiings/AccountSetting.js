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
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import { AuthContext } from "../../../../../context/authContext";
import { ImageF } from "../../../../../APIRoutes";
import { Dropdown } from "react-native-element-dropdown";
import { host } from "../../../../../APIRoutes";

const AccountSetting = ({ navigation }) => {
  const [state, setState] = useContext(AuthContext);
  const { user, token } = state;

  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [contactNumber, setContactNumber] = useState(user?.contactNumber || "");
  const [regions, setRegions] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [cities, setCities] = useState([]);
  const [barangays, setBarangays] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState(user?.region.code || "");
  const [selectedProvince, setSelectedProvince] = useState(
    user?.province.code || ""
  );
  const [selectedCity, setSelectedCity] = useState(user?.city.code || "");
  const [selectedBarangay, setSelectedBarangay] = useState(
    user?.barangay.code || ""
  );
  const [gender, setGender] = useState(user?.gender || "");
  const [password, setPassword] = useState(user?.password || "");
  const [email] = useState(user?.email || "");
  const [image, setImage] = useState(user?.image || "");
  const [loading, setLoading] = useState(false);
  const [newProfilePic, setNewProfilePic] = useState(image); // Initialize with current image
  const [isUpdatingProfilePic, setIsUpdatingProfilePic] = useState(false);


  const onlyCagayanV = [{ name: "Cagayan Valley", code: "020000000" }];

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
        `https://psgc.gitlab.io/api/regions/${regionCode}/provinces/` ||
          `https://psgc.gitlab.io/api/regions/${selectedRegion}/provinces/`
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

  useEffect(() => {
    getPermissionAsync();
  }, [newProfilePic]);

  const getPermissionAsync = async () => {
    let permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
    }
  };

  const selectImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const firstResult = result.assets[0];
      setNewProfilePic(firstResult.uri);
    }
  };

  const handleProfilePicAction = () => {
    if (image && !isUpdatingProfilePic) {
      Alert.alert(
        "Confirm Image Replacement",
        "Are you sure you want to replace the existing image?",
        [
          {
            text: "Cancel",
            style: "cancel",
          },
          {
            text: "OK",
            onPress: () => {
              setIsUpdatingProfilePic(true);
              selectImage();
            },
          },
        ]
      );
    } else {
      selectImage();
    }
  };

  const handleUpdate = async () => {
    try {
      setLoading(true);

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

      const formData = new FormData();
      formData.append("firstName", firstName);
      formData.append("lastName", lastName);
      formData.append("contactNumber", contactNumber);
      formData.append("gender", gender);
      formData.append("email", email);
      formData.append("regionName", regionName);
      formData.append("regionCode", regionCode);
      formData.append("provinceName", provinceName);
      formData.append("provinceCode", provinceCode);
      formData.append("cityName", cityName);
      formData.append("cityCode", cityCode);
      formData.append("barangayName", barangayName);
      formData.append("barangayCode", barangayCode);
      formData.append("password", password);

      if (newProfilePic !== image) {
        const uriParts = newProfilePic.split(".");
        const fileType = uriParts[uriParts.length - 1];
        const profilepicFileName = `image.${fileType}`;
        formData.append("image", {
          uri: newProfilePic,
          name: profilepicFileName,
          type: `image/${fileType}`,
        });
      }

      const { data } = await axios.put("/auth/update-user", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      setLoading(false);
      setState({
        ...state,
        user: data?.updatedUser,
        image: data?.updatedUser?.image,
      }); // Update the image state
      alert(data && data.message);
    } catch (error) {
      alert(error.response.data.message);
      setLoading(false);
      console.log(error);
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

        <View style={{ alignItems: "center" }}>
          <TouchableOpacity onPress={handleProfilePicAction}>
            <Image style={styles.imageborder} source={{ uri: host + image }} />
          </TouchableOpacity>
          <Text style={styles.username}>
            {state?.user.firstName} {state?.user.lastName}
          </Text>
        </View>

        <View style={{ paddingHorizontal: 20, marginTop: 20 }}>
          <Text style={{ fontSize: 16, fontWeight: "600" }}>
            Edit Information
          </Text>
        </View>
        {/* <View style={{ paddingHorizontal: 20, marginTop: 20 }}>
          <Text style={{ fontSize: 16, fontWeight: '600' }}>{image}</Text>
        </View> */}

        <View
          style={{
            paddingHorizontal: 32,
            flexDirection: "row",
            alignItems: "center",
            gap: 14,
          }}
        >
          <View style={{ flex: 1 }}>
            <TextInput
              style={styles.inputBox}
              value={firstName}
              onChangeText={(text) => setFirstName(text)}
              editable={false}
            />
          </View>

          <View style={{ flex: 1 }}>
            <TextInput
              style={styles.inputBox}
              value={lastName}
              onChangeText={(text) => setLastName(text)}
              editable={false}
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
          <View>
            <TextInput
              style={styles.inputBox}
              value={contactNumber}
              onChangeText={(text) => setContactNumber(text)}
            />
          </View>

          <View style={{ flex: 1 }}>
            <TextInput
              style={styles.inputBox}
              value={gender}
              onChangeText={(text) => setGender(text)}
              editable={false}
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
                data={onlyCagayanV}
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
                placeholder="Update Province"
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
                placeholder="Update City"
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
                placeholder="Update Barangay"
                value={selectedBarangay}
                onChange={(item) => setSelectedBarangay(item.code)}
              />
            </View>
          </View>

          <View>
            <TextInput
              style={styles.inputBoxLong}
              value={email}
              editable={false}
            />
          </View>

          <View>
            <TextInput
              style={styles.inputBoxLong}
              value={state?.user.role}
              editable={false}
            />
          </View>
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

export default AccountSetting;