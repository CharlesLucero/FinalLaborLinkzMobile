import React, {createContext, useState, useEffect, Children} from "react";
import axios from "axios";

//context
const InfoElectricianContext = createContext();

const InfoElectricianProvider = ({children}) => {
    const [loading, setLoading] = useState(false);
    const [info, setInfo] = useState([]);


   //get info
    const getElectricianInfo = async () => {
        setLoading(true);
        try {
        const { data } = await axios.get("/information/getinfoelectrician");
        setLoading(false);
        setInfo(data?.info);
        } catch (error) {
        console.log(error);
        setLoading(false);
        }
    };
    // inintal  info
    useEffect(() => {
        getElectricianInfo();
    }, []);
    return (
        <InfoElectricianContext.Provider value = {[info, setInfo]}>
               {children}
        </InfoElectricianContext.Provider>
    )
}

export { InfoElectricianContext, InfoElectricianProvider };
