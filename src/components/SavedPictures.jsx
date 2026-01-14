import React, { useState, useEffect } from "react";
import { getFavorites } from "../logic/getFavorites";
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
              className="w-64 rounded-lg overflow-hidden bg-slate-800 text-white"
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
            </div>
          ))
        ) : (
          <p className="text-slate-400 text-lg">Nothing saved yet...</p>
        )}
      </div>
    </div>
  );
}
