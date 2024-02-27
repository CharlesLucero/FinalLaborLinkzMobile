import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { host } from "../APIRoutes";
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
export default CarpenterCard;



// import React, { useState, useContext } from "react";
// import { View, Text, StyleSheet, TouchableOpacity, Image, Modal, Button, Alert } from "react-native";
// import { useNavigation } from "@react-navigation/native";
// import { AuthContext } from "../context/authContext";
// import axios from "axios";
// import { host } from "../APIRoutes";

// const CarpenterCard = ({ info }) => {
//   const navigation = useNavigation();
//   const [state, setState] = useContext(AuthContext);
//   const { user, token } = state;
//   const [image, setImage] = useState(user?.image);
//   const [selectedCarpenter, setSelectedCarpenter] = useState(null);
//   const [isModalVisible, setIsModalVisible] = useState(false);

//   const handleViewProfile = (infos) => {
//     setSelectedCarpenter(infos);
//     setIsModalVisible(true);
//   };

//   const handleApply = async () => {
//     if (!user) {
//       Alert.alert("Login Required", "Please log in first to apply for this carpenter.");
//       return;
//     }

//     try {
//       // Perform application submission logic here
//       // For example:
//       // const response = await axios.post("/apply", { userId: user.id, carpenterId: selectedCarpenter.id });
//       // Handle response accordingly
//       Alert.alert("Application Submitted", "Your application has been successfully submitted.");
//       setIsModalVisible(false);
//     } catch (error) {
//       console.error("Error submitting application:", error);
//       Alert.alert("Error", "Failed to submit application. Please try again later.");
//     }
//   };

//   return (
//     <View>
//       <Text style={styles.total}>
//         There are <Text style={{ color: '#00CCAA', fontWeight: '500' }}>{info?.length}</Text> Available Carpenters
//       </Text>
//       {info?.map((infos, i) => (
//         <View style={styles.card} key={i}>
//           <TouchableOpacity onPress={() => handleViewProfile(infos)}>
//             <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
//               <View>
//                 <Image
//                   style={{ height: 50, width: 50, borderRadius: 100, borderWidth: 1, borderColor: "black" }}
//                   source={{ uri: host + infos?.createdBy?.image }}
//                 />
//               </View>
//               <View style={{ flexDirection: 'column' }}>
//                 <Text style={{ fontSize: 14, color: '#00CCAA', fontWeight: 500 }}>
//                   {infos?.createdBy?.firstName} {infos?.createdBy?.lastName}
//                 </Text>
//                 <View>
//                   <Text style={{ marginTop: 2, fontSize: 14, color: 'white' }}>
//                     {infos?.createdBy?.barangay?.name}, {infos?.createdBy?.city?.name} {infos?.createdBy?.province?.name}
//                   </Text>
//                 </View>
//               </View>
//             </View>
//           </TouchableOpacity>
//         </View>
//       ))}
//       {/* Application Modal */}
//       <Modal
//         animationType="fade"
//         transparent={true}
//         visible={isModalVisible}
//         onRequestClose={() => setIsModalVisible(false)}
//       >
//         <View style={styles.modalContainer}>
//           <View style={styles.modalContent}>
//             <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>
//               Applying for {selectedCarpenter?.createdBy?.firstName}'s Carpentry Services
//             </Text>
//             <Text style={{ marginBottom: 20 }}>
//               Write a brief message to {selectedCarpenter?.createdBy?.firstName} explaining why you're interested in their services.
//             </Text>
//             {/* Add any input fields or text areas for application message here */}
//             <Button title="Apply" onPress={handleApply} />
//             <Button title="Cancel" onPress={() => setIsModalVisible(false)} />
//           </View>
//         </View>
//       </Modal>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   total: {
//     color: "black",
//     textAlign: "center",
//     marginBottom: 20
//   },
//   card: {
//     width: "100%",
//     backgroundColor: "#343434",
//     paddingHorizontal: 20,
//     paddingVertical: 14,
//     borderRadius: 20,
//     marginBottom: 10,
//     height: 'auto',
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 10,
//   },
//   modalContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//   },
//   modalContent: {
//     backgroundColor: 'white',
//     padding: 20,
//     borderRadius: 10,
//     width: 300,
//   },
// });

// export default CarpenterCard;
