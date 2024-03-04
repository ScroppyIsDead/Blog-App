"use client";
import React, { useState } from "react";
import { CSRFTOKEN, USER_REGISTER } from "../components/urls";

const page = () => {
  const [registerStatus, setregisterStatus] = useState(0);

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
      password2: formData.get("password"),
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

      if (!response.ok) {
        setregisterStatus(1);
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
  const inputFormClassname =
    "w-full self-center text-center border-2 p-2 m-2 rounded";
  return (
    <div className="flex justify-center w-full h-[88vh] text-black">
      <div className="self-center w-3/4 h-1/2 flex flex-col justify-center">
        <form
          className="self-center w-full h-fit p-4 flex flex-col justify-center shadow-xl rounded-md"
          onSubmit={registerUser}
        >
          <p className="text-center text-xl">Register Here</p>
          <input
            className={inputFormClassname}
            type="text"
            placeholder="Username"
            id="username"
            name="username"
          />
          <input
            className={inputFormClassname}
            type="text"
            placeholder="email"
            id="email"
            name="email"
          />
          <input
            className={inputFormClassname}
            type="password"
            placeholder="password"
            id="password"
            name="password"
          />
          <input
            className={inputFormClassname}
            type="password"
            placeholder="Confirm Password"
            id="password2"
            name="password2"
          />
          <button
            className="w-full self-center text-center border-2 rounded bg-orange-500 p-2 m-2"
            type="submit"
          >
            Submit Form
          </button>
        </form>
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
