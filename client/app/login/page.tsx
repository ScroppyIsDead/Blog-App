"use client";

import Link from "next/link";
import React, { SyntheticEvent, useState } from "react";
import { CSRFTOKEN, USER_LOGIN } from "../components/urls";
import { loginUser } from "../components/functions";

const page = () => {
  const [loginStatus, setLoginStatus] = useState(0);

  const formInputclassname =
    "w-full self-center text-center border-2 p-2 m-2 rounded";

  return (
    <div className="flex justify-center w-full h-[88vh] text-black">
      <div className="self-center w-3/4 h-1/2 flex flex-col justify-center">
        <form
          className="self-center w-full h-fit p-4 flex flex-col justify-center shadow-xl rounded-md"
          onSubmit={() => loginUser(event, setLoginStatus)}
        >
          <p className="text-center text-xl">Login Here</p>
          <input
            id="username"
            className={formInputclassname}
            type="text"
            placeholder="Enter Username"
            name="username"
          ></input>
          <input
            id="password"
            className={formInputclassname}
            type="password"
            name="password"
            placeholder="Enter Password"
          />
          <button
            type="submit"
            className="w-full self-center text-center border-2 p-2 m-2 rounded bg-orange-500"
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
