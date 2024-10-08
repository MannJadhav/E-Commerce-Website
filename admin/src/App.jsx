import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Slidebar from "./components/Slidebar";
import { Routes, Route, Navigate } from "react-router-dom";
import Add from "./pages/Add";
import List from "./pages/List";
import Orders from "./pages/Orders";
import Login from "./components/Login";

export const backendUrl = import.meta.env.VITE_BACKEND_URL;

const App = () => {
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  // Function to handle login, you can pass this to the Login component
  const handleLogin = (token) => {
    setToken(token);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {token === "" ? (
        <Login onLogin={handleLogin} />
      ) : (
        <>
          <Navbar />
          <hr />
          <div className="flex w-full">
            <Slidebar />
            <div className="w-[70%] mx-auto my-8 text-gray-600 text-base">
              <Routes>
                <Route path="/add" element={<Add />} />
                <Route path="/list" element={<List />} />
                <Route path="/orders" element={<Orders />} />
                {/* Redirect to /add if accessing root */}
                <Route path="/" element={<Navigate to="/add" />} />
              </Routes>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default App;
