import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Loginpage from './pages/loginpage';
import Regpage from './pages/Regpage';
import { UserData } from './context/user';
import Addcards from './pages/Addcards';

const App = () => {
  const { isAuth } = UserData();

  return (
    <BrowserRouter>
      <Routes>
      
        <Route
          path="/"
          element={isAuth ? <Home /> :<Loginpage/>}
        />

        {/* 🔑 Login */}
        <Route
          path="/login"
          element={ <Loginpage />}
        />

        {/* 📝 Register */}
        <Route
          path="/reg"
          element={ <Regpage />}
        />


        <Route path='/add' element={<Addcards/>}/>
      </Routes>

      
    </BrowserRouter>
  );
};

export default App;
