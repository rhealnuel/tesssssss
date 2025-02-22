import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { addNote, deleteNote, editNote } from "./logical/NoteFunctions";

interface CityNote {
  city: string;
  note: string[];
}

const CityNotes: React.FC = () => {
    const location = useLocation();
    const CITY = decodeURIComponent(location.pathname.slice(1)) || "Paris"; // Get city from URL
    const [note, setNote] = useState<string>("");
    const [notes, setNotes] = useState<CityNote[]>([]);
    const [cityNotes, setCityNotes] = useState<string[]>([]);
  
    // Load notes from local storage on mount
    useEffect(() => {
      const storedNotes: CityNote[] = JSON.parse(localStorage.getItem("cityNotes") || "[]");
      setNotes(storedNotes);
    }, []);
  
    // Ensure cityNotes updates AFTER notes are loaded from storage
    useEffect(() => {
      if (notes.length > 0) {
        const filteredNotes = notes.find((item) => item.city.toLowerCase() === CITY.toLowerCase());
        setCityNotes(filteredNotes ? filteredNotes.note : []);
      }
    }, [CITY, notes]); 
  
    // Save notes to local storage whenever they change
    useEffect(() => {
      if (notes.length > 0) {
        localStorage.setItem("cityNotes", JSON.stringify(notes));
      }
    }, [notes]);
  
  return (
    <div className="p-4 w-full lg:w-[40%] mx-auto">
      <h2 className="text-xl font-bold mb-3 text-center">Add Notes</h2>

      {/* Note Input */}
      <textarea
        className="w-full p-2 border rounded mb-2"
        rows={2}
        placeholder="Write a note..."
        value={note}
        onChange={(e) => setNote(e.target.value)}
      />

      <button className="bg-blue-500 text-white px-4 py-2 w-full rounded cursor-pointer" onClick={() => addNote(note, CITY, notes, setNotes, setNote)}>
        Add Note
      </button>
    
      {/* Notes List */}
      {cityNotes.length > 0 && (
        <div className="mt-4  p-3 rounded h-[">
            {cityNotes.map((n, index) => (
              <div key={index} className=" px-2 flex flex-col overflow-y-auto max-h-[100px] justify-between rounded-xl items-center mt-2 shadow-[0_0_10px_rgba(0,0,0,0.5)] bg-gray-800">
                <span className="w-full break-words ">{n}</span>
                <div>
                  <button className="text-blue-500 mr-2 cursor-pointer" onClick={() => editNote(index, cityNotes, notes, CITY, setNotes)}>
                    Edit
                  </button>
                  <button className="text-red-500 cursor-pointer" onClick={() => deleteNote(index, cityNotes, notes, CITY, setNotes)}>
                    Delete
                  </button>
                </div>
              </div>
            ))}
        
        </div>
      )}
    </div>
  );
};

export default CityNotes;
