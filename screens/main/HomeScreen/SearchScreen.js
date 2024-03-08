import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import axios from "axios";
import { host } from "../../../APIRoutes";

const SearchScreen = ({ navigation }) => {
  const [search, setSearch] = useState("");
  const [infos, setInfos] = useState([]);
  const [originalInfos, setOriginalInfos] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    fetchAllInfo();
  }, []);

  const fetchAllInfo = async () => {
    try {
      const response = await axios.get("information/get-all-info");
      setInfos(response.data.infos);
      setOriginalInfos(response.data.infos);
    } catch (error) {
      console.error("Error fetching info:", error);
    }
  };

  const handleSearch = (text) => {
    setSearch(text);
    setSearchText(text); // Update the search text
    if (text.trim() === "") {
      // If search query is empty, reset to show all original infos
      setInfos(originalInfos);
    } else {
      // Filter the original infos based on search query
      const filtered = originalInfos.filter(
        (info) =>
          (info.createdBy.firstName.toLowerCase().includes(text.toLowerCase()) ||
            info.createdBy.lastName.toLowerCase().includes(text.toLowerCase())) ||
          (info.job &&
            info.job.some(
              (job) =>
                typeof job === "string" &&
                job.toLowerCase().includes(text.toLowerCase())
            ))
      );
      setInfos(filtered);
    }
  };

  const handleView = (info) => {
    navigation.navigate("ViewProfile", { profileData: info });
    console.log(info);
  };

  return (
    <SafeAreaView style={{ backgroundColor: "#F6F6F6", flex: 1 }}>
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View
            style={{
              paddingHorizontal: 8,
              flexDirection: "row",
              backgroundColor: "#FFFFFF",
            }}
          >
            <View
              style={{ paddingTop: 20, paddingRight: 5, flexDirection: "row" }}
            >
              <TouchableOpacity>
                <Entypo
                  name="chevron-left"
                  size={24}
                  color="black"
                  onPress={() => navigation.navigate("Home")}
                />
              </TouchableOpacity>
            </View>
            <View style={{ flex: 1, paddingBottom: 8 }}>
              <TextInput
                style={styles.inputBoxSearch}
                value={search}
                placeholder="Search"
                onChangeText={handleSearch}
              />
            </View>
          </View>

          <View style={{ marginTop: 20, paddingHorizontal: 10 }}>
            {infos.length === 0 ? (
              // Display "No results found" when there are no matching search results
              <Text style={{ textAlign: "center" }}>No results found for "{searchText}"</Text>
            ) : (
              infos.map((info) => (
                <View
                  key={info._id}
                  style={{
                    marginBottom: 20,
                    paddingHorizontal: 30,
                    backgroundColor: "#FFFFFF",
                    paddingVertical: 20,
                    borderRadius: 15,
                  }}
                >
                  <TouchableOpacity onPress={() => handleView(info)}>
                    <View style={{ flexDirection: "row", gap: 8 }}>
                      <Image
                        style={{
                          height: 60,
                          width: 60,
                          borderRadius: 100,
                          borderWidth: 1,
                          borderColor: "black",
                        }}
                        source={{ uri: host + info?.createdBy?.image }}
                      />
                      <View style={{ flexDirection: "column", marginTop: 7 }}>
                        <Text
                          style={{
                            fontSize: 18,
                            fontWeight: "600",
                            color: "#000000",
                          }}
                        >
                          {info?.createdBy?.firstName} {info?.createdBy?.lastName}
                        </Text>
                        <Text
                          style={{
                            color: "#00CCAA",
                            fontSize: 12,
                            fontWeight: "500",
                          }}
                        >
                          {info?.job}
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>
              ))
            )}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    margin: 10,
    marginTop: 40,
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
  inputBoxSearch: {
    backgroundColor: "white",
    fontSize: 10,
    height: 50,
    borderRadius: 15,
    borderColor: "black",
    borderWidth: 1,
    fontSize: 15,
    paddingHorizontal: 15,
    marginTop: 10,
  },
});

export default SearchScreen;
