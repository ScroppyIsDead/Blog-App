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
    <div className="flex flex-col justify-center">
      <div className="max-w-sm mx-auto p-4 bg-white rounded-lg shadow-md">
        <h2 className="text-lg font-medium text-gray-800">Account Settings</h2>

        <div className="mt-4">
          <ul className="text-gray-700">
            <li className="flex justify-between my-2">
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
