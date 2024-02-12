import { View, Text } from "react-native";
import React from "react";
import { AuthProvider } from "./context/authContext";
import ScreenMenu from "./components/Menus/ScreenMenu";
import { PostProvider } from "./context/postContext";
import { InfoCarpenterProvider } from "./context/infoCarpenterContext";
import { InfoTechnicianProvider } from "./context/infoTechnicianContext";
import { InfoDriverProvider } from "./context/infoDriverContext";
import { InfoElectricianProvider } from "./context/infoElectricianContext";
import { InfoMaidProvider } from "./context/infoMaidContext";
import { InfoPlumberProvider } from "./context/infoPlumberContext";
import { FavProvider } from "./context/FavContext";
import { Fav2Provider } from "./context/Fav2Context";


const RootNavigation = () => {

    return(
        <AuthProvider>
            <PostProvider>
                <InfoCarpenterProvider>
                    <InfoTechnicianProvider>
                        <InfoDriverProvider>
                            <InfoElectricianProvider>
                                <InfoMaidProvider>
                                    <InfoPlumberProvider>
                                        <FavProvider>
                                            

                                            
                                                <ScreenMenu />
                                           
                                            </FavProvider>
                                    </InfoPlumberProvider>
                                </InfoMaidProvider>
                            </InfoElectricianProvider>
                        </InfoDriverProvider>
                    </InfoTechnicianProvider>
                </InfoCarpenterProvider>
            </PostProvider>
        </AuthProvider>
    )
}
export default RootNavigation;