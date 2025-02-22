import { toast } from "react-toastify";

export const DeleteCity = (key: string, cityToRemove: string) => {
  // Get data from localStorage
  const storedData = localStorage.getItem(key);
  if (!storedData) {
    toast.warn(`No data found for key: ${key}`);
    return;
  }

  try {
    // Parse data into an array
    const dataArray: string[] = JSON.parse(storedData);

    if (!Array.isArray(dataArray)) {
      toast.error(`Stored data is not an array for key: ${key}`);
      return;
    }

    // Normalize city names for comparison
    const normalizedCityToRemove = cityToRemove.toLowerCase().trim();

    // Check if the city exists
    if (!dataArray.some((city) => city.toLowerCase().trim() === normalizedCityToRemove)) {
      toast.warn(`${cityToRemove} was not found in ${key}.`);
      return;
    }

    // Remove the city from the array
    
    const updatedData = dataArray.filter(
      (city) => city.toLowerCase().trim() !== normalizedCityToRemove
    );

    // Save the updated array back to localStorage
    
    localStorage.setItem(key, JSON.stringify(updatedData));
    toast.success(`${cityToRemove} removed successfully.`);
  } catch (error) {
    toast.error("Error parsing localStorage data:");
  }
};
