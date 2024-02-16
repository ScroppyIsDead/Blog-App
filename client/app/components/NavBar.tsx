import React from "react";

const NavBar = () => {
  return (
    <div className="flex flex-row justify-around w-full h-[10vh]">
      <a className="text-blue-500 self-center underline" href="/register">
        register
      </a>
      <a className="text-blue-500 self-center underline" href="/login">
        login
      </a>
      <a className="text-blue-500 self-center underline" href="/">
        Home
      </a>
      <a className="text-blue-500 self-center underline" href="/createblog">
        Make your own blog
      </a>
    </div>
  );
};

export default NavBar;
