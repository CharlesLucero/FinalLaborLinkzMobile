import React, {createContext, useState, useEffect, Children} from "react";
import axios from "axios";

//context
const InfoDriverContext = createContext();

const InfoDriverProvider = ({children}) => {
    const [loading, setLoading] = useState(false);
    const [info, setInfo] = useState([]);


   //get info
    const getDriverInfo = async () => {
        setLoading(true);
        try {
        const { data } = await axios.get("/information/getinfodriver");
        setLoading(false);
        setInfo(data?.info);
        } catch (error) {
        console.log(error);
        setLoading(false);
        }
    };
    // inintal  info
    useEffect(() => {
        getDriverInfo();
    }, []);
    return (
        <InfoDriverContext.Provider value = {[info, setInfo]}>
               {children}
        </InfoDriverContext.Provider>
    )
}

export  { InfoDriverContext, InfoDriverProvider };
