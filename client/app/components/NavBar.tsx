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
    <nav className="shadow-xl z-10 fixed w-full bg-white h-24">
      <div className="flex justify-between items-center h-full px-4 2xl:px-16">
        <div className="md:p-4">
          <Link href="/">Your Logo</Link>
        </div>
        <button
          className="m-2 md:hidden"
          onClick={() => setOpenMenu(!openMenu)}
        >
          <RxHamburgerMenu className="text-2xl" />
        </button>
        <div className="flex-row hidden md:flex">
          <ul className="p-4 flex flex-row">
            {navLinks.map((link, index) => (
              <li className="p-4" key={index}>
                <Link href={link.href}>{link.title}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {openMenu ? (
        <div className="fixed flex flex-col top-0 bg-slate-100 shadow-md left-0 h-full w-2/3">
          <div className="flex flex-row justify-between p-4 items-center">
            <p className="text-xl">DropDown</p>
            <button className="text-xl" onClick={() => setOpenMenu(!openMenu)}>
              X
            </button>
          </div>
          {getusernameStatus === 2 ? (
            <p className="px-8">Hello {username}</p>
          ) : null}
          <ul className="p-2">
            {navLinks.map((link, index) => (
              <li
                onClick={() => setOpenMenu(!openMenu)}
                className="p-2"
                key={index}
              >
                <Link className="p-4" href={link.href}>
                  {link.title}
                </Link>
              </li>
            ))}
            <li className="p-2">
              <a
                className="p-4 cursor-pointer"
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
