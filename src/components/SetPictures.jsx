import React, { useEffect, useState } from "react";
import getPictureAPI from "../logic/getPicture";
import { saveToFavorite } from "../logic/saveToFavorite";
import { deleteFromFavorite } from "../logic/deleteFromFavorite";
import { getFavorites } from "../logic/getFavorites";

export default function SetPicturesToWeb({ pictures, setPictures }) {
  const [savedIds, setSavedIds] = useState([]);

  useEffect(() => {
    const loadPictures = async () => {
      const data = await getPictureAPI();
      if (data) {
        setPictures(data);
      }
      const favorites = await getFavorites();
      setSavedIds(favorites.map(fav => fav.id));
    };
    loadPictures();
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 p-8">
      <div className="picture-list w-full flex flex-wrap justify-center gap-6">
        {pictures.map((img) => (
          <div
            key={img.id}
            className="picture-item relative w-64 rounded-lg overflow-hidden bg-slate-800"
          >
            <img
              src={img.urls.regular}
              alt={img.user.name}
              className="picture-image w-full h-48 object-cover"
            />
            <div className="p-4">
              <p className="picture-author font-bold text-center text-slate-200">
                {img.user.name}
              </p>
            </div>
            <button
              onClick={async () => {
                if (savedIds.includes(img.id)) {
                  await deleteFromFavorite(img.id);
                  setSavedIds(savedIds.filter(id => id !== img.id));
                } else {
                  await saveToFavorite(img);
                  setSavedIds([...savedIds, img.id]);
                }
              }}
              className={`absolute top-3 right-3 px-3 py-1 rounded-full hover:transition font-bold text-sm ${
                savedIds.includes(img.id)
                  ? "bg-red-400 text-slate-950 hover:bg-red-300"
                  : "bg-emerald-400 text-slate-950 hover:bg-emerald-300"
              }`}
            >
              {savedIds.includes(img.id) ? "Delete" : "Save"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
