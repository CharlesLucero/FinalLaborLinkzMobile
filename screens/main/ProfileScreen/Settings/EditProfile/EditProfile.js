import React, { useContext, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  TextInput,
  ScrollView,
} from "react-native";
import { Checkbox } from "react-native-paper";
import { Dropdown } from "react-native-element-dropdown";
import { Entypo, AntDesign } from "@expo/vector-icons";
import { AuthContext } from "../../../../../context/authContext";
import { InfoElectricianContext } from "../../../../../context/infoElectricianContext";
import { InfoPlumberContext } from "../../../../../context/infoPlumberContext";
import { InfoMaidContext } from "../../../../../context/infoMaidContext";
import { InfoCarpenterContext } from "../../../../../context/infoCarpenterContext";
import { InfoTechnicianContext } from "../../../../../context/infoTechnicianContext";
import { InfoDriverContext } from "../../../../../context/infoDriverContext";
import axios from "axios";
import { host } from "../../../../../APIRoutes";

const EditProfile = ({ navigation }) => {
  const [state, setState] = useContext(AuthContext);
  const { user, token } = state;

  //global sate
  const [info, setInfo] = useContext(
    InfoElectricianContext,
    InfoPlumberContext,
    InfoMaidContext,
    InfoCarpenterContext,
    InfoTechnicianContext,
    InfoDriverContext
  );
  //local state
  const [bio, setBio] = useState("");
  const [age, setAge] = useState("");
  const [job, setJob] = useState("");
  const [image, setImage] = useState(user?.image);
  const [loading, setLoading] = useState(false);
  const [isFocus, setIsFocus] = useState(false);
  const [checkboxes, setCheckboxes] = useState([
    { id: 1, label: "Carpenter", value: "Carpenter", checked: false },
    { id: 2, label: "Plumber", value: "Plumber", checked: false },
    { id: 3, label: "Electrician", value: "Electrician", checked: false },
    { id: 4, label: "Maid", value: "Maid", checked: false },
    { id: 5, label: "Driver", value: "Driver", checked: false },
    { id: 6, label: "Technician", value: "Technician", checked: false },
  ]);

  // const data = [
  //   { label: "Carpenter", job: "Carpenter" },
  //   { label: "Plumber", job: "Plumber" },
  //   { label: "Electrician", job: "Electrician" },
  //   { label: "Maid", job: "Maid" },
  //   { label: "Driver", job: "Driver" },
  //   { label: "Technician", job: "Technician" },
  // ];
  //   const handleCheckboxChange = (id) => {
  //     const updatedCheckboxes = checkboxes.map((checkbox) =>
  //       checkbox.id === id
  //         ? { ...checkbox, checked: !checkbox.checked }
  //         : checkbox
  //     );
  //     setCheckboxes(updatedCheckboxes);
  //   };
  const handleCheckboxChange = (id) => {
    const updatedCheckboxes = checkboxes.map((checkbox) =>
      checkbox.id === id
        ? { ...checkbox, checked: !checkbox.checked }
        : checkbox
    );
    setCheckboxes(updatedCheckboxes);
  };

  const renderLabel = () => {
    if (job || isFocus) {
      return <Text style={[styles.job, isFocus && { color: "blue" }]}></Text>;
    }
    return null;
  };

  //handle form data info data
  const handleSubmit = async () => {
    try {
      setLoading(true);
      if (!bio) {
        alert("Please add bio ");
      }
      if (!age) {
        alert("Please add age");
      }

      const checkedJobs = checkboxes
        .filter((checkbox) => checkbox.checked)
        .map((checkbox) => checkbox.label);

      if (checkedJobs.length === 0) {
        alert("Please select at least one job");
        setLoading(false);
        return;
      }

      const { data } = await axios.post("/information/create-info", {
        bio,
        age,
        job: checkedJobs,

      });
      setLoading(false);
      setInfo([...info, data?.info]);
      alert(data?.message);

      navigation.navigate("Home");
    } catch (error) {
      alert(error.response.data.message || error.message);
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "#ffffff", marginTop: 30 }}
    >
      <View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ paddingHorizontal: 20, marginTop: 25 }}>
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
            <Image
              source={{
                uri:
                host+state?.user.image 
                                }}
                                style={{
                height: 150,
                width: 150,
                borderRadius: 100,
                borderWidth: 2,
                borderColor: "#343434",
              }}
            ></Image>
            <Text style={styles.username}>
              {state?.user.firstName} {state?.user.lastName}
            </Text>
          </View>

          <View style={styles.infoContainer}>
            <Text style={styles.textInfo}>Edit Information</Text>
          </View>

          {/* <View style={{ flex: 1 }}>
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
              valueField="job"
              placeholder={!isFocus ? "Job" : "..."}
              searchPlaceholder="Search..."
              value={job}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={(item) => {
                setJob(item.job);
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
          </View> */}

          <View style={styles.textInputContainer}>
            <TextInput
              style={styles.textInput}
              placeholder="Bio"
              placeholderTextColor={"#00CCAA"}
              value={bio}
              onChangeText={(text) => setBio(text)}
            />
          </View>

          <View style={styles.textInputContainer}>
            <TextInput
              style={styles.textInput}
              placeholder="Age"
              placeholderTextColor={"#00CCAA"}
              value={age}
              onChangeText={(text) => setAge(text)}
            />
          </View>

          {/* <View style={{ paddingHorizontal: 30, marginTop: 20 }}>
            <TextInput
              style={{
                backgroundColor: "#F6F6F6",
                height: 50,
                borderWidth: 0.3,
                borderRadius: 15,
                paddingLeft: 15,
              }}
              placeholder="Job eg; Carpenter, Plumber, Electrician, Maid, Driver, Technician"
              placeholderTextColor={"#00CCAA"}
              value={job}
              onChangeText={(text) => setJob(text)}
            />
          </View> */}

         
          <View style={styles.infoContainer}>
            <Text style={styles.textInfo}>Job/s </Text>
          </View>
          <View style={styles.checkboxContainer}>
            <View>
              {checkboxes.map((checkbox) => (
                <TouchableOpacity
                  key={checkbox.id}
                  onPress={() => handleCheckboxChange(checkbox.id)}
                >
                  <View style={styles.check}>
                    <Text style={styles.textCheckbox}>{checkbox.label}</Text>
                    <Checkbox
                      status={checkbox.checked ? "checked" : "unchecked"}
                      onPress={() => handleCheckboxChange(checkbox.id)}
                      color="#00CCAA"
                      alignItems="flex-end"
                    />
                    {checkbox.checked && <View style={styles.check}></View>}
                  </View>
                </TouchableOpacity>
              ))}
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
                backgroundColor: "#343434",
                width: 220,
                height: 45,
                borderRadius: 18,
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={handleSubmit}
            >
              <Text style={{ fontWeight: "500", color: "#00CCAA" }}>Save</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  username: {
    color: "#00CCAA",
    fontSize: 32,
    fontWeight: "600",
    marginTop: 10,
  },
  infoContainer: {
    paddingHorizontal: 25,
    marginTop: 20,
  },
  textInfo: {
    fontSize: 16,
    fontWeight: "600",
  },
  dropdown: {
    backgroundColor: "#F6F6F6",
    height: 50,
    borderColor: "gray",
    borderWidth: 0.3,
    borderRadius: 15,
    paddingHorizontal: 8,
    paddingLeft: 15,
    marginHorizontal: 28,
  },
  textInputContainer: {
    paddingHorizontal: 30,
    marginTop: 20,
  },
  textInput: {
    borderColor: "#D2CECE",
    height: 50,
    borderWidth: 0.3,
    borderRadius: 15,
    paddingLeft: 15,
    fontWeight: "500",
    fontSize: 15,
  },
  icon: {
    marginRight: 5,
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
  checkboxContainer: {
    paddingHorizontal: 30,
    marginTop: 20,
  },
  check: {
    flexDirection: "row",
    marginBottom: 10,
    borderColor: "#D2CECE",
    height: 50,
    borderWidth: 0.3,
    borderRadius: 15,
    paddingLeft: 15,
    marginBottom: 20,
  },
  textCheckbox: {
    alignItems: "center",
    fontWeight: "500",
    fontSize: 15,
    paddingTop: 15,
    color: "#00CCAA",
  },
});
export default EditProfile;