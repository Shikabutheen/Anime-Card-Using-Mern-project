import React, { useEffect, useState } from "react";
import { UserData } from "../context/user";
import { useNavigate, Link } from "react-router-dom";
import { CardData } from "../context/cards";

const Home = () => {
  const { logoutUser } = UserData();
  const navigate = useNavigate();
  const { allcards, GetCards, loading, DeleteCard, UpdateCard } = CardData();

  // 🔹 Modal state
  const [showModal, setShowModal] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [form, setForm] = useState({
    title: "",
    description: "",
    anime: "",
    power: "",
  });
  const [file, setFile] = useState(null);

  // 🔹 Fetch all cards on mount
  useEffect(() => {
    GetCards();
  }, []);

  // 🔹 Handle form inputs
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const fileChangeHandler = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  // 🔹 Open modal with selected card data
  const openUpdateModal = (card) => {
    setSelectedCard(card);
    setForm({
      title: card.title,
      description: card.description,
      anime: card.anime,
      power: card.power,
    });
    setFile(null);
    setShowModal(true);
  };

  // 🔹 Submit update
  const handleUpdate = async () => {
    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("description", form.description);
    formData.append("anime", form.anime);
    formData.append("power", form.power);
    if (file) formData.append("file", file);

    await UpdateCard(selectedCard._id, formData);
    setShowModal(false);
  };

  if (loading)
    return <p className="text-center mt-10 text-gray-500">Loading cards...</p>;

  return (
    <>
      {/* 🔹 Navbar */}
      <header className="bg-gradient-to-r from-amber-500 to-orange-400 shadow-md">
        <nav className="flex flex-col md:flex-row md:justify-between items-center px-6 py-4 max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-white mb-4 md:mb-0">
            Anime Card Creation
          </h1>
          <div className="flex gap-3 items-center">
            <Link to="/add">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl transition">
                ➕ Add Card
              </button>
            </Link>
            <button
              onClick={() => logoutUser(navigate)}
              className="bg-white text-black font-semibold px-4 py-2 rounded-xl hover:bg-gray-200 transition"
            >
              Logout
            </button> 
          </div>
        </nav>
      </header>

      {/* 🔹 Cards Grid */}
      <main className="p-8 max-w-6xl mx-auto">
        {allcards.length === 0 ? (
          <p className="text-center text-gray-500 text-lg mt-10">
            No cards available 😔
          </p>
        ) : (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {allcards.map((card) => (
              <div
                key={card._id}
                className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300"
              >
                {card.thumbnail?.url && (
                  <img
                    src={card.thumbnail.url}
                    alt={card.title}
                    className="w-full h-44 object-cover"
                  />
                )}
                <div className="p-4">
                  <h2 className="text-lg font-bold text-gray-800 mb-1">
                    {card.title}
                  </h2>
                  <p className="text-gray-600 text-sm mb-2 line-clamp-2">
                    {card.description}
                  </p>
                  <p className="text-sm text-blue-500 font-medium">
                    Anime: {card.anime}
                  </p>
                  <p className="text-sm text-green-600 font-medium mb-3">
                    Power: {card.power}
                  </p>

                  <div className="flex justify-between">
                    <button
                      className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-lg text-sm transition"
                      onClick={() => openUpdateModal(card)}
                    >
                      ✏️ Update
                    </button>
                    <button
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg text-sm transition"
                      onClick={() => DeleteCard(card._id)}
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* 🔹 Update Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-2xl shadow-lg w-[90%] sm:w-[400px]">
            <h2 className="text-2xl font-bold mb-4 text-center text-gray-700">
              Update Card
            </h2>

            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Title"
              className="w-full mb-2 border border-gray-300 p-2 rounded focus:ring-2 focus:ring-amber-400"
            />
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Description"
              className="w-full mb-2 border border-gray-300 p-2 rounded focus:ring-2 focus:ring-amber-400"
            ></textarea>
            <input
              type="text"
              name="anime"
              value={form.anime}
              onChange={handleChange}
              placeholder="Anime"
              className="w-full mb-2 border border-gray-300 p-2 rounded focus:ring-2 focus:ring-amber-400"
            />
            <input
              type="text"
              name="power"
              value={form.power}
              onChange={handleChange}
              placeholder="Power"
              className="w-full mb-3 border border-gray-300 p-2 rounded focus:ring-2 focus:ring-amber-400"
            />
            <input
              type="file"
              accept="image/*"
              onChange={fileChangeHandler}
              className="w-full mb-3 border border-gray-300 p-2 rounded"
            />

            {/* 🖼️ Preview new image */}
            {file && (
              <img
                src={URL.createObjectURL(file)}
                alt="Preview"
                className="w-full h-40 object-cover rounded mb-3 border"
              />
            )}

            <div className="flex justify-end gap-3 mt-4">
              <button
                className="bg-gray-400 hover:bg-gray-500 text-white px-3 py-1 rounded-lg transition"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-lg transition"
                onClick={handleUpdate}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
