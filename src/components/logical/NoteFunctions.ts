export const addNote = (note: any, CITY:any, notes:any, setNotes: any, setNote: any  ): void => {
    if (note.trim() === "") return;

    const updatedNotes = [...notes];
    const cityIndex = updatedNotes.findIndex((item) => item.city.toLowerCase() === CITY.toLowerCase());

    if (cityIndex !== -1) {
      updatedNotes[cityIndex].note.push(note);
    } else {
      updatedNotes.push({ city: CITY, note: [note] });
    }

    setNotes(updatedNotes);
    setNote("");
  };

   // Edit a specific note
     export const editNote = (index: number, cityNotes: any, notes: any, CITY: string, setNotes:any): void => {
        const updatedNote = prompt("Edit note:", cityNotes[index]);
        if (updatedNote !== null) {
          const updatedCityNotes = [...cityNotes];
          updatedCityNotes[index] = updatedNote;
    
          const updatedNotes = notes.map((item:any) =>
            item.city.toLowerCase() === CITY.toLowerCase() ? { ...item, note: updatedCityNotes } : item
          );
    
          setNotes(updatedNotes);
        }
      };
    
      // Delete a specific note
     export const deleteNote = (index: number, cityNotes:any,notes: any, CITY:string, setNotes: any ): void => {
        const updatedCityNotes = cityNotes.filter((_:any, i:any) => i !== index);
    
        const updatedNotes = notes
          .map((item: any) =>
            item.city.toLowerCase() === CITY.toLowerCase() ? { ...item, note: updatedCityNotes } : item
          )
          .filter((item: any) => item.note.length > 0); // Remove city if no notes left
    
        setNotes(updatedNotes);
      };