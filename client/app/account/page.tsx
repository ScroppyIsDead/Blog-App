"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  changeBio,
  changeEmail,
  getEmail,
  getUsername,
} from "../components/functions";
import { CSRFTOKEN, UPLOAD_AVATAR } from "../components/urls";
import { CiEdit } from "react-icons/ci";

const page = () => {
  const [getUserUsername, setGetUserUsername] = useState(0);
  const [usersUsername, setUsersUsername] = useState("");
  const [getUserEmail, setGetUserEmailStatus] = useState(0);
  const [usersEmail, setUsersEmail] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [changeEmailMenu, setchangeEmailMenu] = useState(false);
  const [changeEmailStatus, setChangeEmailStatus] = useState(0);
  const [newBio, setBio] = useState("");
  const textAreaRef = useRef(null);
  const MAX_LINE_BREAKS = 7;

  useEffect(() => {
    getUsername(setGetUserUsername, setUsersUsername);
    getEmail(setGetUserEmailStatus, setUsersEmail);
  }, []);

  useEffect(() => {
    textAreaRef.current.style.height = textAreaRef.current.scrollHeight + "px";
  }, [newBio]);

  const handleBioChange = (event: any) => {
    const newBio = event.target.value;
    // Restrict line breaks if limit is reached
    const editBio = newBio;
    if (editBio.split("\n").length > 8) {
      const allowedBio = newBio.substring(0, newBio.lastIndexOf("\n"));
      setBio(allowedBio);
      return;
    } else {
      setBio(newBio); // Update state if no restriction needed
    }
  };

  const handleImageChange = (event: any) => {
    const file = event.target.files[0];
    if (!file.type.startsWith("image/")) {
      console.error("Invalid file type. Only images allowed.");
      return;
    }
    setImageFile(file);
  };

  const handleImageSubmit = async (event: any) => {
    event.preventDefault();

    const getCsrfToken = async () => {
      const response = await fetch(CSRFTOKEN, {
        method: "GET",
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error("Failed retrieving the CSRF token");
      }
      const data = await response.json();
      return data.csfrToken;
    };

    const csrfToken = await getCsrfToken();

    if (!imageFile) {
      console.log("No image found");
      return;
    }

    const formData = new FormData();
    formData.append("csrftoken", csrfToken); // Include CSRF token
    formData.append("image", imageFile);

    try {
      const response = await fetch(UPLOAD_AVATAR, {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(`Image upload failed with status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Image upload successful:", data);
      // Handle successful response and update UI if needed
    } catch (error) {
      console.error("Image upload error:", error);
    }
  };

  return (
    <div className="flex flex-col justify-center">
      <div className="max-w-sm mx-auto p-4 bg-white rounded-lg shadow-md">
        <h2 className="text-lg font-medium text-gray-800">Account Settings</h2>
        <form onSubmit={(e) => changeBio(e)}>
          <textarea
            onChange={handleBioChange}
            name="bio"
            id="bio"
            placeholder="Enter bio"
            className="resize-none"
            value={newBio}
            ref={textAreaRef}
          />
          <button type="submit">Click me</button>
        </form>
        <form onSubmit={handleImageSubmit}>
          <input
            type="file"
            onChange={handleImageChange}
            id="imageinput"
            accept="image/*"
          />
          <button type="submit">submit image</button>
        </form>

        <div className="mt-4">
          <ul className="text-gray-700">
            <li className="flex justify-between my-2">
              {getUserUsername === 1 ? (
                <a href="/login" className="text-blue-500">
                  Click here to login
                </a>
              ) : getUserUsername === 2 ? (
                <div className="w-full">
                  <p>Username: {usersUsername}</p>
                  <div className="flex flex-row items-center justify-between w-full">
                    <p>Email: {usersEmail}</p>
                    <div
                      onClick={() => setchangeEmailMenu(!changeEmailMenu)}
                      className="text-xl color-transition hover:bg-gray-200 rounded-full p-2 cursor-pointer"
                    >
                      <CiEdit />
                    </div>
                  </div>
                  <p>Password: ***********</p>
                </div>
              ) : null}
            </li>
          </ul>
        </div>
      </div>
      <div
        className={`fixed flex-col p-4 flex top-0 left-0 right-0 bottom-40 m-auto z-10 transition-transform ease-in-out duration-500 w-[75vw] shadow-xl bg-white rounded h-[50vh] ${
          changeEmailMenu ? "translate-y-24 " : "-translate-y-[75vh]"
        }`}
      >
        <div className="flex flex-row justify-between w-full">
          <p className="text-xl font-semibold">Change Email</p>
          <p
            onClick={() => setchangeEmailMenu(!changeEmailMenu)}
            className="color-transition m-4 hover:bg-gray-300 p-2 rounded-full hover:text-red-700 text-red-500 cursor-pointer"
          >
            X
          </p>
        </div>

        <form onSubmit={() => changeEmail(event, setChangeEmailStatus)}>
          <input
            className="w-full p-2 border border-gray-300 rounded m-2"
            placeholder="Type your new email here"
            type="text"
            id="email"
            name="email"
          />
          <button
            className="p-2 rounded-xl color-transition hover:bg-gray-300"
            type="submit"
          >
            Submit Email
          </button>
          {changeEmailStatus === 2 ? (
            <p className="text-green-500">Changed email correctly</p>
          ) : changeEmailStatus === 1 ? (
            <p className="text-red-500">Error changing email</p>
          ) : null}
        </form>
      </div>
    </div>
  );
};

export default page;
