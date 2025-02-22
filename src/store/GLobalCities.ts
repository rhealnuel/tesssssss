import { create } from "zustand";


interface CityStore {
  cities: any[];
  addCities: (city: any) => void;
  removeCities: (_city: any) => void;
  clearCities: () => void;
}

interface CityDetail {
    citiesDetails: any;
    setCitiesDetails: (city: any) => void;
    
  }
export const globalCities = create<CityStore>((set) => ({
    cities: [],
    addCities: (newCities: any | any[]) =>
      set({ cities: Array.isArray(newCities) ? newCities : [newCities] }), 
    removeCities: (cityName: string) =>
        set((state: any) => ({
          cities: state.cities.filter((city: any) => city.city !== cityName), 
        })),
    clearCities: () => set({ cities: [] }),
  }));


  export const globalCitiesDetails = create<CityDetail>((set) => ({
    citiesDetails: null,
    setCitiesDetails: (newCities: any) => set({ citiesDetails: newCities }),

  }));
  