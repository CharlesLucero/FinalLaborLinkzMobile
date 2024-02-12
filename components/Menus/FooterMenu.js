import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { FontAwesome, AntDesign, MaterialCommunityIcons   } from '@expo/vector-icons';
import { useNavigation, useRoute } from "@react-navigation/native";
const FooterMenu = ({}) => {
    //hooks
    const route = useRoute();
    const navigation = useNavigation();


    return(
        <View style = {styles.container}>

        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
            <FontAwesome style= {styles.iconStyle} name="home" size={30} color={route.name === "Home" && "#00CCAA"} />
            <Text>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Message')}>
            <AntDesign name="wechat" size={30} color={route.name === "Message" && "#00CCAA"} />
            <Text>Message</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Favorite')}>
            <AntDesign name="heart" size={30} color={route.name === "Favorite" && "#00CCAA"} />
            <Text>Favorites</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Account')}>
            <MaterialCommunityIcons name="account" size={30} color={route.name === "Account" && "#00CCAA"} />
            <Text>Profile</Text>
        </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container:{
        flexDirection:'row',
        justifyContent:'space-between',
    },
    iconStyle:{
        alignSelf: 'center' 
    }
})
export default FooterMenu;