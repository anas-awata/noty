import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function NotesDetails() {
  //get passed values of collection name and note name from router
  const { id, note } = useParams();
  const navigate = useNavigate();
  //store storage value
  const storage = { ...localStorage };
  //get my collection values from storage
  const notes = JSON.parse(storage[id]);
  //var to enable save button when editing and disable it after saving
  const [save, SetSave] = useState(false);

  const handleClick = () => {
    //delete the note from var then update local storage with it
    delete notes[note];
    localStorage.setItem(id, JSON.stringify(notes));
    //if collection is Empty After delete then Delete collection
    if (Object.keys(notes).length == 0) {
      localStorage.removeItem(id);
    }
    navigate("/");
  };

  //copy function to copy the note
  const handleCopy = (note) => {
    navigator.clipboard
      .writeText(note)
      .then(() => {
        console.log("copied");
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  // on Save click update note in storage
  const handleSave = () => {
    localStorage.setItem(id, JSON.stringify(notes, null, 4));
    SetSave(false);
  };

  return (
    <div className="note-details">
      <button className="note-btn" onClick={handleClick}>
        {" "}
        delete{" "}
      </button>
      <button className="note-btn" onClick={() => handleCopy(notes[note].body)}>
        {" "}
        copy{" "}
      </button>
      <button className="save note-btn" disabled={!save} onClick={handleSave}>
        {" "}
        Save{" "}
      </button>
      <button className="back-button" onClick={() => navigate(-1)}>
        &laquo;
      </button>

      {notes && (
        <article>
          <h2>{notes[note].title}</h2>
          <p
            className="editable"
            contentEditable="true"
            onInput={(e) => {
              notes[note].body = e.currentTarget.innerText;
              SetSave(true);
            }}
          >
            {notes[note].body}
          </p>
        </article>
      )}
    </div>
  );
}

export default NotesDetails;
