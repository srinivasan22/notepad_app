import { useEffect, useState } from "react";
import uuid from "react-uuid";
import "./App.css";
import Main from "./main/Main";
import Sidebar from "./sidebar/Sidebar";
import React from "react";

export interface Note {
  localId: string;
  id: string;
  title: string;
  content: string;
  lastModified: number;
}

function App() {
  const [notes, setNotes] = useState<Note[]>(
    localStorage.notes ? JSON.parse(localStorage.notes) : []
  );
  const [activeNote, setActiveNote] = useState("");

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const onAddNote = () => {
    const newNote: Note = {
      localId: uuid(),
      id: undefined,
      title: "Untitled Note",
      content: "",
      lastModified: Date.now(),
    };

    setNotes([newNote, ...notes]);
    setActiveNote(newNote.localId);
  };

  const onDeleteNote = (noteId) => {
    setNotes(notes.filter(({ localId }) => localId !== noteId));
  };

  const onUpdateNote = (updatedNote) => {
    const updatedNotesArr = notes.map((note) => {
      if (note.localId === updatedNote.localId) {
        return updatedNote;
      }
      return note;
    });

    setNotes(updatedNotesArr);
  };

  const getActiveNote = () => {
    return notes.find(({ localId }) => localId === activeNote);
  };

  return (
    <div>
      <h1> My Awesome Notepad </h1>
      <div className="App">
        <Sidebar
          notes={notes}
          onAddNote={onAddNote}
          onDeleteNote={onDeleteNote}
          activeNote={activeNote}
          setActiveNote={setActiveNote}
        />
        <Main activeNote={getActiveNote()} onUpdateNote={onUpdateNote} />
      </div>
    </div>
  );
}

export default App;
