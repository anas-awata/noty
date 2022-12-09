import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
function Create() {
  //states
  const [note, setNote] = useState({
    title: "",
    body: "",
    collection: "Random",
  });
  const [newColletion, setNewCollection] = useState(false);
  const [yourCollection, setYourCollection] = useState(true);
  const [keys, setKeys] = useState([]);
  //navigate
  const navigate = useNavigate();

  //get keys to show current collections
  useEffect(() => {
    let keys = Object.keys(localStorage);
    keys = keys.filter(
      (key) =>
        key != "editorHasEmittedBundle" &&
        key != "editorLastConnected" &&
        key != "firebase:previous_websocket_failure"
    );
    setKeys(keys);
  }, []);

  //function to handle submit
  const handleSubmit = (e) => {
    e.preventDefault();

    //if collection is new
    if (!Object.keys(localStorage).includes(note.collection)) {
      //remove spaces from note title to store it
      let noteName = note.title.replace(/\s+/g, "");

      //store collection name and the new note in it in localStorage
      localStorage.setItem(
        note.collection,
        JSON.stringify({ [noteName]: note })
      );
    }

    //if collection already exist
    else if (Object.keys(localStorage).includes(note.collection)) {
      //get storage
      const oldNotes = { ...localStorage };
      //store current collection name
      let mycollection = note.collection;
      //get old collection and parse it
      const newNotes = JSON.parse(oldNotes[mycollection]);
      let noteName = note.title.replace(/\s+/g, "");
      console.log(mycollection);
      console.log(newNotes);
      //update the old collection with the new note
      newNotes[noteName] = note;
      //update local storage
      localStorage.setItem(mycollection, JSON.stringify(newNotes));
    }
    //redirect to Home
    navigate("/");
  };

  //function to handle showing or hiding input or select.
  function handleCollection() {
    setNewCollection(!newColletion);
    setYourCollection(!yourCollection);
  }

  return (
    <div className="create">
      <h2>Add New Note</h2>
      <form onSubmit={handleSubmit}>
        <label>Note title </label>
        <input
          type="text"
          required
          value={note.title}
          onChange={(e) => setNote({ ...note, title: e.target.value })}
        />
        <label>Note content</label>
        <textarea
          className="note-box"
          required
          value={note.body}
          onChange={(e) => setNote({ ...note, body: e.target.value })}
        ></textarea>
        <label>Note Collection</label>
        <button
          className="collection"
          disabled={yourCollection}
          type="button"
          onClick={handleCollection}
        >
          Your Collections
        </button>
        <button
          className="collection"
          disabled={newColletion}
          type="button"
          onClick={handleCollection}
        >
          Add New Collection
        </button>
        {yourCollection && (
          <>
            <select
              onChange={(e) => setNote({ ...note, collection: e.target.value })}
            >
              <option value="random">Random</option>
              {keys.map(
                (key) =>
                  key != "Random" && (
                    <option key={key} value={key}>
                      {key}
                    </option>
                  )
              )}
            </select>
          </>
        )}
        {newColletion && (
          <>
            <input
              type="text"
              required
              placeholder="Add Collection Name"
              onChange={(e) => setNote({ ...note, collection: e.target.value })}
            />
          </>
        )}
        <button className="submit">Add Note</button>
      </form>
    </div>
  );
}

export default Create;
