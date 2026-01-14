import React, { useEffect } from "react";
import getPictureAPI from "../logic/getPicture";
import { saveToFavorite } from "../logic/saveToFavorite";
export default function SetPicturesToWeb({ pictures, setPictures }) {
  useEffect(() => {
    const loadPictures = async () => {
      const data = await getPictureAPI();
      if (data) {
        setPictures(data);
      }
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
              onClick={() => saveToFavorite(img)}
              className="absolute top-3 right-3 px-3 py-1 bg-emerald-400 text-slate-950 rounded-full hover:bg-emerald-300 transition font-bold text-sm"
            >
              Save
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
