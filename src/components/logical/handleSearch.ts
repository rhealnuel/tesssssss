import { toast } from "react-toastify";

 const capitalizeFirstLetter = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

  export const handleSearch = (searchTerm: any) => {
    if(searchTerm){
      if (!navigator.onLine){
        toast.error("please connect to a network to get weather data!!")
      }else{

        window.location.href = `/${capitalizeFirstLetter(searchTerm)}`
      }

    }
  }
