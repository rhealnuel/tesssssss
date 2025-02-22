import SearchIcon from '@mui/icons-material/Search';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import { useState } from "react";
import { getUserLocation } from './logical/UserLocation';
import { handleSearch } from './logical/handleSearch';

const Header = () => {
  const [searchTerm, setSearchTerm] = useState<string>("")
  
  


    return (
      <div className="flex items-center justify-between px-4   ">
        {/* <ToggleSwitch/> */}
        <div className={`${navigator.onLine ? "bg-green-500" : "bg-red-500"} text-white p-2 w-fit h-fit rounded-2xl`}>
           <p className='hidden'>{navigator.onLine ? "Online": "Offline using cache data"}</p>
        </div>
        
        <div className="text-white bg-opacity-[60%] w-[80%] lg:w-[60%] flex items-center bg-gray-800 gap-2 rounded-xl px-1 shadow-[0_0_10px_rgba(0,0,0,0.5)]">
                <SearchIcon  />
               <input onChange={(e) => setSearchTerm(e.target.value)} className="h-[42px] outline-none w-[95%]" placeholder="Search for your preffered city..." /> 
               <button onClick={() => handleSearch(searchTerm)} className="bg-green-600 rounded-r-xl hover:opacity-[75%] p-2 text-white z-[10000] cursor-pointer">Search</button>
        </div>
            <button onClick={ getUserLocation}  className="rounded-xl text-[0.75rem] lg:text-[1rem] bg-green-600 text-white hover:opacity-[75%] cursor-pointer flex items-center gap-2 h-fit w-fit p-2" >
                <MyLocationIcon/>
                <p className='hidden lg:inline'>My Location </p>
            </button>
      </div>
    )
}

export default Header