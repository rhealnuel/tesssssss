import React, { useEffect, useState } from "react";

const GEO_USERNAME = "rhealnuel";
const API_KEY = "3c172846b51a617650061f466afd40a8";

interface City {
  name: string;
  countryName: string;
}

interface WeatherData {
  main: { temp: number };
  weather: { description: string; icon: string }[];
}

const HomePage: React.FC = () => {
  const [cities, setCities] = useState<City[]>([]);
  const [weatherData, setWeatherData] = useState<{ [key: string]: WeatherData }>({});

  

  useEffect(() => {
    const fetchCities = async () => {
      const storedCities = localStorage.getItem("cities");
      if (storedCities) {
        setCities(JSON.parse(storedCities));
      } else {
        try {
          const geoRes = await fetch(
            `http://api.geonames.org/searchJSON?featureClass=P&maxRows=15&orderby=population&username=${GEO_USERNAME}`
          );
          const geoData = await geoRes.json();
          const citiesList = geoData.geonames.map((city: any) => ({
            name: city.name,
            country: city.countryName,
            lat: city.lat,
            lng: city.lng,
          }));
          setCities(citiesList);
          localStorage.setItem("cities", JSON.stringify(citiesList));
        } catch (error) {
          console.error("Error fetching cities:", error);
        }
      }
    };

    fetchCities();
  }, []);

  useEffect(() => {
    const fetchWeather = async () => {
      const storedWeather = localStorage.getItem("weatherData");
      if (storedWeather) {
        setWeatherData(JSON.parse(storedWeather));
      } else {
        try {
          const weatherObj: { [key: string]: WeatherData } = {};
          for (const city of cities) {
            const res = await fetch(
              `https://api.openweathermap.org/data/2.5/weather?q=${city.name}&appid=${API_KEY}&units=metric`
            );
            const data: WeatherData = await res.json();
            weatherObj[city.name] = data;
          }
          setWeatherData(weatherObj);
          localStorage.setItem("weatherData", JSON.stringify(weatherObj));
        } catch (error) {
          console.error("Error fetching weather data:", error);
        }
      }
    };

    if (cities.length > 0) {
      fetchWeather();
    }
  }, [cities]);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h2 className="text-3xl font-bold text-center">🌍 Most Populated Cities</h2>
      <div className="mt-6 grid grid-cols-3 gap-6 max-w-5xl mx-auto">
        {cities.map((city) => (
          <div key={city.name} className="p-4 bg-gray-800 rounded-lg text-center">
            <h3 className="text-xl font-bold">{city.name}, {city.countryName}</h3>
            {weatherData[city.name] ? (
              <>
                <img
                  src={`https://openweathermap.org/img/wn/${weatherData[city.name].weather[0].icon}.png`}
                  alt="Weather icon"
                  className="mx-auto"
                />
                <p className="text-2xl">{Math.round(weatherData[city.name].main.temp)}°C</p>
                <p className="capitalize">{weatherData[city.name].weather[0].description}</p>
              </>
            ) : (
              <p>Loading weather...</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
