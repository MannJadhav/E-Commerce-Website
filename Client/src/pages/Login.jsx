import React, { useContext, useState } from "react";
import { ShopContext } from "../context/ShopContext";

const Login = () => {
  const [currentState, setCurrentState] = useState("Sign Up");
  const { token, setToken, navigate } = useContext(ShopContext);

  // States for input fields
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  // Function to handle form submission
  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      const url = currentState === "Login" ? `/api/login` : `/api/signup`;
      const bodyData = {
        email,
        password,
      };
      if (currentState === "Sign Up") {
        bodyData.name = name; // Add name only for Sign Up
      }

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bodyData),
      });

      const data = await response.json();

      if (response.ok) {
        setToken(data.token); // Save token to context
        navigate("/"); // Redirect to home or another page
      } else {
        // Handle errors
        console.error(data.message || "Something went wrong");
        alert(data.message || "Failed to authenticate");
      }
    } catch (error) {
      console.error("An error occurred:", error);
      alert("Error occurred, please try again later");
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col items-center w-[90%] sm:max-w-md m-auto mt-14 gap-6 text-gray-800"
    >
      <div className="inline-flex items-center gap-2 mb-4 mt-10">
        <h1 className="prata text-3xl">{currentState}</h1>
        <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
      </div>

      {/* Conditionally render name field for Sign Up */}
      {currentState === "Sign Up" && (
        <input
          type="text"
          className="w-full px-4 py-2 border border-gray-400 rounded focus:outline-none focus:ring focus:ring-gray-300"
          placeholder="Name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      )}
      <input
        type="email"
        className="w-full px-4 py-2 border border-gray-400 rounded focus:outline-none focus:ring focus:ring-gray-300"
        placeholder="Email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        className="w-full px-4 py-2 border border-gray-400 rounded focus:outline-none focus:ring focus:ring-gray-300"
        placeholder="Password"
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <div className="w-full flex justify-between text-sm mt-2">
        <p className="cursor-pointer text-blue-600 hover:underline">
          Forget Your password?
        </p>
        {currentState === "Login" ? (
          <p
            onClick={() => setCurrentState("Sign Up")}
            className="cursor-pointer text-blue-600 hover:underline"
          >
            Create account
          </p>
        ) : (
          <p
            onClick={() => setCurrentState("Login")}
            className="cursor-pointer text-blue-600 hover:underline"
          >
            Login Here
          </p>
        )}
      </div>

      <button className="bg-black text-white font-semibold px-8 py-2 mt-4 rounded hover:bg-gray-800 transition duration-200">
        {currentState === "Login" ? "Sign In" : "Sign Up"}
      </button>
    </form>
  );
};

export default Login;
