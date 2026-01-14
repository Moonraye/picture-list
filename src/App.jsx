import React, { useState } from "react";
import Header from "./components/Header";
import SetPicturesToWeb from "./components/setPictures";
import SavedPictures from "./components/SavedPictures";

export default function App() {
  const [activeComponent, setActiveComponent] = useState("library");
  const [pictures, setPictures] = useState([]);

  return (
    <div className="app">
      <Header 
        activeComponent={activeComponent}
        setActiveComponent={setActiveComponent}
        setPictures={setPictures}
      />
      <main className="content">
        {activeComponent === "library" && <SetPicturesToWeb pictures={pictures} setPictures={setPictures} />}
        {activeComponent === "saved" && <SavedPictures />}
      </main>
    </div>
  );
}
