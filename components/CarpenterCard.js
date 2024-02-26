import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { ImageF, host } from "../APIRoutes";
import { AuthContext } from "../context/authContext";
import React, { useState, useContext } from "react";
import {
  AntDesign,
  FontAwesome,
  Entypo,
  MaterialIcons,
  Octicons,
  Feather,
} from "@expo/vector-icons";
import moment from "moment";
import { useNavigation } from "@react-navigation/native";

const CarpenterCard = ({ info }) => {
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
              <Image
                style={styles.imageborder}
                source={{ uri: host + infos?.createdBy?.image }}
              />

              <Text style={styles.name}>
                {infos?.createdBy?.firstName} {infos?.createdBy?.lastName}{" "}
                {"\n"}
                <View>
                  <Text style={styles.info}>
                    <Feather name="map-pin" size={24} color="#00CCAA" />{" "}
                    {infos?.createdBy?.barangay?.name},{" "}
                    {infos?.createdBy?.city?.name}{" "}
                    {infos?.createdBy?.province?.name}
                  </Text>
                </View>
                {"\n"}
                <View>
                  <Text style={styles.info}>
                    <AntDesign name="contacts" size={24} color="#00CCAA" />
                    <Text style={styles.info1}> {infos?.createdBy?.contactNumber}</Text>
                  </Text>
                </View>
                {"\n"}
                <View>
                  <Text style={styles.info}>
                  <Feather name="file-text" size={24} color="#00CCAA" />
                  <Text style={styles.info1}>{infos?.bio}</Text>
                  </Text>
                </View>

              
              </Text>


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
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
    marginVertical: 10,
    paddingHorizontal: 40,
  },
  imageborder: {
    height: 80,
    width: 80,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: "#00CCAA",
    marginTop: 20,
  
  },
  name: {
    fontSize: 20,
    marginTop: 5,
    fontWeight: "500",
    color: "#FFFFFF",
    paddingLeft: 10,
  },
  icon: {
    flexDirection: "row",
    marginTop: 10,
  },
  info: {
    fontSize: 13,
    color: "#FFFFFF",
    paddingLeft: 10,
    marginTop: 5,
  },

  info1: {
    fontSize: 13,
    color: "#FFFFFF",
    marginTop: 10,
    marginLeft: 14,
  },
  alignEverything: {
    flexDirection: "row",
  },
});
export default CarpenterCard;
