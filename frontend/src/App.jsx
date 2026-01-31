import React from 'react'
import { useState, useEffect } from 'react'

const App = () => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    setNotes([
      { id: 1, title: "First Note", desc: "This is the content of the first note." },
      { id: 2, title: "Second Note", desc: "This is the content of the second note." }
    ]);
  }, []);
  
  return (
    <div className='app'>
      <h1>Notes Application</h1>
      <div className='notes-list'>
        {notes.map(note => (
          <div key={note.id} className='note'>
            <h2>{note.title}</h2>
            <p>{note.desc}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
