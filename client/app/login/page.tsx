"use client";

import Link from "next/link";
import React, { SyntheticEvent, useState } from "react";

const page = () => {
  const [loginStatus, setLoginStatus] = useState(0);

  const loginUser = async (event: SyntheticEvent) => {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);

    const getCsrfToken = async () => {
      const response = await fetch("http://localhost:8000/user/csrftoken", {
        method: "GET",
        credentials: "include",
      });
      if (!response.ok) {
        setLoginStatus(1);
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
        setLoginStatus(1);
        throw new Error("login failed");
      }

      const responseData = await response.json();
      setLoginStatus(2);
      console.log("login successful:", responseData);
    } catch (err) {
      setLoginStatus(1);
      console.error("Error during login:");
    }
  };

  return (
    <div className="flex justify-center w-full h-[88vh] text-black">
      <div className="self-center w-3/4 h-1/2 flex flex-col justify-center">
        <form
          className="self-center w-full h-fit p-4 flex flex-col justify-center shadow-xl rounded-md"
          onSubmit={loginUser}
        >
          <input
            id="username"
            className="w-full self-center text-center border-2 p-2 m-2"
            type="text"
            placeholder="Enter Username"
            name="username"
          ></input>
          <input
            id="password"
            className="w-full self-center text-center border-2 p-2 m-2"
            type="password"
            name="password"
            placeholder="Enter Password"
          />
          <button
            type="submit"
            className="w-full self-center text-center border-2 bg-orange-500 p-2 m-2"
          >
            Login
          </button>
          <Link href="/register">
            <p className="text-xs text-center text-blue-500">
              No Account? Make one here.
            </p>
          </Link>
        </form>

        {loginStatus === 2 ? (
          <p className="text-green-500">Succesfully logged in</p>
        ) : loginStatus === 1 ? (
          <p className="text-red-500">Did not log in succesfully</p>
        ) : null}
      </div>
    </div>
  );
};

export default page;
