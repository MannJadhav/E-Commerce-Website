import axios from "axios";
import React, { useState } from "react";
import { redirect } from "react-router-dom";

const Login = ({ handleLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // For error handling
  const [loading, setLoading] = useState(false); // For loading state

  const onSubmitHandler = async (e) => {
    e.preventDefault(); // Prevent default form submission
    setLoading(true); // Start loading

    try {
      const response = await axios.post(`/api/user/admin`, {
        email,
        password,
      });
      if (response.data.success) {
        localStorage.setItem("token", response.data.token);
        handleLogin(response.data.token);
        redirect("/");
      }
    } catch (error) {
      // Handle error
      setError("Login failed. Please check your credentials."); // Set error message
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center w-full">
      <div className="bg-white shadow-md rounded-lg px-8 py-6 max-w-md">
        <h1 className="text-2xl font-bold mb-4">Admin Panel</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}{" "}
        {/* Show error message */}
        <form onSubmit={onSubmitHandler}>
          <div className="mb-3 min-w-72">
            <p className="text-sm font-medium text-gray-700 mb-2">
              Email Address
            </p>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="rounded-md w-full px-3 py-2 border border-gray-300 outline-none"
              type="email"
              placeholder="your@email.com"
              required
            />
          </div>
          <div className="mb-3 min-w-72">
            <p className="text-sm font-medium text-gray-700 mb-2">Password</p>
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className="rounded-md w-full px-3 py-2 border border-gray-300 outline-none"
              type="password"
              placeholder="Enter your password"
              required
            />
          </div>
          <button
            className={`mt-2 w-full py-2 px-4 rounded-md text-white ${
              loading ? "bg-gray-500" : "bg-black"
            }`} // Change button style if loading
            type="submit"
            disabled={loading} // Disable button while loading
          >
            {loading ? "Logging in..." : "Login"}{" "}
            {/* Change button text if loading */}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
