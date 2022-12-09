import React from "react";
import { useParams, useHistory, Link } from "react-router-dom";

function CollectionDetails() {
  //get collection name from router
  const { id } = useParams();
  const storage = { ...localStorage };
  //get collection values
  const notes = JSON.parse(storage[id]);
  return (
    <div className="note-list">
      {Object.keys(notes).map((note) => (
        <div className="blog-preview" key={note}>
          <Link to={`/collection/${id}/${note}`}>
            {notes && (
              <div>
                <h2>{notes[note].title}</h2>
                <p>{notes[note].body.slice(0, 40)}...</p>
              </div>
            )}
          </Link>
        </div>
      ))}
    </div>
  );
}

export default CollectionDetails;
