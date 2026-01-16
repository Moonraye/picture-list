import React, { useState, useEffect } from "react";
import { getFavorites } from "../logic/getFavorites";
import { deleteFromFavorite } from "../logic/deleteFromFavorite";
import { div } from "framer-motion/client";

export default function SavedPictures() {
  const [favorites, setFavorites] = useState([]);
  
  useEffect(() => {
    const load = async () => {
      const data = await getFavorites();
      setFavorites(data);
    };
    load();
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 p-8">
      <h2 className="text-3xl font-bold text-center my-6 text-white">
        Saved Pictures
      </h2>
      <div className="flex flex-wrap justify-center gap-6">
        {favorites.length > 0 ? (
          favorites.map((img) => (
            <div
              key={img.id}
              className="w-64 rounded-lg overflow-hidden bg-slate-800 text-white relative"
            >
              <img
                src={img.url}
                alt={img.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4 text-center">
                <p className="font-bold text-lg">{img.author}</p>
                <p className="text-sm text-slate-400">{img.title}</p>
              </div>
              <button
                onClick={async () => {
                  await deleteFromFavorite(img.id);
                  setFavorites(favorites.filter(fav => fav.id !== img.id));
                }}
                className="absolute top-3 right-3 px-3 py-1 bg-red-400 text-slate-950 rounded-full hover:bg-red-300 transition font-bold text-sm"
              >
                Delete
              </button>
            </div>
          ))
        ) : (
          <p className="text-slate-400 text-lg">Nothing saved yet...</p>
        )}
      </div>
    </div>
  );
}
