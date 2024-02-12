import React, {createContext, useState, useEffect, children} from "react";
import axios from "axios";

//context
const InfoTechnicianContext = createContext();

const InfoTechnicianProvider = ({children}) => {
    const [loading, setLoading] = useState(false);
    const [info, setInfo] = useState([]);


   //get info
    const getTechnicianInfo = async () => {
        setLoading(true);
        try {
        const { data } = await axios.get("/information/getinfotechnician");
        setLoading(false);
        setInfo(data?.info);
        } catch (error) {
        console.log(error);
        setLoading(false);
        }
    };
    // inintal  info
    useEffect(() => {
        getTechnicianInfo();
    }, []);
    return (
        <InfoTechnicianContext.Provider value = {[info, setInfo]}>
               {children}
        </InfoTechnicianContext.Provider>
    )
}

export { InfoTechnicianContext, InfoTechnicianProvider };
