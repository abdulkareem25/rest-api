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

  const submitHandler = (e) => {
    e.preventDefault();
    const title = e.target[0].value;
    const desc = e.target[1].value;

    axios.post('http://localhost:3000/', { title, desc })
      .then(response => {
        setNotes(prevNotes => [...prevNotes, response.data.note]);
        e.target.reset();
      })
      .catch(error => {
        console.error('Error adding note:', error);
      });
  };

  const deleteHandler = (e) => {
    const note = e.target.closest('.note');
    const noteId = note.getAttribute('data-id');

    axios.delete(`http://localhost:3000/${noteId}`)
      .then(() => {
        setNotes(prevNotes => prevNotes.filter(n => n._id !== noteId));
      })
      .catch(error => {
        console.error('Error deleting note:', error);
      });
  };

  const editHandler = (e) => {
    const note = e.target.closest('.note');
    const noteId = note.getAttribute('data-id');
    const newDesc = prompt('Enter new description:');

    if (newDesc) {
      axios.patch(`http://localhost:3000/${noteId}`, { desc: newDesc })
        .then(response => {
          console.log('Note edited:', response.data.note);
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
        <input type="text" placeholder="Title" />
        <input type="text" placeholder="Description" />
        <button>Add Note</button>
      </form>
      <div className='notes-list'>
        {notes.map(note => (
          <div key={note._id} data-id={note._id} className='note'>
            <h2>{note.title}</h2>
            <p>{note.desc}</p>
            <div className="btns">
              <button
                className='edit'
                onClick={editHandler}
              >
                Edit
              </button>
              <button
                onClick={deleteHandler}
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
