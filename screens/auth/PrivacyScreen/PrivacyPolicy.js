import React from "react";
import {View, StyleSheet, ScrollView, TouchableOpacity} from 'react-native';
import { Entypo } from '@expo/vector-icons';
import HeaderText from "../../../components/HeaderText";
import BodyText from "../../../components/BodyText";

const PrivacyPolicy = ({navigation}) => {
    return (
        <ScrollView>
        <View style = {styles.maincontainer}>
                <View
                    style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingHorizontal: 20,
                    paddingTop: 50,
                    }}>
                    <TouchableOpacity onPress={() => navigation.navigate('SplashScreen')}>
                    <Entypo name="chevron-left" size={24} color="black" />
                    </TouchableOpacity>
                </View>

                <View style = {{paddingHorizontal: 30, marginTop: 10}}>
                    <HeaderText
                    text="Privacy Policy"
                    color="#343434"
                    fontWeight={'bold'}
                    />
                </View>

                <View style={{ paddingHorizontal: 20, marginTop: 10 }}>
                    <BodyText
                        text="Welcome to Labor Linkz! This mobile application ('app') is owned and operated by Labor Linkz, LLC ('we', 'us', 'our'). We are committed to protecting your privacy and ensuring the security of your personal information. By using the app, you consent to the data practices described in this privacy policy ('Policy')."
                        color="#343434"
                        fontWeight={'400'}
                        fontSize={16}
                    />
                </View>

                <View style = {{paddingHorizontal: 35}}>
                    <BodyText
                        text="1. Information we collect: We may collect the following types of information from you when you use the app:"
                        color="#343434"
                        fontWeight={'400'}
                        fontSize={16}
                        marginTop={10}
                        
                    />
                </View>

                <View style = {{paddingHorizontal: 35, marginTop: 5}}>
                    <BodyText
                        text="• Personal information: such as your name, email address, phone number, and payment information."
                        color="#343434"
                        fontWeight={'400'}
                        fontSize={16}
                    />
                </View>

                <View style = {{paddingHorizontal: 35, marginTop: 5}}>
                    <BodyText
                        text="• Usage information: such as your IP address, device type, operating system, and app usage data."
                        color="#343434"
                        fontWeight={'400'}
                        fontSize={16}
                    />
                </View>

                <View style = {{paddingHorizontal: 35, marginTop: 5}}>
                    <BodyText
                        text="• User-generated content: such as your profile information, reviews, ratings, comments, messages, and job listings."
                        color="#343434"
                        fontWeight={'400'}
                        fontSize={16}
                    />
                </View>

                <View style = {{paddingHorizontal: 35, marginTop: 5}}>
                    <BodyText
                        text = "2. Use of information: We may use your personal information and usage information to:"
                        color="#343434"
                        fontWeight={'400'}
                        fontSize={16}
                    />
                </View>

                <View style = {{paddingHorizontal: 35, marginTop: 5}}>
                    <BodyText
                        text = "• Provide and improve the app and its features."
                        color="#343434"
                        fontWeight={'400'}
                        fontSize={16}
                    />
                </View>

                <View style = {{paddingHorizontal: 35, marginTop: 5}}>
                    <BodyText
                        text = "• Process payments and transactions."
                        color="#343434"
                        fontWeight={'400'}
                        fontSize={16}
                    />
                </View>

                <View style = {{paddingHorizontal: 35, marginTop: 5}}>
                    <BodyText
                        text = "• Communicate with you about the app and its services."
                        color="#343434"
                        fontWeight={'400'}
                        fontSize={16}
                    />
                </View>

                <View style = {{paddingHorizontal: 35, marginTop: 5}}>
                    <BodyText
                        text = "• Analyze and monitor app usage and performance."
                        color="#343434"
                        fontWeight={'400'}
                        fontSize={16}
                    />
                </View>

                <View style = {{paddingHorizontal: 35, marginTop: 5}}>
                    <BodyText
                        text = "• Personalize your experience on the app."
                        color="#343434"
                        fontWeight={'400'}
                        fontSize={16}
                    />
                </View>

                <View style = {{paddingHorizontal: 35, marginTop: 5}}>
                    <BodyText
                        text = "• Monetize user data for business use"
                        color="#343434"
                        fontWeight={'400'}
                        fontSize={16}
                    />
                </View>

                <View style = {{paddingHorizontal: 35, marginTop: 5}}>
                    <BodyText
                        text = "3. Sharing of information: We may share your information with third-party service providers and partners who help us operate the app and provide its services. We may also share your information with other users of the app, as necessary to facilitate job listings and transactions. We will not sell or rent your personal information to third parties for their own marketing purposes."
                        color="#343434"
                        fontWeight={'400'}
                        fontSize={16}
                    />
                </View>

                <View style = {{paddingHorizontal: 35, marginTop: 5}}>
                    <BodyText
                        text = "4. Data retention: We will retain your personal information for as long as necessary to provide you with the app's services, and as required by applicable law."
                        color="#343434"
                        fontWeight={'400'}
                        fontSize={16}
                    />
                </View>

                <View style = {{paddingHorizontal: 35, marginTop: 5}}>
                    <BodyText
                        text = "5. Security: We take reasonable measures to protect your personal information from unauthorized access, disclosure, or misuse. However, no security measure is foolproof, and we cannot guarantee the security of your information."
                        color="#343434"
                        fontWeight={'400'}
                        fontSize={16}
                    />
                </View>

                <View style = {{paddingHorizontal: 35, marginTop: 5}}>
                    <BodyText
                        text = "6. Children's privacy: The app is not intended for use by children under the age of 18. We do not knowingly collect personal information from children under the age of 18."
                        color="#343434"
                        fontWeight={'400'}
                        fontSize={16}
                    />
                </View>

                <View style = {{paddingHorizontal: 35, marginTop: 5}}>
                    <BodyText
                        text = "7 .Changes to this Policy: We reserve the right to modify or update this Policy at any time and without prior notice. Your continued use of the app after such modifications or updates constitutes your acceptance of the revised Policy."
                        color="#343434"
                        fontWeight={'400'}
                        fontSize={16}
                    />
                </View>

                <View style = {{paddingHorizontal: 35, marginTop: 5}}>
                    <BodyText
                        text = "8. Contact us: If you have any questions or concerns about this Policy, please contact us at privacy@laborlinkz.com."
                        color="#343434"
                        fontWeight={'400'}
                        fontSize={16}
                    />
                </View>
                 
                <View style = {{paddingHorizontal: 5, marginTop: 5, marginBottom: 20 }}>
                    <BodyText
                        text = "By using the app, you agree to the terms of this Policy and consent to the collection, use, and sharing of your information as described herein."
                        color="#343434"
                        fontWeight={'400'}
                        fontSize={16}
                    />
                </View>

                
        </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
        maincontainer:{
            flex:1
        },
})
export default PrivacyPolicy;