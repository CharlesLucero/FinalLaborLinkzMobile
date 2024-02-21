import React, { useState, useEffect } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import axios from "axios";

const ViewProfile = ({ route }) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = route.params?.profilepost?.postedBy?._id || route.params?.profileData?.createdBy?._id;

        if (userId) {
          const response = await axios.get(`/viewprofile/users/${userId}/profile`);
          setUserData(response.data);
          setLoading(false);
        } else {
          console.log("User ID not found in route parameters.");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [route.params]);

  if (loading) {
    return <ActivityIndicator size="large" color="#00CCAA" />;
  }

  return (
    <View>
      <Text>User Information:</Text>
      {userData && (
        <View>
          <Text>First Name: {userData.userInfo.firstName}</Text>
          <Text>Last Name: {userData.userInfo.lastName}</Text>
          <Text>Contact Number: {userData.userInfo.contactNumber}</Text>
          <Text>Gender: {userData.userInfo.gender}</Text>
          <Text>Location: {userData.userInfo.location}</Text>
          <Text>Email: {userData.userInfo.email}</Text>
          {/* Render user posts */}
          <Text>User Posts:</Text>
          {userData.userPosts.map((post) => (
            <View key={post._id}>
              <Text>Title: {post.title}</Text>
              <Text>Description: {post.description}</Text>
              <Text>Rate: {post.minRate} - {post.maxRate}</Text>
            </View>
          ))}
          {/* Render additional user information */}
          <Text>Additional Information:</Text>
          <Text>Bio: {userData.userAdditionalInfo.bio}</Text>
          <Text>Age: {userData.userAdditionalInfo.age}</Text>
          <Text>Job: {userData.userAdditionalInfo.job}</Text>
          <Text>Address: {userData.userAdditionalInfo.address}</Text>
        </View>
      )}
    </View>
  );
};

export default ViewProfile;
