"use client";
import Link from "next/link";
import React, { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import navLinks from "./navLinks";

const NavBar = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const [logoutStatus, setlogoutStatus] = useState(0);

  const userLogout = async () => {
    try {
      const response = await fetch("http://localhost:8000/user/logout", {
        method: "GET",
        credentials: "include",
      });
      if (!response.body) {
        setlogoutStatus(1);
        throw new Error("coulnt access logout ig");
      }
      if (!response.ok) {
        setlogoutStatus(1);
        console.log("error logging logged out");
      }
      if (response.ok) {
        setlogoutStatus(2);
      }
    } catch (err) {
      setlogoutStatus(1);
      console.error(err, "hey error logging out");
    }
  };

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
        <div className="fixed  flex flex-col top-0 bg-slate-100 shadow-md left-0 h-full w-2/3">
          <div className="flex flex-row justify-between p-4 items-center">
            <p className="text-xl">DropDown</p>
            <button className="text-xl" onClick={() => setOpenMenu(!openMenu)}>
              X
            </button>
          </div>
          <ul className="p-4">
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
              <a className="p-4 cursor-pointer" onClick={userLogout}>
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
