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
} from "@expo/vector-icons";
import moment from "moment";
import { useNavigation } from "@react-navigation/native";

const TechnicianCard = ({ info }) => {
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
        There are {info?.length} Available Electricians
      </Text>
      {info?.map((infos, i) => (
        <View style={styles.card} key={i}>
          <TouchableOpacity onPress={() => handleView(infos)}>
            <View style={styles.alignEverything}>
            <Image style={styles.imageborder} source={{ uri: infos?.createdBy?.image }} />

              <Text style={{ fontSize: 20, marginBottom: 10 }}>
                {""}
                {infos?.createdBy?.firstName} {infos?.createdBy?.lastName}{" "}

                {"\n"}
                  <Text style={{ fontSize: 12, paddingLeft: 6 }}>
                    {" "}
                    {infos?.job}
                  </Text>{" "}
                  {"\n"}
                  <Text style={{ fontSize: 12, paddingLeft: 6 }}>
                    {" "}
                    {infos?.address}
                  </Text>
              </Text>

              {/* <Text style = {{borderBottomWidth: .5}}></Text> */}
            </View>

            {/* <View style = {{marginTop: 15, flexDirection:'row'}}>
                            <Entypo name="info-with-circle" size={24} color="#00CCAA" />
                            <Text style = {{fontSize: 18, paddingLeft: 6}}>Bio: {infos?.bio}</Text>
                        </View>

                        <Text style = {{borderBottomWidth: .5, borderColor: 'black'}}></Text>
                        
                        <View style = {{marginTop: 15, flexDirection:'row'}}>
                            <Octicons name="number" size={24} color="#00CCAA" />
                            <Text style = {{fontSize: 18, paddingLeft: 6}}>Age: {infos?.age}</Text>
                        </View>

                        <Text style = {{borderBottomWidth: .5, borderColor: 'black'}}></Text>

            <View style = {{marginTop: 5, flexDirection:'row'}}>
                            <MaterialIcons name="hardware" size={24} color="#00CCAA" />
                            <Text style = {{fontSize: 12, paddingLeft: 6}}> {infos?.job}</Text>
                        </View>

            <Text style = {{borderBottomWidth: .5, borderColor: 'black'}}></Text>

            <View style = {{marginTop: 2, flexDirection:'row'}}>
                            <Entypo name="address" size={24} color="#00CCAA" />
                            <Text style = {{fontSize: 12, paddingLeft: 6}}> {infos?.address}</Text>
                        </View> */}
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
    backgroundColor: "#F6F6F6",
    padding: 20,
    borderRadius: 5,
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
  }
});
export default TechnicianCard;
