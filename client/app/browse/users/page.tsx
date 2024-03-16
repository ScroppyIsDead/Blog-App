"use client";
import { getAllUsers } from "@/app/components/functions";
import React, { useEffect, useState } from "react";
import DefaultAvatar from "../../../public/DefaultProfile.jpg";
import Image from "next/image";

const page = () => {
  const [usersArray, setUsersArray] = useState([]);
  const [getUsersArrayStatus, setUserArrayStatus] = useState(0);

  useEffect(() => {
    getAllUsers(setUsersArray, setUserArrayStatus);
  }, []);

  return (
    <div>
      {getUsersArrayStatus === 2 ? (
        <ul>
          {usersArray.map((user, index) => (
            <li
              className="flex border-2 rounded border-black h-10 p-6 m-2 flex-row items-center"
              key={index}
            >
              <Image
                className="w-10 h-10 rounded-full mx-2 "
                src={DefaultAvatar}
                alt="ProfileImage"
              />
              <a
                className="hover:text-gray-800 p-2 mx-2"
                href={"/browse/users/" + user.username}
              >
                {user.username}
              </a>
            </li>
          ))}
        </ul>
      ) : getUsersArrayStatus === 1 ? (
        <p>not found</p>
      ) : (
        <p>loading...</p>
      )}
    </div>
  );
};

export default page;
