"use client";
import React, { useEffect, useState } from "react";
import { getEmail, getUsername } from "../components/functions";

const page = () => {
  const [getUserUsername, setGetUserUsername] = useState(0);
  const [usersUsername, setUsersUsername] = useState("");
  const [getUserEmail, setGetUserEmailStatus] = useState(0);
  const [usersEmail, setUsersEmail] = useState("");

  useEffect(() => {
    getUsername(setGetUserUsername, setUsersUsername);
    getEmail(setGetUserEmailStatus, setUsersEmail);
  }, []);

  return (
    <div className="flex flex-col justify-center ">
      <div className="w-full p-2 h-fit flex flex-col">
        <p className="text-xl">Account settings</p>
        <div className="flex flex-row justify-between">
          <ul>
            <li>
              {getUserUsername === 1 ? (
                <a href="/login" className="text-blue-500">
                  Click here to login
                </a>
              ) : getUserUsername === 2 ? (
                <div>
                  <p>Username: {usersUsername}</p>
                  <p>Email: {usersEmail}</p>
                  <p>Password: ***********</p>
                </div>
              ) : null}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default page;
