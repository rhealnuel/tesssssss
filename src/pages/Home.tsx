import React, { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import TopCountries from "../components/TopCountries";
import { fetchWeatherForStoredCities } from "../components/logical/FetchCityList";
import { globalCities } from "../store/GLobalCities";

const Home: React.FC = () => {
    const [loading, setLoading] = useState<boolean>(false)
 
    const store = globalCities(); // ✅ Correctly call Zustand inside a component

    useEffect(() => {
      const fetchWeather = async () => {
        await fetchWeatherForStoredCities(store.addCities, setLoading);
      };
      fetchWeather();
    }, [store.addCities]);

    if(loading) return <div className="flex h-full w-full items-center justify-center text-white font-bold text-[2rem] italic"><p>Loading...</p></div>
    if(!store.cities && !loading) return <div className="flex h-full w-full items-center justify-center text-white font-bold text-[2rem] italic"><p>404 Weather not found.</p></div>
  return (
    <Container maxWidth="xl">
      <TopCountries  />
    </Container>
  );
};

export default Home;
