import React, { useState } from "react";

const Login = () => {
  const [currentState, setCurrentState] = useState("Sign Up");

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    // Handle form submission logic here
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
      {currentState === "Login" ? null : (
        <input
          type="text"
          className="w-full px-4 py-2 border border-gray-400 rounded focus:outline-none focus:ring focus:ring-gray-300"
          placeholder="Name"
          required
        />
      )}
      <input
        type="email"
        className="w-full px-4 py-2 border border-gray-400 rounded focus:outline-none focus:ring focus:ring-gray-300"
        placeholder="Email"
        required
      />
      <input
        type="password"
        className="w-full px-4 py-2 border border-gray-400 rounded focus:outline-none focus:ring focus:ring-gray-300"
        placeholder="Password"
        required
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
