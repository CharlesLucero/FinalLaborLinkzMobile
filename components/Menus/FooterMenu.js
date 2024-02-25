import { View, Text, TouchableOpacity, StyleSheet, Platform} from "react-native";
import React, {useEffect} from "react";
import { FontAwesome, AntDesign, MaterialCommunityIcons, Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { useNavigation, useRoute } from "@react-navigation/native";
import * as SecureStore from 'expo-secure-store';
import { Alert } from "react-native";

const FooterMenu = ({}) => {
    // Hooks
    const route = useRoute();
    const navigation = useNavigation();

    const navigateToScreen = async (screenName) => {
        // If user is not logged in, display alert and prevent navigation
        const token = await SecureStore.getItemAsync('jwtToken');
        if (!token) {
            Alert.alert('Login Required', 'You must log in first.');
            return;
        }
        // If logged in, navigate to the specified screen
        navigation.navigate(screenName);
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigateToScreen('Home')}>
                <FontAwesome style={styles.iconStyle} name="home" size={30} color={route.name === "Home" ? "#00CCAA" : "#343434"} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigateToScreen('Message')}>
                <Ionicons name="notifications" size={30} color={route.name === "Message" ? "#00CCAA" : "#343434"} />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigateToScreen('Favorite')}>
                <AntDesign name="heart" size={30} color={route.name === "Favorite" ? "#00CCAA" : "#343434"} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigateToScreen('Account')}>
                <FontAwesome5 name="user-cog" size={28} color={route.name === "Account" ? "#00CCAA" : "#343434"} />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around', // Changed to evenly space the icons
        backgroundColor: 'white',
        position: 'absolute',
        bottom: 0,
        width: '100%',
        paddingHorizontal: 20,
        paddingVertical: 24, // Reduced padding between icons
        borderRadius: 16,
        ...Platform.select({
            ios: {
                shadowColor: "#000",
                shadowOffset: {
                    width: 0,
                    height: -2,
                },
                shadowOpacity: 0.5,
                shadowRadius: 10,
            },
            // android: {
            //     elevation: -4,
            // },
        }),
    },
    iconStyle: {
        alignSelf: 'center',
    },
});

export default FooterMenu;