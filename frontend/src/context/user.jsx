import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuth, setIsAuth] = useState(false);
  const [loading, setLoading] = useState(true);
  const [btnlod, setBtnlod] = useState(false);

  // Called on app load to restore auth from cookie
  async function getuser(){
    try {
        const {data}=await axios.get("/api/user/me")
       console.log(data);
       
        setUser(data)
        setIsAuth(true)
        setLoading(false)
    } catch (error) {
        console.log(error);
        setIsAuth(false)
        setLoading(false)
        
        
    }
  }

  useEffect(()=>{
    getuser()
  },[])

  // Register
  const registerUser = async (name, email, password, navigate) => {
    setBtnlod(true);
    try {
      const { data } = await axios.post("/api/user/reg", { name, email, password });
      toast.success(data.msg);
      setUser(data.user);
      setIsAuth(true);
      navigate("/");
    } catch (error) {
      toast.error(error?.response?.data?.msg || "Registration failed");
    } finally {
      setBtnlod(false);
    }
  };

  // Login
  const loginUser = async (email, password, navigate) => {
    setBtnlod(true);
    try {
      const { data } = await axios.post("/api/user/login", { email, password });
      toast.success(data.msg);
      setUser(data.user);
      setIsAuth(true);
      navigate("/");
    } catch (error) {
      toast.error(error.response.data.msg || "Login failed");
    } finally {
      setBtnlod(false);
    }
  };

  // Logout
  //Login Out
 async function logoutUser(navigate) {
  try {
    const { data } = await axios.get("/api/user/logout", { withCredentials: true });
    toast.success(data.msg);
    navigate("/login"); // redirect to login page
  } catch (error) {
    toast.error(error.response?.data?.msg || "Logout failed");
  }
}

  if (loading) return <div>Loading...</div>;

  return (
    <UserContext.Provider value={{ user, isAuth, btnlod, registerUser, loginUser, logoutUser,getuser }}>
      {children}
      <Toaster />
    </UserContext.Provider>
  );
};

export const UserData = () => useContext(UserContext);
