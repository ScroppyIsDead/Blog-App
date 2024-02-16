"use client";
import React, { useState } from "react";

const page = () => {
  const [loginstatus, setloginStatus] = useState(0);

  const loginUser = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);

    const getCsrfToken = async () => {
      const response = await fetch("http://localhost:8000/user/csrftoken", {
        method: "GET",
        credentials: "include",
      });
      if (!response.ok) {
        setloginStatus(1);
        throw new Error("failed retriving the csrf token");
      }
      const data = await response.json();
      return data.csfrToken;
    };

    const submit = {
      username: formData.get("username"),
      password: formData.get("password"),
    };

    const csfrToken = await getCsrfToken();

    try {
      const response = await fetch("http://localhost:8000/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": csfrToken,
        },
        body: JSON.stringify(submit),
        credentials: "include",
      });

      if (!response.ok) {
        setloginStatus(1);
        throw new Error("login failed");
      }

      const responseData = await response.json();
      setloginStatus(2);
      console.log("login successful:", responseData);
    } catch (err) {
      setloginStatus(1);
      console.error("Error during login:");
    }
  };

  return (
    <div className="flex justify-center w-full h-[100vh] text-black">
      <div className="self-center w-1/2 h-1/2 flex flex-col justify-center">
        <form
          className="self-center w-full h-full flex flex-col justify-center"
          onSubmit={loginUser}
        >
          <input
            id="username"
            className="w-1/2 self-center text-center border-2 p-2 m-2"
            type="text"
            placeholder="Username"
            name="username"
          ></input>
          <input
            id="password"
            className="w-1/2 self-center text-center border-2 p-2 m-2"
            type="password"
            name="password"
            placeholder="Password"
          />
          <button
            type="submit"
            className="w-1/2 self-center text-center border-2 bg-orange-500 p-2 m-2"
          >
            Login
          </button>
        </form>

        {loginstatus === 2 ? (
          <p className="text-green-500">Succesffully logged in</p>
        ) : loginstatus === 1 ? (
          <p className="text-red-500">Did not log in succesffully</p>
        ) : null}
      </div>
    </div>
  );
};

export default page;
