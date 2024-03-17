"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import navlinks from "./navLinks";
import { getOwnAvatar, getUsername, userLogout } from "./functions";
import DefaultImage from "../../public/DefaultProfile.jpg";

const NavBar = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const [logoutStatus, setlogoutStatus] = useState(0);
  const [getusernameStatus, setGetuserUsername] = useState(0);
  const [username, setusersUsername] = useState("");
  const [avatarData, setAvatarData] = useState({});
  const [getAvatarStatus, setGetAvatarStatus] = useState(0);
  const [openAvatarMenu, setOpenAvatarMenu] = useState(false);

  useEffect(() => {
    getUsername(setGetuserUsername, setusersUsername);
    getOwnAvatar(setAvatarData, setGetAvatarStatus);
  }, []);

  return (
    <nav className="shadow-xl z-10 fixed w-full bg-gray-100 h-24">
      <div className="flex justify-between items-center h-full px-4 2xl:px-16">
        <div className="md:p-4">
          <Link
            onClick={() => setOpenAvatarMenu(false)}
            href="/"
            className="text-2xl font-bold hover:bg-gray-300 rounded-xl p-2"
          >
            Your Logo
          </Link>
        </div>
        <button
          className="m-2 md:hidden hover:bg-gray-300 p-2 rounded-full"
          onClick={() => setOpenMenu(!openMenu)}
        >
          <RxHamburgerMenu className="text-2xl" />
        </button>
        <div className="hidden md:flex">
          <ul className="flex items-center flex-row">
            {navlinks.map((link, index) => (
              <Link onClick={() => setOpenAvatarMenu(false)} href={link.href}>
                <li
                  key={index}
                  className="px-4 py-2 text-gray-600 rounded-full hover:bg-gray-200 hover:text-gray-800"
                >
                  {link.title}
                </li>
              </Link>
            ))}
          </ul>
          <button onClick={() => setOpenAvatarMenu(!openAvatarMenu)}>
            <img
              className="w-12 h-12 rounded-full mx-2 "
              src={avatarData.avatar ? avatarData.avatar : DefaultImage.src}
            />
          </button>
          {openAvatarMenu ? (
            <div className="absolute top-full right-0 mr-6 2xl:mr-16 mt-2 w-32 bg-white shadow-md rounded-md overflow-hidden z-50">
              <ul className="px-2 py-1">
                <li className="py-1 hover:bg-gray-200 p-2 cursor-pointer rounded">
                  <Link
                    onClick={() => setOpenAvatarMenu(false)}
                    href="/account"
                  >
                    Account
                  </Link>
                </li>
                <li className="py-1 hover:bg-gray-200 p-2 cursor-pointer rounded">
                  <Link onClick={() => setOpenAvatarMenu(false)} href="#">
                    Settings
                  </Link>
                </li>

                {getusernameStatus === 2 ? (
                  <li
                    className="py-1 hover:bg-gray-200 p-2 cursor-pointer rounded"
                    onClick={() => {
                      userLogout(setlogoutStatus);
                      getUsername(setGetuserUsername, setusersUsername);
                    }}
                  >
                    Logout
                  </li>
                ) : (
                  <>
                    <Link
                      onClick={() => setOpenAvatarMenu(false)}
                      href="/login"
                    >
                      <li className="py-1 hover:bg-gray-200 p-2 cursor-pointer rounded">
                        Login
                      </li>
                    </Link>
                    <Link
                      onClick={() => setOpenAvatarMenu(false)}
                      href="/register"
                    >
                      <li className="py-1 hover:bg-gray-200 p-2 cursor-pointer rounded">
                        Register
                      </li>
                    </Link>
                  </>
                )}
              </ul>
            </div>
          ) : null}
        </div>
      </div>
      {openMenu ? (
        <div className="fixed flex flex-col top-0 bg-white shadow-md left-0 h-full w-2/3 p-4">
          <div className="flex justify-between items-center mb-2">
            <p className="text-xl font-bold">Menu</p>
            <button
              className="text-xl p-2 hover:bg-gray-200 rounded-full text-red-500 font-bold"
              onClick={() => setOpenMenu(!openMenu)}
            >
              X
            </button>
          </div>

          <ul>
            {navlinks.map((link, index) => (
              <Link onClick={() => setOpenAvatarMenu(false)} href={link.href}>
                <li
                  key={index}
                  className="px-4 py-2 hover:bg-gray-200"
                  onClick={() => setOpenMenu(!openMenu)}
                >
                  {link.title}
                </li>
              </Link>
            ))}
            <li className=" cursor-pointer hover:bg-gray-200">
              <button
                className="w-full text-left mx-4 my-2"
                onClick={() => {
                  userLogout(setlogoutStatus);
                  getUsername(setGetuserUsername, setusersUsername);
                  setOpenAvatarMenu(false);
                }}
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      ) : null}
    </nav>
  );
};

export default NavBar;
