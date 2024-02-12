import React, {createContext, useState, useEffect, Children} from "react";
import axios from "axios";

//context
const InfoPlumberContext = createContext();

const InfoPlumberProvider = ({children}) => {
    const [loading, setLoading] = useState(false);
    const [info, setInfo] = useState([]);


   //get info
    const getPlumberInfo = async () => {
        setLoading(true);
        try {
        const { data } = await axios.get("/information/getinfoplumber");
        setLoading(false);
        setInfo(data?.info);
        } catch (error) {
        console.log(error);
        setLoading(false);
        }
    };
    // inintal  info
    useEffect(() => {
        getPlumberInfo();
    }, []);
    return (
        <InfoPlumberContext.Provider value = {[info, setInfo]}>
               {children}
        </InfoPlumberContext.Provider>
    )
}

export { InfoPlumberContext, InfoPlumberProvider };
