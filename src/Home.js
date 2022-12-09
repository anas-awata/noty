import React from "react";
import { Link } from "react-router-dom";

function Home() {
  //get collection names from local storage and filtered from default stats values.
  let keys = Object.keys(localStorage);
  keys = keys.filter(
    (key) =>
      key != "editorHasEmittedBundle" &&
      key != "editorLastConnected" &&
      key != "firebase:previous_websocket_failure"
  );

  return (
    <div className="note-collections">
      {keys.map((key) => (
        <div className="blog-preview" key={key}>
          <Link to={`/collection/${key}`}>
            {keys && (
              <div>
                <h2>{key}</h2>
              </div>
            )}
          </Link>
        </div>
      ))}
      {keys.length == 0 && (
        <div className="empty">
          <Link to="create">
            <div>
              <h1>You Don't Have Any Notes</h1>
              <h2>Add New Note </h2>
            </div>
          </Link>
        </div>
      )}
    </div>
  );
}

export default Home;
