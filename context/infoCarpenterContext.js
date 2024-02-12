import React, {createContext, useState, useEffect, Children} from "react";
import axios from "axios";

//context
const InfoCarpenterContext = createContext();

const InfoCarpenterProvider = ({children}) => {
    const [loading, setLoading] = useState(false);
    const [info, setInfo] = useState([]);


   //get info
    const getCarpenterInfo = async () => {
        setLoading(true);
        try {
        const { data } = await axios.get("/information/getinfocarpenter");
        setLoading(false);
        setInfo(data?.info);
        } catch (error) {
        console.log(error);
        setLoading(false);
        }
    };
    // inintal  info
    useEffect(() => {
        getCarpenterInfo();
    }, []);
    return (
        <InfoCarpenterContext.Provider value = {[info, setInfo]}>
               {children}
        </InfoCarpenterContext.Provider>
    )
}

export { InfoCarpenterContext, InfoCarpenterProvider };
