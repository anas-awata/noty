import React, { useState, useEffect } from "react";
import Navbar from "./navbar.js";
import Home from "./Home.js";
import Create from "./create.js";
import NoteDetails from "./noteDetails.js";
import NotFound from "./notFound.js";
import CollectionDetails from "./collectionDetails.js";
import { Routes, Route } from "react-router-dom";

export default function App() {
  //localStorage.clear();

  return (
    <div>
      <Navbar />
      <div className="content">
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/create" element={<Create />} />
          <Route path="/collection/:id/:note" element={<NoteDetails />} />
          <Route path="/collection/:id" element={<CollectionDetails />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
}
