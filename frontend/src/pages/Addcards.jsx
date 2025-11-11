import React, { useState } from "react";
import { CardData } from "../context/cards";
import {  Link} from "react-router-dom";

const Addcards = () => {
  const { CreateCards, loading } = CardData();


  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [anime, setAnime] = useState("");
  const [power, setPower] = useState("");
  const [file, setFile] = useState(null);

  const fileChangeHandler = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const addCards = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("anime", anime);
    formData.append("power", power);
    formData.append("file", file); // ✅ correct key

    await CreateCards(formData);

    // // ✅ clear input fields
    setTitle("");
    setDescription("");
    setAnime("");
    setPower("");
    setFile(null);

    // // ✅ optional: navigate back to home
    // navigate("/");
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-md rounded-xl p-6 mt-10">
      <h2 className="text-2xl font-bold text-center mb-6">Add New Card</h2>
      <form onSubmit={addCards} className="space-y-4">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="add-input"
        />
        <input
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className="add-input"
        />
        <input
          type="text"
          placeholder="Anime"
          value={anime}
          onChange={(e) => setAnime(e.target.value)}
          required
          className="add-input"
        />
        <input
          type="text"
          placeholder="Power"
          value={power}
          onChange={(e) => setPower(e.target.value)}
          required
          className="add-input"
        />
        <input
          type="file"
          accept="image/*"
          onChange={fileChangeHandler}
          required
          className="add-input"
        />

        <button
          type="submit"
         
          className="w-full bg-blue-500 text-white font-semibold py-2 rounded hover:bg-blue-600 transition"
        >
          {loading ? "Creating..." : "Add Card"}
        </button>

         <Link to='/' className="add-input">Return </Link>
      </form>

     
    </div>
  );
};

export default Addcards;
