import { View, Text, StyleSheet, TouchableOpacity, Modal, Button, Pressable, TextInput } from "react-native";
import React, { useState, useEffect } from "react";
import { AntDesign, FontAwesome, Entypo, MaterialIcons, EvilIcons, Octicons } from '@expo/vector-icons';
import moment from 'moment';
import axios from "axios";
const InformationCards = ({ info, navigation }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedInfo, setSelectedInfo] = useState(null);
    const [loading, setLoading] = useState(false);
    const [bio, setBio] = useState('');
    const [age, setAge] = useState('');
    const [job, setJob] = useState('');
    const [checkboxes, setCheckboxes] = useState([
        { id: 1, label: "Carpenter", value: "Carpenter ", checked: false },
        { id: 2, label: "Plumber", value: "Plumber ", checked: false },
        { id: 3, label: "Electrician", value: "Electrician ", checked: false },
        { id: 4, label: "Maid", value: "Maid ", checked: false },
        { id: 5, label: "Driver", value: "Driver ", checked: false },
        { id: 6, label: "Technician", value: "Technician ", checked: false },
    ]);

    useEffect(() => {
    if (selectedInfo) {
        setBio(selectedInfo.bio || ''); // Make sure it's a string or set default to empty string
        setAge(selectedInfo.age ? String(selectedInfo.age) : ''); // Convert to string or set default to empty string
        setJob(selectedInfo.job || '');
      
    }
}, [selectedInfo]);

const handleCheckboxChange = (id) => {
    const updatedCheckboxes = checkboxes.map((checkbox) =>
        checkbox.id === id
            ? { ...checkbox, checked: !checkbox.checked }
            : checkbox
    );
    setCheckboxes(updatedCheckboxes);
};


    const handleEdit = (selectedInfo) => {
        setSelectedInfo(selectedInfo);
        setModalVisible(true);
    };

    const handleCloseModal = () => {
        setSelectedInfo(null);
        setModalVisible(false);
    };

    const handleUpdate = async () => {
        try {
            setLoading(true);
            const checkedJobs = checkboxes
                .filter((checkbox) => checkbox.checked)
                .map((checkbox) => checkbox.label)
                .join(", ");

            const response = await axios.put(`information/update-info/${selectedInfo._id}`, {
                bio,
                age,
                job: checkedJobs
            });
            const updatedInfo = response.data.info;
            // Update local state with new information
            setSelectedInfo(updatedInfo);
            setLoading(false);
            setModalVisible(false);
        } catch (error) {
            console.error("Error updating information:", error);
            setLoading(false);
            // Handle error and provide feedback to the user
        }
    };


    return (
        <View>
            {info?.map((infos, i) => (
                <View style={styles.card} key={i}>
                    <Text style={{ textAlign: 'right' }}>
                        <FontAwesome name="pencil" size={16} color="darkblue" onPress={() => handleEdit(infos)} />
                    </Text>
                    <View style={{ flexDirection: 'row', borderBottomWidth: 1, paddingVertical: 15 }}>
                        <Entypo name="info-with-circle" size={24} color="#00CCAA" />
                        <Text style={styles.info}>   Bio:  {infos?.bio}</Text>
                        <Text style={{ borderBottomWidth: .5 }}></Text>
                    </View>
                    <View style={{ flexDirection: 'row', borderBottomWidth: 1, paddingVertical: 15 }}>
                        <Octicons name="number" size={24} color="#00CCAA" />
                        <Text style={styles.info}>     Age:  {infos?.age}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', borderBottomWidth: 1, paddingVertical: 15 }}>
                        <MaterialIcons name="hardware" size={24} color="#00CCAA" />
                        <Text style={styles.info}>   Job:   {infos?.job}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', paddingVertical: 15 }}>
                        <Entypo name="address" size={24} color="#00CCAA" />
                        <Text style={styles.info}>  Location: {" "}
                            {infos?.createdBy?.barangay?.name},{" "}
                            {infos?.createdBy?.city?.name}{" "}
                            {infos?.createdBy?.province?.name} </Text>
                    </View>
                </View>
            ))}
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <TouchableOpacity
                    activeOpacity={1}
                    onPress={handleCloseModal} // Close modal when background is pressed
                    style={styles.modalContainer}
                >
                    <View style={styles.centeredView}>
                        <View style={[styles.modalContent, { zIndex: 10 },]}>
                            <TouchableOpacity onPress={handleCloseModal} style={styles.closeButton}>
                                <FontAwesome name="times-circle" size={24} color="#333" />
                            </TouchableOpacity>
                            <View style={{ paddingHorizontal: 30, marginTop: 20 }}>
                                <TextInput
                                    style={{ backgroundColor: '#F6F6F6', height: 50, borderWidth: .3, borderRadius: 15, paddingLeft: 15 }}
                                    placeholder='Bio'
                                    placeholderTextColor={'#00CCAA'}
                                    value={bio}
                                    onChangeText={(text) => setBio(text)}
                                />
                            </View>
                            <View style={{ paddingHorizontal: 30, marginTop: 20 }}>
                                <TextInput
                                    style={{ backgroundColor: '#F6F6F6', height: 50, borderWidth: .3, borderRadius: 15, paddingLeft: 15 }}
                                    placeholder='Age'
                                    placeholderTextColor={'#00CCAA'}
                                    value={age}
                                    onChangeText={(text) => setAge(text)}
                                />
                            </View>
                            <View style={styles.jobContainer}>
                                {checkboxes.map((checkbox) => (
                                    <TouchableOpacity
                                        key={checkbox.id}
                                        onPress={() => handleCheckboxChange(checkbox.id)}
                                        style={[styles.jobItem, { backgroundColor: checkbox.checked ? '#00CCAA' : 'transparent' }]}
                                    >
                                        <Text style={[styles.jobText, { color: checkbox.checked ? '#FFF' : '#00CCAA' }]}>{checkbox.label}</Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                           
                            <View style={styles.btnContainer}>
                            <Pressable
    style={[styles.button, styles.buttonClose]}
    onPress={() => {
        setLoading(true);
        handleUpdate(); // Call handleUpdate function here
    }}
>
    <Text style={styles.textStyle}>{loading ? 'Please Wait' : 'UPDATE'}</Text>
</Pressable>



                                <Pressable style={[styles.button, styles.buttonClose]} onPress={handleCloseModal}>
                                    <Text style={styles.textStyle}>CANCEL</Text>
                                </Pressable>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    info: {
        textAlign: 'center',
        color: 'black',
        fontWeight: '500'
    },
    jobContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        marginTop: 20,
    },
    jobItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        width: '31%',
        borderColor: '#D2CECE',
        height: 50,
        borderWidth: 0.3,
        borderRadius: 15,
        paddingLeft: 5,
        marginBottom: 20,
    },
    card: {
        paddingHorizontal: 50,
        backgroundColor: "#343434",
        padding: 20,
        borderRadius: 5,
        color: "#FFFFFF",
        marginHorizontal: 10,
        marginTop: 10,
    },
    info: {
        textAlign: 'center',
        color: '#FFFFFF',
        fontWeight: '500'
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
    },
    card: {
        width: "100%",
        backgroundColor: "#343434",
        padding: 20,
        borderRadius: 5,
        marginBottom: 10,
        marginVertical: 10,
        height: "auto",
    },
    modalContainer: {
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.8)",
    },
    modalContent: {
        backgroundColor: "white",
        padding: 20,
        borderRadius: 10,
        elevation: 5,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        width: 340,
        maxHeight: 500,
        overflow: "auto",
    },
    btnContainer: {
        flexDirection: 'row'
    },
    button: {
        borderRadius: 10,
        padding: 10,
        elevation: 2,
        backgroundColor: 'black',
        width: 100,
        margin: 10,
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    buttonOpen: {
        //backgroundColor: '#F194FF',//
    },
    buttonClose: {
        ///backgroundColor: '#2196F3',//
    },
})

export default InformationCards;