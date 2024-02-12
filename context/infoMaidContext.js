import React, {createContext, useState, useEffect, Children} from "react";
import axios from "axios";

//context
const InfoMaidContext = createContext();

const InfoMaidProvider = ({children}) => {
    const [loading, setLoading] = useState(false);
    const [info, setInfo] = useState([]);


   //get info
    const getMaidInfo = async () => {
        setLoading(true);
        try {
        const { data } = await axios.get("/information/getinfomaid");
        setLoading(false);
        setInfo(data?.info);
        } catch (error) {
        console.log(error);
        setLoading(false);
        }
    };
    // inintal  info
    useEffect(() => {
        getMaidInfo();
    }, []);
    return (
        <InfoMaidContext.Provider value = {[info, setInfo]}>
               {children}
        </InfoMaidContext.Provider>
    )
}

export { InfoMaidContext, InfoMaidProvider };
