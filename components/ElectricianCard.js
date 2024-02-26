import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { ImageF } from "../APIRoutes";
import { AuthContext } from "../context/authContext";
import React, { useState, useContext } from "react";
import {
  AntDesign,
  FontAwesome,
  Entypo,
  MaterialIcons,
  Octicons,
  Feather
} from "@expo/vector-icons";
import moment from "moment";
import { useNavigation } from "@react-navigation/native";

const ElectricianCard = ({ info }) => {
  const navigation = useNavigation();
  const [state, setState] = useContext(AuthContext);
  const { user, token } = state;
  const [image, setImage] = useState(user?.image);


  const handleView = (infos) => {
    navigation.navigate("ViewProfile", { profileData: infos });
    console.log(infos);
  };

  return (
    <View>
      <Text style={styles.total}>
        There are {info?.length} Available Carpenters
      </Text>
      {info?.map((infos, i) => (
        <View style={styles.card} key={i}>
          <TouchableOpacity onPress={() => handleView(infos)}>
            <View style={styles.alignEverything}>
              {/* <Image
                style={styles.imageborder}
                source={{ uri: infos?.createdBy?.image }}
              /> */}

              <Text style={styles.name}>
                {infos?.createdBy?.firstName} {infos?.createdBy?.lastName}{infos?.createdBy?.contactNumber}{" "}
              </Text>
            </View>
            <View style={styles.icon}>
            <Feather name="map-pin" size={24} color="#00CCAA" />
              <Text style={styles.info}>{" "}{infos?.address}
              </Text>
            </View>
            <View style={styles.icon}>
              <Text style={styles.info}>
                Job: {infos?.job}
              </Text>
            </View>
            <View style={styles.icon}>
              <Text style={styles.info}>
                Age: {infos?.age}
              </Text>
            </View>
            <View style={styles.icon}>
                <Text style={styles.info}>
                  Contact Number: {infos?.createdBy?.contactNumber}
                </Text>
            </View>
            <View style={styles.icon1}>
              <Text style={styles.info1}>Bio: {infos?.bio}</Text>
            </View>
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  total: {
    color: "green",
    marginTop: 20,
    textAlign: "center",
  },
  card: {
    width: "100%",
    backgroundColor: "#343434",
    padding: 20,
    borderRadius: 10,
    marginBottom: 10,
    marginVertical: 10,
    paddingHorizontal: 40,
  },
  imageborder: {
    height: 60,
    width: 60,
    borderRadius: 100,
    borderWidth: 1,
    // borderColor: "black",
  },
  alignEverything: {
    flexDirection: "row",
  },
  name: {
    fontSize: 20,
    marginLeft: 5,
    marginTop: 10,
    fontWeight: "500",
    color: "#FFFFFF",
    
  },
  icon: {
    flexDirection: "row",
    marginTop: 10,
    marginLeft: 10,
  },
  info: {
    fontSize: 15,
    alignSelf: "center",
    color: "#FFFFFF",
  },
  icon1: {
    borderBottomWidth: 1,
    color: "#000000",
    marginLeft: 5,
    textDecorationLine: "underline",
  },
  info1: {
    fontSize: 13,
    alignSelf: "baseline",
    color: "#FFFFFF",
    marginTop: 20,
    marginBottom: 5,
    marginLeft: 7,
  },
});
export default ElectricianCard;
