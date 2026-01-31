import { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/')
      .then(response => {
        setNotes(response.data.notes);
      })
      .catch(error => {
        console.error('Error fetching notes:', error);
      });
  }, []);

  return (
    <div className='app'>
      <h1>Notes Application</h1>
      <div className="add-note">
        <input type="text" placeholder="Title" />
        <input type="text" placeholder="Description" />
        <button>Add Note</button>
      </div>
      <div className='notes-list'>
        {notes.map(note => (
          <div key={note._id} className='note'>
            <h2>{note.title}</h2>
            <p>{note.desc}</p>
            <div className="btns">
              <button className='edit'>Edit</button>
              <button>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
