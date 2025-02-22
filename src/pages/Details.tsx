import { useEffect, useState } from "react";
import FirstRow from "../components/FirstRow"
import SecondRow from "../components/SecondRow"
import { useLocation } from "react-router-dom";
import { globalCitiesDetails } from "../store/GLobalCities";
import { fetchWeatherForStoredCitiesDetails } from "../components/logical/FetchDetails";
import CityNotes from "../components/CityNote";

   
const Details = () => {
    const store = globalCitiesDetails()
    const location = useLocation();
    const CITY = decodeURIComponent(location.pathname.slice(1)) || "Paris";
    const [loading, setLoading] = useState<boolean>(false)
    
   
   
    useEffect(() => {
      fetchWeatherForStoredCitiesDetails(store.setCitiesDetails, CITY, setLoading);
    }, []);

    if(loading) return <div className="flex h-full w-full items-center justify-center text-white font-bold text-[2rem] italic"><p>Loading...</p></div>
    if(!store.citiesDetails && !loading) return <div className="flex h-full w-full items-center justify-center text-white font-bold text-[2rem] italic"><p>404 Weather for this Location not found.</p></div>


    return (
        <div className="w-full py-4 flex flex-col gap-4 text-white">
           <FirstRow  />
            <SecondRow  />
            <CityNotes/>
            
        </div>
    )
}

export default Details
