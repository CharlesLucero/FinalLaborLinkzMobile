import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { Feather, Entypo } from "@expo/vector-icons";

const AccountVerification = ({ navigation }) => {
  return (
    <SafeAreaView style={{ backgroundColor: "#FFFFFF", flex: 1 }}>

    <View style={{paddingHorizontal: 24,paddingVertical: 20,}}>
            <TouchableOpacity onPress={() => navigation.navigate('Setting')}>
              <Entypo name="chevron-left" size={32} color="#A9A9A9" />
            </TouchableOpacity>
          </View>

      <Image
        source={require("../../../../../assets/image/verification.jpg")}
        style={styles.image}
      />
      <View>
        <Text style={styles.header}>Verifying Your Identity</Text>
        <Text style={styles.details}>
          Please submit the following documents
        </Text>
        <View>
          <View style={styles.idContainer}>
            <Feather
              name="image"
              size={24}
              color="#00CCAA"
              style={styles.icon}
            />
            <Text style={styles.content}>Select which type of ID</Text>
          </View>
          <Text style={styles.info}>
            Select the appropriate type of ID document {"\n"}from the dropdown menu provided.
          </Text>
        </View>
        <View>
          <View style={styles.idContainer}>
            <Feather
              name="image"
              size={24}
              color="#00CCAA"
              style={styles.icon}
            />
            <Text style={styles.content}>Take a picture of a valid ID</Text>
          </View>
          <Text style={styles.info}>
            To check if your personal information{"\n"}is correct
          </Text>
        </View>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Verification')}>
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  image: {
    height: "40%",
    width: "90%",
    borderRadius: 20,
    margin: 20,
    alignSelf: "center",
  },
  header: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "600",
    color: "#00CCAA",

  },
  details: {
    textAlign: "center",
    fontSize: 15,
    fontWeight: "400",
    color: "#C8C8C8",
    marginTop: 10,
  },
  icon: {
    paddingHorizontal: 20,
  },
  idContainer: {
    flexDirection: "row",
    backgroundColor: "#F6F6F6",
    marginHorizontal: 30,
    borderRadius: 5,
    marginTop: 20,
    padding: 30,
  },
  content: {
    left: 0,
    fontSize: 15,
    fontWeight: "500",
    marginBottom: 30,
  },
  info: {
    marginLeft: 50, // Adjusted marginLeft to move it to the right
    fontSize: 12,
    position: "absolute",
    top: "60%",
    left: "18.5%",
  },
  button: {
    backgroundColor: "#00CCAA",
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 30,
    alignSelf: "center",
    marginTop: 40,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "600",
    
  },
});

export default AccountVerification;
