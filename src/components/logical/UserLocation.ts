import { toast } from "react-toastify";

const API_KEY = "3c172846b51a617650061f466afd40a8"

  const fetchCity = async (latitude: number, longitude: number) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`
      );
      const data = await response.json();
      if (data.name) {
        window.location.href = `/${data.name}`
       
      } else {
        toast.error("City not found.");
      }
    } catch (err) {
      toast.error("Failed to fetch city.");
    }
  };

  export const getUserLocation = () => {
    if(!navigator.onLine){
      toast.warn("please connect to a network ")
    }else{
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            fetchCity(latitude, longitude);
          },
          () => toast.error("Failed to get location.")
        );
      } else {
        toast.error("Geolocation is not supported by this browser.");
      }

    }
  };
