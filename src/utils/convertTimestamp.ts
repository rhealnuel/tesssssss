
export const convertDate = (timestamp: number) => {
    const date = new Date((timestamp + 3600) * 1000);
  
    const formattedDate = date.toLocaleDateString("en-US", {
        weekday: "long",
        day: "2-digit",
        month: "short",
        timeZone: "UTC",
      });    
  
    return formattedDate;
  };

  export const convertTime = (timestamp: number, hour12: boolean) => {
    const date = new Date((timestamp + 3600) * 1000);
  
    // const formattedDate = date.toLocaleDateString("en-US", { timeZone: "UTC" });
    const formattedTime = date.toLocaleTimeString("en-US", { 
      timeZone: "UTC",
      hour: "2-digit",
      minute: "2-digit",
      hour12: hour12 // Set to false for 24-hour format
    });
  
    return formattedTime ;
  };
  