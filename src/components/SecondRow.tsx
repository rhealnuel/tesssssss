import navigation1 from "../assets/navigation1.svg"
import { globalCitiesDetails } from "../store/GLobalCities"
import { convertDate, convertTime } from "../utils/convertTimestamp"


const SecondRow = () => {
    const store = globalCitiesDetails()

    const daysForcast = store.citiesDetails
    

    return (
        <div className="flex flex-col gap-4 lg:flex-row w-full items-center justify-between px-4 lg:px-0 ">
                <div className="bg-gray-800 w-full lg:w-[25%] h-fit lg:h-[20vw] shadow-[0_0_10px_rgba(0,0,0,0.5)] rounded-[30px] p-4 overflow-y-auto ">
                    <h4 className="font-bold text-[1.2rem]">4 Days Forecast:</h4>
                    <div className="flex flex-col ">
                        {
                            daysForcast?.nextDaysForecast?.map((item:any, index:number) => (
                                <div key={index} className="flex items-center justify-between font-semibold text-[1rem] ">
                                    <img src={`https://openweathermap.org/img/wn/${item?.weather[0]?.icon}.png`} alt="cloudy" />
                                    <p>{Math.ceil(item?.main?.temp)}°C</p>
                                    <p>{convertDate(item?.dt)}</p>
                                </div>

                            ))
                        }
                      
                    </div>
                </div>
                <div className="bg-gray-800 lg:w-[70%] flex flex-col p-2 lg:p-0 items-center w-full h-fit lg:h-[20vw] overflow-y-auto shadow-[0_0_10px_rgba(0,0,0,0.5)] rounded-[30px] ">
                    <h3 className="font-bold text-[1.5rem] text-center">Hourly Forecast:</h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 w-full lg:w-[70%] gap-2 justify-center items-center">
                        {
                            daysForcast?.todayForecast?.map((item:any, index:number) => (
                            <div key={index} className=" bg-gray-900 h-fit px-6 py-4 lg:py-0 w-full rounded-[40px] flex lg:flex-col justify-center gap-2 items-center font-bold text-[1.5rem]">
                                <p>{convertTime(item?.dt, false)}</p>
                                <img src={`https://openweathermap.org/img/wn/${item?.weather[0]?.icon}.png`} alt="" />
                                <p>{Math.ceil(item?.main?.temp)}°C</p>
                                <img src={navigation1} alt="" 
                                    className=" transition-transform duration-500"
                                    style={{ transform: `rotate(${item?.wind?.deg}deg)` }}

                                />
                                <p>{Math.ceil(item?.wind?.speed)}m/s</p>
                            </div>

                            ))
                        }
                        
                    </div>
                </div>

        </div>
    )
}

export default SecondRow