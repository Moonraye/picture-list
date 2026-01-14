import React, { useState } from "react";
import getPictureAPI from "../logic/getPicture";

export default function Header({
  activeComponent,
  setActiveComponent,
  setPictures,
}) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      alert("Please enter a search term.");
      return;
    }
    const data = await getPictureAPI(searchQuery);
    setPictures(data);
  };

  return (
    <header className="bg-slate-950 text-white py-4">
      <div className="flex items-center justify-between px-12 w-full">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold text-white">PictureLib</h1>
        </div>
        {activeComponent === "library" && (
          <form onSubmit={handleSearch} className="flex items-center gap-2">
            <input
              className="rounded-2xl px-4 py-2 text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-400 bg-slate-200"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search your dreams.."
            />
            <button
              type="submit"
              className="px-6 py-2 bg-emerald-400 text-slate-950 rounded-2xl hover:bg-emerald-300 transition font-bold"
            >
              Search
            </button>
          </form>
        )}
        <div className="flex gap-3">
          <button
            onClick={() => setActiveComponent("library")}
            className={`px-8 py-2 rounded-2xl font-bold transition text-lg ${
              activeComponent === "library"
                ? "bg-emerald-400 text-slate-950"
                : "text-slate-400 hover:text-emerald-400"
            }`}
          >
            Library
          </button>
          <button
            onClick={() => setActiveComponent("saved")}
            className={`px-8 py-2 rounded-2xl font-bold transition text-lg ${
              activeComponent === "saved"
                ? "bg-emerald-400 text-slate-950"
                : "text-slate-400 hover:text-emerald-400"
            }`}
          >
            Saved
          </button>
        </div>
      </div>
    </header>
  );
}
