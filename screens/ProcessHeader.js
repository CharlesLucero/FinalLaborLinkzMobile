import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

const ProcessHeader = ({ profilepost }) => {
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <FontAwesome
          name="user"
          size={50}
          color="#00CCAA"
          style={{ marginRight: 5, marginLeft: 5 }}
        />
        <View style={styles.textContainer}>
          <Text>{`Sender: ${application.senderId.firstName} ${application.senderId.lastName}`}</Text>
          <Text>{`Status: ${application.status}`}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    height: 120,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    marginBottom: 10,
  },
  headerContainer: {
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  textContainer: {
    marginLeft: 10,
  },
  name: {
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 5,
  },
  active: {
    fontSize: 12,
    color: "#00CCAA",
    marginTop: 2,
  },
});

export default ProcessHeader;
