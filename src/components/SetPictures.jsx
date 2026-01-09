import React, { useState, useEffect, use } from "react";
import getPictureAPI from '../logic/getPicture';
export default function SetPicturesToWeb() {
    const [pictures, setPictures] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    
    const handleSearch = async(e) => {
        e.preventDefault();
        if(!searchQuery.trim()) {
            alert("Please enter a search term.");
            return;
        }
        const data = await getPictureAPI(searchQuery);
        setPictures(data);
    }
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
        <div className="set-pictures-container flex flex-col items-center">
            <div className="search w-full">
                <form onSubmit={handleSearch} className="search-form flex justify-center my-4">
                    <input className="border-1 rounded-2xl px-4 py-2 w-1/3"
                    type="text" value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)} 
                    placeholder="Search your dreams.." />
                    <button type="submit" className="search-button ml-2 px-4 py-2 bg-blue-500 text-white rounded-2xl">Search</button>
                </form>
            </div>
        <div className="picture-list w-full flex flex-wrap justify-center gap-4 p-4">
            {pictures.map((img) => (
                <div key={img.id} className="picture-item w-64 border rounded-lg overflow-hidden shadow-lg">
                    <img src={img.urls.regular}
                         alt ={img.user.name}
                         className="picture-image w-full h-3/4"/>
                    <p className="picture-author font-bold text-center text-2xl">{img.user.name}</p>
                </div>
            ))}
        </div>
    </div>
    );
}