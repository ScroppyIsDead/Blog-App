"use client";
import React, { useState } from "react";
import { CSRFTOKEN, USER_REGISTER } from "../components/urls";

const page = () => {
  const [registerStatus, setregisterStatus] = useState(0);
  const [registerMessage, setRegisterMessage] = useState("");

  const registerUser = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);

    const getCsrfToken = async () => {
      const response = await fetch(CSRFTOKEN, {
        method: "GET",
        credentials: "include",
      });
      if (!response.ok) {
        setregisterStatus(1);
        throw new Error("failed retriving the csrf token");
      }
      const adata = await response.json();
      return adata.csfrToken;
    };

    const data = {
      username: formData.get("username"),
      password1: formData.get("password"),
      email: formData.get("email"),
      password2: formData.get("password2"),
      email2: formData.get("email2"),
    };

    console.log(data);
    const csfrToken = await getCsrfToken();

    try {
      const response = await fetch(USER_REGISTER, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": csfrToken,
        },
        body: JSON.stringify(data),
        credentials: "include",
      });
      const responseMessage = await response.json();
      if (!response.ok) {
        setregisterStatus(1);
        setRegisterMessage(responseMessage.message);
        throw new Error("Registration failed");
      }

      const responseData = await response.json();
      setregisterStatus(2);
      console.log("Registration successful:", responseData);
    } catch (err) {
      setregisterStatus(1);
      console.error("Error during registration:", err);
    }
  };

  const inputStyles = "w-full p-2 border rounded mb-4";

  return (
    <div className="h-[85vh] flex justify-center items-center">
      <div className="bg-gray-100 p-4 rounded-lg shadow-md">
        <h1 className={"text-2xl font-bold text-center mb-4"}>Register Here</h1>

        <form className={"max-w-md mx-auto"} onSubmit={registerUser}>
          <input
            className={inputStyles}
            type="text"
            placeholder="Username"
            id="username"
            name="username"
          />

          <input
            className={inputStyles}
            type="text"
            placeholder="Email"
            id="email"
            name="email"
          />

          <input
            className="hidden"
            type="text"
            placeholder="Confirm Email"
            id="email2"
            name="email2"
          ></input>

          <input
            className={inputStyles}
            type="password"
            placeholder="Password"
            id="password"
            name="password"
          />

          <input
            className={inputStyles}
            type="password"
            placeholder="Confirm Password"
            id="password2"
            name="password2"
          />

          <button
            className={"bg-blue-500 text-white p-2 rounded w-full"}
            type="submit"
          >
            Submit Form
          </button>
        </form>

        {registerStatus === 2 ? (
          <p className={"text-center text-lg text-green-500"}>
            Register Success
          </p>
        ) : registerStatus === 1 ? (
          <p className={"text-center text-lg text-red-500"}>
            {registerMessage}
          </p>
        ) : null}
      </div>
    </div>
  );
};

export default page;
