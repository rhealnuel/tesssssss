import { Link } from "react-router-dom";
import { DeleteCity } from "./logical/DeleteCity";
import { globalCities } from "../store/GLobalCities";

const WeatherCard = ({ city, currentForecast }: any) => {
      const store = globalCities(); // ✅ Correctly call Zustand inside a component
  
  return (
    <div className="w-64 flex flex-col items-center p-4 rounded-lg shadow-[0_0_10px_rgba(0,0,0,0.5)] bg-gray-800 text-white">
      <Link to={city}>
      <div className="w-64 flex flex-col items-center p-4 rounded-lg  bg-transparent text-white">
      {/* Weather Icon */}
      <div className="text-5xl mb-2">
        <img src={`https://openweathermap.org/img/wn/${currentForecast?.weather[0]?.icon}.png`} alt="cloud" />
      </div>
      
      {/* City Name */}
      <h2 className="text-lg font-bold">{city}</h2>
      
      {/* Temperature */}
      <h1 className="text-3xl font-bold">{Math.ceil(currentForecast?.main?.temp)}°C</h1>

      </div>
      </Link>
      
      {/* Remove Button */}
      <button
        onClick={() =>{
          DeleteCity("cities", city,)
          store.removeCities(city)
        }}
        className="mt-2 text-white bg-red-500 hover:bg-red-600 p-2 rounded-full z-[2000]"
      >
        ❌
      </button>
    </div>

  );
};

export default WeatherCard;
