import React from "react";
import {Text, TouchableOpacity, View, StyleSheet, ScrollView} from 'react-native';
import { Entypo } from '@expo/vector-icons';
import HeaderText from "../../../components/HeaderText";
import BodyText from "../../../components/BodyText";

const TermsnCondition = ({navigation}) => {
    return (
        <ScrollView>
        <View style = {styles.maincontainer}>
                {/* Back icon and Skip Text */}
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
                    text="Terms of Service"
                    color="#343434"
                    fontWeight={'bold'}
                    />
                </View>

                <View style={{ paddingHorizontal: 20, marginTop: 10 }}>
                    <BodyText
                        text="Welcome to Labor Linkz! This mobile application ('app') is owned and operated by Labor Linkz, LLC ('we', 'us', 'our'). By accessing or using our app, you agree to be bound by the following terms of service ('Terms'). Please read them carefully before using the app."
                        color="#343434"
                        fontWeight={'400'}
                        fontSize={16}
                    />
                </View>

                <View style = {{paddingHorizontal: 35}}>
                    <BodyText
                        text="1. Eligibility: To use the app, you must be at least 18 years old and legally capable of entering into binding contracts."
                        color="#343434"
                        fontWeight={'400'}
                        fontSize={16}
                        marginTop={10}
                        
                    />
                </View>

                <View style = {{paddingHorizontal: 35, marginTop: 5}}>
                    <BodyText
                        text="2. User accounts: To use certain features of the app, you may need to create a user account. You agree to provide accurate, complete, and up-to-date information when creating your account, and to keep your account information updated. You are solely responsible for maintaining the confidentiality of your account and password, and for all activities that occur under your account."
                        color="#343434"
                        fontWeight={'400'}
                        fontSize={16}
                    />
                </View>

                <View style = {{paddingHorizontal: 35, marginTop: 5}}>
                    <BodyText
                        text="3. User content: You are solely responsible for any content that you post, upload, publish, or otherwise make available on the app, including but not limited to your profile information, reviews, ratings, comments, messages, and job listings. You warrant that you own or have the necessary licenses, rights, consents, and permissions to use and authorize us to use any and all such content"
                        color="#343434"
                        fontWeight={'400'}
                        fontSize={16}
                    />
                </View>
                    
                <View style = {{paddingHorizontal: 35, marginTop: 5}}>
                    <BodyText
                        text = "4. Prohibited activities: You agree not to use the app for any illegal, fraudulent, or unauthorized purpose. You also agree not to violate any applicable laws, regulations, or third-party rights, including but not limited to intellectual property rights, privacy rights, and publicity rights. You further agree not to interfere with or disrupt the app or its servers or networks, or to bypass any measures we may use to prevent or restrict access to the app."
                        color="#343434"
                        fontWeight={'400'}
                        fontSize={16}
                    />
                </View>

                <View style = {{paddingHorizontal: 35, marginTop: 5}}>
                    <BodyText
                        text = "5. Disclaimers: The app and its contents are provided 'as is' and 'as available' without any warranties of any kind, express or implied. We do not warrant that the app will be uninterrupted, error-free, or free from viruses or other harmful components. We also do not warrant that the information or services provided through the app will be accurate, complete, or reliable."
                        color="#343434"
                        fontWeight={'400'}
                        fontSize={16}
                    />
                </View>

                <View style = {{paddingHorizontal: 35, marginTop: 5}}>
                    <BodyText
                        text = "6. Limitation of liability: To the fullest extent permitted by applicable law, we shall not be liable for any direct, indirect, incidental, special, consequential, or punitive damages arising out of or in connection with the use of the app or its contents, whether based on contract, tort, strict liability, or any other legal theory. In no event shall our total liability exceed the amount paid by you, if any, for accessing or using the app."
                        color="#343434"
                        fontWeight={'400'}
                        fontSize={16}
                    />
                </View>

                <View style = {{paddingHorizontal: 35, marginTop: 5}}>
                    <BodyText
                        text = "7. Indemnification: You agree to indemnify, defend, and hold harmless Labor Linkz, its affiliates, and their respective officers, directors, employees, agents, and licensors from and against any and all claims, liabilities, damages, losses, costs, expenses, or fees (including reasonable attorneys' fees) arising out of or in connection with your use of the app or your breach of these Terms."
                        color="#343434"
                        fontWeight={'400'}
                        fontSize={16}
                    />
                </View>

                <View style = {{paddingHorizontal: 35, marginTop: 5}}>
                    <BodyText
                        text = "8. Governing law: These Terms shall be governed by and construed in accordance with the laws of the State of California, without giving effect to any principles of conflicts of law."
                        color="#343434"
                        fontWeight={'400'}
                        fontSize={16}
                    />
                </View>

                <View style = {{paddingHorizontal: 35, marginTop: 5}}>
                    <BodyText
                        text = "9. Dispute resolution: Any dispute arising out of or in connection with these Terms or the app shall be resolved through binding arbitration in accordance with the Commercial Arbitration Rules of the American Arbitration Association, and judgment upon the award rendered by the arbitrator(s) may be entered in any court having jurisdiction thereof."
                        color="#343434"
                        fontWeight={'400'}
                        fontSize={16}
                    />
                </View>

                <View style = {{paddingHorizontal: 35, marginTop: 5}}>
                    <BodyText
                        text = "10. Changes to these Terms: We reserve the right to modify or update these Terms at any time and without prior notice. Your continued use of the app after such modifications or updates constitutes your acceptance of the revised Terms."
                        color="#343434"
                        fontWeight={'400'}
                        fontSize={16}
                    />
                </View>

                <View style = {{paddingHorizontal: 5, marginTop: 5, marginBottom: 20 }}>
                    <BodyText
                        text = "By accepting these Terms, you agree to be bound by them. If you have any questions or concerns"
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
export default TermsnCondition