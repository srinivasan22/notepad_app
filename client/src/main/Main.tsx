import noteApis from '../api/index'
import React from 'react';
import { Note }  from '../App'

const Main = ({ activeNote, onUpdateNote }) => {
  const onEditField = (field, value) => {
    onUpdateNote({
      ...activeNote,
      [field]: value,
      lastModified: Date.now(),
    });
  };

  const saveNote = async (note: Note) => {
    if (note.id) {
      noteApis.updateNoteById(note.id, note)
    } else {
      const result = await noteApis.createNote(note);
      note.id = result.data.id
      onEditField("id", result.data.id)
    }
  }

  if (!activeNote) return <div className="no-active-note">No Active Note</div>;

  return (
    <div className="app-main">
      <div className="app-main-note-edit">
        <input
          type="text"
          id="title"
          placeholder="Note Title"
          value={activeNote.title}
          onChange={(e) => onEditField("title", e.target.value)}
          autoFocus
        />
        <textarea
          id="body"
          placeholder="Write your note here"
          value={activeNote.content}
          onChange={(e) => onEditField("content", e.target.value)}
        />
      </div>
      <button id="save" type="submit" onClick={(e) => saveNote(activeNote)}> Save </button>
    </div>
  );
};

export default Main;
