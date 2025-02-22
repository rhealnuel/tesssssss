
import WeatherCard from './WeatherCard';
import { globalCities } from '../store/GLobalCities';

const TopCountries = () => {
   const {cities} = globalCities()
 
    return (
        <div className='flex justify-center items-center  mt-10 '>
            
            <div className='grid lg:grid-cols-4 md:grid-cols-2 gap-6'  >
            {cities?.map((city:any, index:number) => (
                <div key={index}>
                    <WeatherCard  {...city}  />
                </div>

                ))}
            </div>
        </div>
    )
}

export default TopCountries