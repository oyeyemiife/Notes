import "./Notes.css";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { db } from "../firebase";
import { addDoc, collection, doc, getDoc, setDoc } from "firebase/firestore"
import React from "react";

const Notes = () => {
  // const navigate = useNavigate();

  const [noteInfo, setNoteInfo] = useState({
    note: "",
    allNotes: [],
    loading: false,
  });

  const [fetchingNotes, setFetchingNotes] = useState(false);
  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(false);
  const [allNotes, setAllNotes] = useState([]);

  const notesRef = collection(db, "notes");

  const [notes, setNotes] = useState([]);
  const [state, setState] = useState({
    title: "",
    note: "",
    id: Math.random() * 10,
  });

  const handleDelete = (id) => {
    const leftNotes = notes.filter((note) => note.id !== id);
    setNotes(leftNotes);
  };
  

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem("user"));

    console.log(user);

    const data = [
      ...noteInfo.allNotes,
      {
        note: state.note,
        title: state.title,
        user: "",
      },
    ];

    try {
      await setDoc(doc(notesRef, user?.email), {
        notes: data,
      });

   setNoteInfo({...noteInfo, allNotes:data})

      setLoading(false);
    } catch (e) {
      console.error("Error adding document:", e);
      setLoading(false);
    }
    const textSubmit = { ...state, id: Math.random * 10 };
    setNotes([...notes, textSubmit]);
    setState({
      title: "",
      note: "",
      id: Math.random() * 10,
    });
  };

  // useEffect(() => {
  //   const tempUser = localStorage.getItem('user');

  //   if (!tempUser) {
  //     navigate('/');
  //   }
  // }, []);

  const getAllNotes = async () => {
    setFetchingNotes(true);

    try {
      const user = JSON.parse(localStorage.getItem("user"));

      const docRef = doc(db, "notes", user?.email);
      console.log("hey");

      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) return alert("No such document!");

      setNoteInfo({
        ...noteInfo,
        allNotes: docSnap.data().notes,
      });

      console.log(docSnap.data().notes);

      return docSnap.data().notes;
    } catch (error) {
      console.log(error);
      alert("Error adding document: ", error);
    } finally {
      setFetchingNotes(false);
    }
  };
  useEffect(() => {
    getAllNotes();
  }, [user]);

  return (
    <div className="app p-2">
      <h1 className="flex justify-center p-4 text-pink-800">My Notes</h1>
      <div id="editnotes" className="create-app w-400px mx-auto">
        <form className="flex flex-col" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Title"
            name="title"
            className="border-2 border-pink-800 p-2 mb-2 text-3xl font-bold"
            onChange={handleChange}
            value={state.title}
            required
          />
          <textarea
            name="note"
            id=""
            cols="30"
            rows="10"
            placeholder="Notes"
            className="border-2 border-pink-800 p-2 text-2xl"
            onChange={handleChange}
            value={state.note}
            required
          ></textarea>
          <button
            type="submit"
            className="px-5 py-3 text-pink-800 font-medium mt-4"
          >
            Add Note
          </button>
        </form>

        {fetchingNotes && <> Fetching Notes...</>}
        {!fetchingNotes && noteInfo.allNotes.length && (
          <div className="notes-container border-t-2 border-fuchsia-400 m-10 flex flex-wrap">
            {noteInfo.allNotes.map((note, i) => {
              return (
                <div
                  className="note bg-white ml-5 mr-5 mt-5 w-200 p-2 relative px-4 py-4"
                  key={i}
                >
                  <div className="mb-6">
                    <button
                      className="delete-notes absolute right-2 top-0"
                      onClick={() => handleDelete(note.id)}
                    > delete
                      {/* <img src="./src/assets/delete.png" alt="" /> */}
                    </button>
                  </div>
                  <h3 className="font-bold text-2xl pb-2">{note.title}</h3>
                  <div>
                    <p className="text-2xl font-thin">{note.note}</p>
                    <p>{new Date().getFullYear()}</p>
                  </div>
                </div>
              );
            })}
            {noteInfo.allNotes.length === 0 && (
              <p className="py-5">You don't have any notes.</p>
            )}
          </div>
        )}
      </div>
      {/* <div className="notes-container border-t-2 border-fuchsia-400 m-10 flex flex-wrap">
        {noteInfo.allNotes.length > 0 ? (
          notes.map((note, i) => {
            return (
              <div
                className="note bg-white ml-5 mr-5 mt-5 w-200 p-2 relative px-4 py-4"
                key={i}
              >
                <div className="mb-6">
                  <a
                    href="#editnotes"
                    className="absolute right-12 top-1"
                    onClick={() => {
                      handleEdit(note);
                    }}
                  >
                    <img
                      className="edit-notes"
                      src="./src/assets/edit.png"
                      alt=""
                    />
                  </a>
                  <button
                    className="delete-notes absolute right-2 top-0"
                    onClick={() => handleDelete(note.id)}
                  >
                    <img src="./src/assets/delete.png" alt="" />
                  </button>
                </div>
                <h3 className="font-bold text-2xl pb-2">{note.title}</h3>
                <div>
                  <p className="text-2xl font-thin">{note.note}</p>
                  <p>{new Date().getFullYear()}</p>
                </div>
              </div>
            );
          })
        ) : (
          <p className="py-5">You don't have any notes.</p>
        )}
      </div> */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          <Link to="/">Sign Out</Link>
        </button>
      </div>
    </div>
  );
};

export default Notes;
