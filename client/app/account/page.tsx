"use client";
import React, { useEffect, useState } from "react";
import { changeBio, getEmail, getUsername } from "../components/functions";
import { CSRFTOKEN, UPLOAD_AVATAR } from "../components/urls";

const page = () => {
  const [getUserUsername, setGetUserUsername] = useState(0);
  const [usersUsername, setUsersUsername] = useState("");
  const [getUserEmail, setGetUserEmailStatus] = useState(0);
  const [usersEmail, setUsersEmail] = useState("");
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    getUsername(setGetUserUsername, setUsersUsername);
    getEmail(setGetUserEmailStatus, setUsersEmail);
  }, []);

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
          <input name="bio" id="bio" placeholder="Enter bio" type="text" />
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
