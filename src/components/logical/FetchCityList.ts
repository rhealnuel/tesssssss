import { toast } from "react-toastify";

// Fetch cities from GeoNames API
const fetchCities = async (): Promise<string[]> => {
  return [
    "Shanghai", "Beijing", "Shenzhen", "Guangzhou", "Kinshasa", "Lagos",
    "Istanbul", "Chengdu", "Mumbai", "São Paulo", "Mexico City", 
    "Karachi", "Tianjin", "Delhi", "Wuhan"
  ];
};


// Save & retrieve from local storage
const saveToLocalStorage = (key: string, value: any) =>
  localStorage.setItem(key, JSON.stringify(value));

const getFromLocalStorage = (key: string) =>
  JSON.parse(localStorage.getItem(key) || "[]");

// Fetch weather for a single city
const fetchWeather = async (city: string) => {
  const API_KEY = "3c172846b51a617650061f466afd40a8";
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (!data.list?.length) return null;

    const now = new Date();
    const today = now.toISOString().split("T")[0];
    const groupedByDate: { [key: string]: any[] } = {};

    // Group forecasts by date
    data.list.forEach((item: any) => {
      const date = new Date(item.dt * 1000).toISOString().split("T")[0];
      if (!groupedByDate[date]) groupedByDate[date] = [];
      groupedByDate[date].push(item);
    });

    // Closest forecast to current time
    const currentForecast = data.list.reduce((prev: any, curr: any) =>
      Math.abs(curr.dt * 1000 - now.getTime()) <
      Math.abs(prev.dt * 1000 - now.getTime())
        ? curr
        : prev
    );

    // Select 5 time slots for today
    const todayForecast = groupedByDate[today]?.slice(0, 5) || [];

    // Select midday forecast for the next 4 days
    const nextDaysForecast = Object.keys(groupedByDate)
      .slice(1, 5)
      .map(
        (date) =>
          groupedByDate[date].find(
            (slot) => new Date(slot.dt * 1000).getHours() === 12
          ) || groupedByDate[date][0] // Fallback to first slot
      );

    return { city, currentForecast, todayForecast, nextDaysForecast };
  } catch (error) {
    console.error(`Error fetching weather for ${city}:`, error);
    return null;
  }
};

export const fetchWeatherForStoredCities = async (setCity: any, setLoading: any) => {
    setLoading(true);
  
    // Check if user is offline
    if (!navigator.onLine) {
     toast.warn("User is offline. Using cached weather data.");
      const cachedWeatherData = JSON.parse(localStorage.getItem("weatherData") || "[]");
  
      if (!Array.isArray(cachedWeatherData) || !cachedWeatherData.every(item => typeof item === "object")) {
        toast.error("Cached weather data is invalid:", cachedWeatherData);
        setLoading(false);
        return;
      }
  
      setCity(cachedWeatherData);
      setLoading(false);
      return;
    }
  
    toast.success("User is online. Fetching latest weather data...");
  
    let cities = getFromLocalStorage("cities");
  
    // If no cities exist, fetch and store them
    if (cities.length === 0) {
      cities = await fetchCities();
      saveToLocalStorage("cities", cities);
    }
  
    // Sort cities alphabetically
    cities.sort((a:any, b:any) => a.localeCompare(b));
  
    // Fetch weather data for each city
    const weatherPromises = cities.map(fetchWeather);
    const weatherData = (await Promise.all(weatherPromises)).filter(Boolean);
  
    // Save & update Zustand store
    saveToLocalStorage("weatherData", weatherData);
    setCity(weatherData);
  
    setLoading(false);
  };
  