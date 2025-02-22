import { toast } from "react-toastify";

const API_KEY = "3c172846b51a617650061f466afd40a8";



const fetchWeather = async (city: string): Promise<any | null> => {
   
    try {
      const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`;
      const response = await fetch(url);
      const data = await response.json();

      if (data?.list?.length > 0) {
        const now = new Date();
        const today = now.toISOString().split("T")[0]; // Get today's date in YYYY-MM-DD
        const groupedByDate: { [key: string]: any[] } = {};

        // Group forecasts by date
        data.list.forEach((item: any) => {
          const date = new Date(item.dt * 1000).toISOString().split("T")[0];
          if (!groupedByDate[date]) groupedByDate[date] = [];
          groupedByDate[date].push(item);
        });

        // Select the most recent forecast (closest to current time)
        const currentForecast =
          data.list.reduce((prev: any, curr: any) =>
            Math.abs(curr.dt * 1000 - now.getTime()) <
            Math.abs(prev.dt * 1000 - now.getTime())
              ? curr
              : prev
          );

        // Select five time slots for today
        const todayForecast = groupedByDate[today]?.slice(0, 5) || [];

        // Select one midday forecast (closest to 12:00 PM) for the next four days
        const nextDaysForecast = Object.keys(groupedByDate)
          .slice(1, 5) // Get next 4 days
          .map(
            (date) =>
              groupedByDate[date].find(
                (slot) => new Date(slot.dt * 1000).getHours() === 12
              ) || groupedByDate[date][0] // Fallback to first slot if 12:00 isn't available
          );

        return {
          city,
          currentForecast,
          todayForecast,
          nextDaysForecast,
        };
      }
    } catch (error) {
      toast.error(`Error fetching weather for ${city}:`);
    }
    return null;
  };


export const fetchWeatherForStoredCitiesDetails = async (setCities: (data: any[]) => void, CITY: string, setLoading: any) => {
 setLoading(true)  
  
if(navigator.onLine){
    const weatherPromises = await fetchWeather(CITY);
  
    setCities(weatherPromises);

} else {
    const storedData = localStorage.getItem("weatherData");
    const weatherData: Array<any> = storedData ? JSON.parse(storedData) : [];

    const matchedCityWeather = weatherData.find((data) => data.city === CITY);

    setCities(matchedCityWeather);

}
setLoading(false)  


};
