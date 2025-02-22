import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";


const API_KEY = "3c172846b51a617650061f466afd40a8";

interface WeatherData {
  main: { temp: number; humidity: number };
  weather: { description: string; icon: string }[];
  wind: { speed: number; deg: number };
  name: string;
}

interface ForecastData {
  list: {
    dt: number;
    main: { temp: number };
    weather: { description: string; icon: string }[];
  }[];
}

const WeatherDetailPage: React.FC = () => {
  const [currentWeather, setCurrentWeather] = useState<WeatherData | null>(null);
  const [todayForecast, setTodayForecast] = useState<any[]>([]);
  const [nextDaysForecast, setNextDaysForecast] = useState<any[]>([]);
  const location = useLocation();
  const CITY = location.pathname.slice(1) 

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const currentRes = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${CITY}&appid=${API_KEY}&units=metric`
        );
        const currentData: WeatherData = await currentRes.json();
        setCurrentWeather(currentData);

        const forecastRes = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?q=${CITY}&appid=${API_KEY}&units=metric`
        );
        const forecastData: ForecastData = await forecastRes.json();

        const groupedByDate: { [key: string]: any[] } = {};
        forecastData.list.forEach((item) => {
          const date = new Date(item.dt * 1000).toISOString().split("T")[0];
          if (!groupedByDate[date]) groupedByDate[date] = [];
          groupedByDate[date].push(item);
        });

        const todayData = groupedByDate[Object.keys(groupedByDate)[0]]?.slice(0, 5) || [];
        const nextDaysData = Object.keys(groupedByDate)
          .slice(1, 5)
          .map((date) => groupedByDate[date][0]);

        setTodayForecast(todayData);
        setNextDaysForecast(nextDaysData);
      } catch (error) {
        console.error("Error fetching weather:", error);
      }
    };

    fetchWeather();
  }, []);

  if (!currentWeather) return <p className="text-center text-lg">Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold flex items-center justify-center gap-2">
          <img
            src={`https://openweathermap.org/img/wn/${currentWeather.weather[0].icon}@2x.png`}
            alt="Weather icon"
            className="w-20 h-20"
          />
          Weather in {currentWeather.name}
        </h2>
        <p className="text-xl mt-2 capitalize">{currentWeather.weather[0].description}</p>
        <p className="text-5xl font-bold mt-4">{Math.round(currentWeather.main.temp)}°C</p>
        <p className="mt-2">Humidity: {currentWeather.main.humidity}% | Wind: {currentWeather.wind.speed} m/s</p>
        
      </div>

      <div className="mt-8 grid grid-cols-5 gap-4">
        {todayForecast.map((hour, index) => (
          <div key={index} className="p-4 bg-gray-800 rounded-lg text-center shadow-[0_0_10px_rgba(0,0,0,0.5)]">
            <p className="font-bold">{new Date(hour.dt * 1000).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</p>
            <img
              src={`https://openweathermap.org/img/wn/${hour.weather[0].icon}.png`}
              alt="Weather icon"
              className="mx-auto"
            />
            <p className="text-xl">{Math.round(hour.main.temp)}°C</p>
            <p className="capitalize">{hour.weather[0].description}</p>
          </div>
        ))}
      </div>

      <h3 className="text-2xl font-bold mt-8">📅 Next 4 Days</h3>
      <div className="mt-4 grid grid-cols-4 gap-4">
        {nextDaysForecast.map((day, index) => (
          <div key={index} className="p-4 bg-gray-800 rounded-lg text-center shadow-[0_0_10px_rgba(0,0,0,0.5)]">
            <p className="font-bold">{new Date(day.dt * 1000).toLocaleDateString("en-US", { weekday: "long", day: "numeric", month: "short" })}</p>
            <img
              src={`https://openweathermap.org/img/wn/${day.weather[0].icon}.png`}
              alt="Weather icon"
              className="mx-auto"
            />
            <p className="text-xl">{Math.round(day.main.temp)}°C</p>
            <p className="capitalize">{day.weather[0].description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeatherDetailPage;
