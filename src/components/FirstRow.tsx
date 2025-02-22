
import humidity from "../assets/humidity.svg"
import wind from "../assets/wind.svg"
import pressure from "../assets/pressure.svg"
import { convertDate, convertTime } from "../utils/convertTimestamp"
import { globalCitiesDetails } from "../store/GLobalCities"
import { useLocation } from "react-router-dom"
import { useEffect, useState } from "react"
import { FaHeart, FaRegHeart  } from "react-icons/fa6";
import { addCity, isCityInList, removeCity } from "./logical/Favorite"




const FirstRow = () => {
const store = globalCitiesDetails()
const weather = store.citiesDetails
const location = useLocation();
const CITY = decodeURIComponent(location.pathname.slice(1));

const [favorite, setFavorite] = useState<boolean>(false)
   

useEffect(() =>{
    isCityInList(setFavorite, CITY)
}, [])
 const current = weather?.currentForecast
      

    return (
        <div className="flex flex-col lg:flex-row w-full gap-4 lg:gap-0  justify-between px-4 lg:px-0">
        <div className="bg-gray-800 lg:w-[35%] w-full flex flex-col relative items-center justify-center gap-6 h-fit py-4 lg:py-0  lg:h-[20vw] shadow-[0_0_10px_rgba(0,0,0,0.5)] rounded-[30px] ">
            <div onClick={() => {favorite? removeCity(setFavorite, CITY) : addCity(setFavorite, CITY)}} className="text-red-500 text-[2rem] absolute top-4 left-4 cursor-pointer">
                {
                    favorite? <FaHeart /> : <FaRegHeart />
                }
            </div>
            <p className="text-[2.25rem] font-bold">
                {weather?.city}
            </p>
            
            <div className="text-center">
                <h1 className="font-bold text-[6rem] leading-none">{convertTime(current?.dt, false)}</h1>
                <p className="font-[400] text-[1.25rem]">{convertDate(current?.dt)}</p>

            </div>
        </div>


        <div className="bg-gray-800 flex flex-col lg:flex-row gap-4 lg:gap-0 justify-between lg:w-[60%] h-fit lg:h-[20vw] overflow-y-auto shadow-[0_0_10px_rgba(0,0,0,0.5)] rounded-[30px] lg:p-8 p-4 ">
            <div className="flex flex-col items-center gap-4">
                <div className="bg-gradient-to-br  from-white to-[#444444] bg-clip-text text-transparent">
                    <h1 className="font-bold text-[5rem]  leading-none">
                        {Math.ceil(current?.main?.temp)}°C
                    </h1>
                    <p className="text-[1.25rem] font-semibold">Feels like: <span className="text-[2rem]">{Math.ceil(current?.main?.feels_like)}°C</span></p>
                </div>

            </div>

            <div className="flex flex-col items-center">
                <img src={`https://openweathermap.org/img/wn/${current?.weather[0]?.icon}.png`} alt="" className="h-[150px] w-[150px]" />
                <p className="text-center text-white font-semibold text-[2rem]">{current?.weather[0]?.description}</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <span className="flex flex-col items-center">
                        <img src={humidity} alt="humidity" className="h-[50px]" />
                        <p>{current?.main?.humidity}%</p> 
                    </span>
                    <p className="text-center">Humidity</p>
                </div>
                <div>
                    <span className="flex flex-col items-center">
                        <img src={wind} alt="humidity" className="h-[50px]" />
                        <p>{current?.wind?.speed}m/s</p> 
                    </span>
                    <p className="text-center">Wind Speed</p>
                </div>
                <div>
                    <span className="flex flex-col items-center">
                        <img src={pressure} alt="humidity" className="h-[50px]" />
                        <p>{current?.main?.pressure}hPa</p> 
                    </span>
                    <p className="text-center">Pressure</p>
                </div>
                {/* <div>
                    <span className="flex flex-col items-center">
                        <img src={uv} alt="humidity" className="h-[50px]" />
                        <p>41%</p> 
                    </span>
                    <p className="text-center">UV</p>
                </div> */}
            </div>
        </div>

    </div>
    )
}
export default FirstRow