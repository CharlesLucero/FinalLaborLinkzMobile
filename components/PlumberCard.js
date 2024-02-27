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

const PlumberCard = ({ info }) => {
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
        There are <Text style={{color: '#00CCAA', fontWeight: 500}}>{info?.length}</Text> Available Carpenters
      </Text>
      {info?.map((infos, i) => (
        <View style={styles.card} key={i}>
          <TouchableOpacity onPress={() => handleView(infos)}>
            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10}}>
              <View>
                <Image
                  style={{
                    height: 50,
                    width: 50,
                    borderRadius: 100,
                    borderWidth: 1,
                    borderColor: "black",
                  }}
                  source={{ uri: host + infos?.createdBy?.image }}
                />
              </View>
                <View style={{flexDirection: 'column'}}>
                <Text style={{fontSize: 14, color: '#00CCAA', fontWeight: 500}}>
                  {infos?.createdBy?.firstName} {infos?.createdBy?.lastName}{" "}
                </Text>

                <View>
                  <Text style={{marginTop: 2, fontSize: 14, color: 'white'}}>
                    {infos?.createdBy?.barangay?.name},{" "}
                    {infos?.createdBy?.city?.name}{" "}
                    {infos?.createdBy?.province?.name}
                  </Text>
                </View>
              </View>

            </View>
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  total: {
    color: "black",
    textAlign: "center",
    marginBottom: 20
  },
  imageborder: {
    height: 50,
    width: 50,
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
  card: {
    width: "100%",
    backgroundColor: "#343434",
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderRadius: 20,
    marginBottom: 10,
    height: 'auto',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
});
export default PlumberCard;
