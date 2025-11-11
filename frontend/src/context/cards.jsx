import axios from "axios";
import { useContext, useState, useEffect, createContext } from "react";
import toast from "react-hot-toast";

const CardsContext = createContext();

export const CardsProvider = ({ children }) => {
  const [allcards, setCards] = useState([]);
  const [loading, setLoading] = useState(false);

  // ✅ Create Card
  async function CreateCards(formData) {
  
    try {
      const { data } = await axios.post("/api/cards/new", formData);
      toast.success(data.msg || "Card created successfully");
      await GetCards(); // refresh the list
    } catch (err) {
      toast.error(err.response?.data?.msg || "Failed to create card");
    } 
  }

  // ✅ Get all Cards
  async function GetCards() {
  
    try {
      const { data } = await axios.get("/api/cards/all");
      setCards(data.cards || data); // adjust based on your backend
    } catch (error) {
      console.error("Error fetching cards:", error);
      toast.error("Failed to load cards");
    } 
  }

  // ✅ Update Card
 async function UpdateCard(id, formData) {
  try {
    const { data } = await axios.put(`/api/cards/up/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    toast.success(data.msg || "Card updated successfully");
    await GetCards(); // refresh after update
  } catch (error) {
    console.error("Error updating card:", error);
    toast.error(error.response?.data?.msg || "Failed to update card");
  }
}

  // ✅ Delete Card
  async function DeleteCard(id) {
   
    try {
      const { data } = await axios.delete(`/api/cards/delete/${id}`);
      toast.success(data.msg || "Card deleted successfully");
      // filter locally for faster UI update
      setCards((prev) => prev.filter((card) => card._id !== id));
    } catch (error) {
      console.error("Error deleting card:", error);
      toast.error(error.response?.data?.msg || "Failed to delete card");
    } 
  }

  // ✅ Auto load
  useEffect(() => {
    GetCards();
  }, []);

  return (
    <CardsContext.Provider
      value={{
        GetCards,
        CreateCards,
        UpdateCard,
        DeleteCard,
        allcards,
        loading,
        setLoading,
      }}
    >
      {children}
    </CardsContext.Provider>
  );
};

export const CardData = () => useContext(CardsContext);
