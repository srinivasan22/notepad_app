import noteApis from '../api/index'
import React from 'react';

const Sidebar = ({
  notes,
  onAddNote,
  onDeleteNote,
  activeNote,
  setActiveNote,
}) => {

  const deleteNote = async (id: any) => {
    noteApis.deleteNoteById(id);
    onDeleteNote(id)
  }

  const sortedNotes = notes.sort((a, b) => b.lastModified - a.lastModified);

  return (
    <div className="app-sidebar">
      <div className="app-sidebar-header">
        <h1>My Notes</h1>
        <button id="add" onClick={onAddNote}> + </button>
      </div>
      <div className="app-sidebar-notes">
        {sortedNotes.map(({ localId, id, title, content, lastModified }, i) => (
          <div
            className={`app-sidebar-note ${localId === activeNote && "active"}`}
            onClick={() => setActiveNote(localId)}
          >
            <div className="sidebar-note-title">
              <strong>{title}</strong>
              <button onClick={(e) => deleteNote(localId)}>Delete</button>
            </div>

            <p>{content && content.substr(0, 100)}</p>
            <small className="note-meta">
              Last Modified{" "}
              {new Date(lastModified).toLocaleDateString("en-GB", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </small>
          </div>
        ))}
      </div>
    </div>

  );
};

export default Sidebar;
