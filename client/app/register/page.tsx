"use client";
import React, { useState } from "react";

const page = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [registerStatus, setregisterStatus] = useState(0);

  const changeUser = (e) => {
    setUsername(e.target.value);
  };
  const changePassword = (e) => {
    setPassword(e.target.value);
  };
  const changeEmail = (e) => {
    setEmail(e.target.value);
  };

  const registerUser = async () => {
    const getCsrfToken = async () => {
      const response = await fetch("http://localhost:8000/user/csrftoken", {
        method: "GET",
        credentials: "include",
      });
      if (!response.ok) {
        setregisterStatus(1);
        throw new Error("failed retriving the csrf token");
      }
      const data = await response.json();
      return data.csfrToken;
    };

    const data = {
      username: username,
      email: email,
      password1: password,
      password2: password, //fix this and make seperate password
    };

    const csfrToken = await getCsrfToken();

    try {
      const response = await fetch("http://localhost:8000/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": csfrToken,
        },
        body: JSON.stringify(data),
        credentials: "include",
      });

      if (!response.ok) {
        setregisterStatus(1);
        throw new Error("Registration failed");
      }

      const responseData = await response.json();
      setregisterStatus(2);
      console.log("Registration successful:", responseData);
    } catch (err) {
      setregisterStatus(1);
      console.error("Error during registration:");
    }
  };

  return (
    <div className="flex justify-center w-full h-[100vh] text-black">
      <div className="self-center w-1/2 h-1/2 flex flex-col justify-center">
        <input
          className="w-1/2 self-center text-center border-2 p-2 m-2"
          type="text"
          placeholder="Username"
          onChange={changeUser}
        ></input>
        <input
          className="w-1/2 self-center text-center border-2 p-2 m-2"
          type="password"
          placeholder="Password"
          onChange={changePassword}
        />
        <input
          className="w-1/2 self-center text-center border-2 p-2 m-2"
          type="text"
          placeholder="Email"
          onChange={changeEmail}
        />
        <button
          className="w-1/2 self-center text-center border-2 bg-orange-500 p-2 m-2"
          onClick={registerUser}
        >
          Submit
        </button>
        {registerStatus === 2 ? (
          <p className="text-green-500">Register Success</p>
        ) : registerStatus === 1 ? (
          <p className="text-red-500">Error while registering, try again</p>
        ) : null}
      </div>
    </div>
  );
};

export default page;
