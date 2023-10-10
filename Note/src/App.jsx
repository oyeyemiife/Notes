import React from 'react'
import "./App.css"
import { useState } from 'react';

const App = () => {

  const [notes, setNotes] = useState([]);
  const [state, setState] = useState({
    title: "",
    note: "",
  });

  const handleDelete = (id) => {
    const leftNotes = notes.filter(note => note.id !== id);
    setNotes(leftNotes);
  };

  const handleEdit = (note) => {
     console.log(note)
    setState({
      title: note.title,
      note: note.note,
      id: note.id,
    });
  };
  const handleChange = (e) => {
    setState({...state, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const textSubmit = {...state, id: Math.random * 10 }
    setNotes([...notes, textSubmit]);
    setState({
      title:"",
      note: "",
    });
  };

  return (
    <div className='app p-2'>
      <h1 className='flex justify-center p-4 text-pink-800'>𝓜𝓨 𝓝𝓞𝓣𝓔𝓢</h1>
      <div id='editnotes' className="create-app w-400px mx-auto">
        <form className='flex flex-col' onSubmit={handleSubmit}>
          <input type="text"
            placeholder='Title'
            name='title'
            className='border-2 border-pink-800 p-2 mb-2 text-3xl font-bold'
            onChange={handleChange}
            value={state.title}
            required
          />
          <textarea
            name="note"
            id=""
            cols="30"
            rows="10"
            placeholder='𝕹𝖔𝖙𝖊𝖘'
            className='border-2 border-pink-800 p-2 text-2xl'
            onChange={handleChange}
            value={state.note}
            required
            ></textarea>
          <button type='submit' className='px-5 py-3 text-pink-800 font-medium mt-4'>𝕬𝖉𝖉 𝕹𝖔𝖙𝖊𝖘</button>
        </form>
      </div>
      <div className="notes-container border-t-2 border-fuchsia-400 m-10 flex flex-wrap">
        {
          notes.length > 0 ? notes.map((note, i) => {
            return (
              <div className="note bg-white ml-5 mr-5 mt-5 w-200 p-2 relative px-4 py-4" key={i} >
                <div className='mb-6'>
                  <a href='#editnotes' className='absolute right-12 top-1' onClick={() =>
                  {
                    handleEdit(note)
                  }
                   }>
                    <img className='edit-notes' src="./src/assets/edit.png" alt="" />
                  </a>
                <button className='delete-notes absolute right-2 top-0' onClick={() =>
                handleDelete(note.id)}>
                 <img src="./src/assets/delete.png" alt="" />
              </button>
                </div>
              <h3 className='font-bold text-2xl pb-2'>{note.title}</h3>
                <div>
                  <p className='text-2xl font-thin'>{note.note}</p>
                  <p>{new Date().getFullYear()}</p>
               </div>
                  
            </div>
            );
          }) :
          <p className='py-5'>𝖄𝖔𝖚 𝖉𝖔𝖓'𝖙 𝖍𝖆𝖛𝖊 𝖆𝖓𝖞 𝖓𝖔𝖙𝖊𝖘.</p>
        }
      </div>
    </div>
  )
}

export default App
