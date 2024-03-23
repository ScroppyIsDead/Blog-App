"use client";
import React, { SyntheticEvent, useState } from "react";
import { CSRFTOKEN, USER_LOGIN } from "../components/urls";
import { loginUser } from "../components/functions";

const page = () => {
  const [loginStatus, setLoginStatus] = useState(0);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="w-full max-w-md p-4 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">
          Login
        </h1>

        <form
          className="space-y-4"
          onSubmit={(e) => loginUser(e, setLoginStatus)}
        >
          <div>
            <label className="text-gray-600">Username:</label>
            <input
              type="text"
              name="username"
              className="w-full p-2 border border-gray-300 rounded mt-1"
            />
          </div>

          <div>
            <label className="text-gray-600">Password:</label>
            <input
              type="password"
              name="password"
              className="w-full p-2 border border-gray-300 rounded mt-1"
            />
          </div>

          <button
            type="submit"
            className="w-full p-2 bg-blue-500 text-white rounded"
          >
            Login
          </button>
        </form>

        <div className="flex justify-center items-center mt-4 text-gray-600 text-sm">
          <p>Don't have an account? </p>
          <a href="/register">
            <p className="text-blue-500 ml-1">Register</p>
          </a>
        </div>

        {loginStatus === 2 && (
          <p className="mt-4 text-green-500 text-center">
            Successfully logged in!
          </p>
        )}

        {loginStatus === 1 && (
          <p className="mt-4 text-red-500 text-center">
            Login failed, please try again.
          </p>
        )}
      </div>
    </div>
  );
};

export default page;
