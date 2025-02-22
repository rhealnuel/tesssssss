import { toast } from "react-toastify";

export function isCityInList(setFavorite: any, CITY: string) {
    const cities = JSON.parse(localStorage.getItem("cities") || "[]");
    setFavorite(cities.includes(CITY));
}

export function addCity(setFavorite: any, CITY: string) {
    setFavorite(true)
    toast.success(`${CITY} successfull added to favorite cities`)
    let cities = JSON.parse(localStorage.getItem("cities") || "[]");
    cities.push(CITY);
    localStorage.setItem("cities", JSON.stringify(cities));
  
  
   
  }

 export function removeCity(setFavorite: any, CITY: string) {
    setFavorite(false)
    toast.success(`${CITY} successfull removed to favorite cities`)
    let cities = JSON.parse(localStorage.getItem("cities") || "[]");
  
    // Check if the city exists
      cities = cities.filter((c:any) => c !== CITY); // Remove the city
      localStorage.setItem("cities", JSON.stringify(cities));
      
  }
