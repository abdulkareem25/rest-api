import { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [notes, setNotes] = useState([]);
  const bURL = 'http://localhost:3000/notes';

  const fetchNotes = async () => {
    try {
      const response = await axios.get(bURL);
      setNotes(response.data.notes);
    } catch (error) {
      console.error('Error fetching notes:', error);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();
    const title = e.target[0].value;
    const desc = e.target[1].value;

    axios.post(bURL, { title, desc })
      .then(response => {
        setNotes(prevNotes => [...prevNotes, response.data.note]);
        e.target.reset();
      })
      .catch(error => {
        console.error('Error adding note:', error);
      });
  };

  const deleteHandler = (noteId) => {
    axios.delete(`${bURL}/${noteId}`)
      .then(() => {
        setNotes(prevNotes => prevNotes.filter(n => n._id !== noteId));
      })
      .catch(error => {
        console.error('Error deleting note:', error);
      });
  };

  const editHandler = (noteId) => {
    const newDesc = prompt('Enter new description:');

    if (newDesc) {
      axios.patch(`${bURL}/${noteId}`, { desc: newDesc })
        .then(response => {
          setNotes(prevNotes => prevNotes.map(n => n._id === noteId ? response.data.note : n));
        })
        .catch(error => {
          console.error('Error editing note:', error);
        });
    }
  };

  return (
    <div className='app'>
      <h1>Notes Application</h1>
      <form className="add-note"
        onSubmit={submitHandler}
      >
        <input type="text" placeholder="Title" required/>
        <input type="text" placeholder="Description" required/>
        <button>Add Note</button>
      </form>
      <div className='notes-list'>
        {notes.map(note => (
          <div key={note._id} className='note'>
            <h2>{note.title}</h2>
            <p>{note.desc}</p>
            <div className="btns">
              <button
                className='edit'
                onClick={() => editHandler(note._id)}
              >
                Edit
              </button>
              <button
                onClick={() => deleteHandler(note._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
