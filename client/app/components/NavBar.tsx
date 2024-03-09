"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import navLinks from "./navLinks";
import { getUsername, userLogout } from "./functions";

const NavBar = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const [logoutStatus, setlogoutStatus] = useState(0);
  const [getusernameStatus, setGetuserUsername] = useState(0);
  const [username, setusersUsername] = useState("");

  useEffect(() => {
    getUsername(setGetuserUsername, setusersUsername);
  }, []);

  return (
    <nav className="shadow-xl z-10 fixed w-full bg-gray-100 h-24">
      <div className="flex justify-between items-center h-full px-4 2xl:px-16">
        <div className="md:p-4">
          <a
            href="/"
            className="text-2xl font-bold hover:bg-gray-300 rounded-xl p-2"
          >
            Your Logo
          </a>
        </div>
        <button
          className="m-2 md:hidden hover:bg-gray-300 p-2 rounded-full"
          onClick={() => setOpenMenu(!openMenu)}
        >
          <RxHamburgerMenu className="text-2xl" />
        </button>
        <div className="hidden md:flex">
          <ul className="flex flex-row">
            {navLinks.map((link, index) => (
              <Link href={link.href}>
                <li
                  key={index}
                  className="px-4 py-2 text-gray-600 rounded-full hover:bg-gray-200 hover:text-gray-800"
                >
                  {link.title}
                </li>
              </Link>
            ))}
          </ul>
        </div>
      </div>
      {openMenu ? (
        <div className="fixed flex flex-col top-0 bg-white shadow-md left-0 h-full w-2/3 p-4">
          <div className="flex justify-between items-center mb-2">
            <p className="text-xl font-bold">Menu</p>
            <button
              className="text-xl font-bold"
              onClick={() => setOpenMenu(!openMenu)}
            >
              X
            </button>
          </div>

          <ul>
            {navLinks.map((link, index) => (
              <Link href={link.href}>
                <li
                  key={index}
                  className="px-4 py-2 hover:bg-gray-200"
                  onClick={() => setOpenMenu(!openMenu)}
                >
                  {link.title}{" "}
                </li>
              </Link>
            ))}
            <li className="px-4 py-2 hover:bg-gray-200">
              <a
                className="inline-block"
                onClick={() => {
                  userLogout(setlogoutStatus);
                  getUsername(setGetuserUsername, setusersUsername);
                }}
              >
                Logout
              </a>
            </li>
          </ul>
        </div>
      ) : null}
    </nav>
  );
};

export default NavBar;
