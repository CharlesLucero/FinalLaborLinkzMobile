import { View, Text, TouchableOpacity, StyleSheet, Platform} from "react-native";
import React from "react";
import { FontAwesome, AntDesign, MaterialCommunityIcons, Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { useNavigation, useRoute } from "@react-navigation/native";

const FooterMenu = ({}) => {
    // Hooks
    const route = useRoute();
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                <FontAwesome style={styles.iconStyle} name="home" size={30} color={route.name === "Home" ? "#00CCAA" : "#343434"} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Message')}>
                <Ionicons name="notifications" size={30} color={route.name === "Message" ? "#00CCAA" : "#343434"} />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('Favorite')}>
                <AntDesign name="heart" size={30} color={route.name === "Favorite" ? "#00CCAA" : "#343434"} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Account')}>
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
