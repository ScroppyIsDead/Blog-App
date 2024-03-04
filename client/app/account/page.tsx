import React from "react";

const page = () => {
  return (
    <div className="flex flex-col justify-center ">
      <div className="w-full p-2 h-fit flex flex-col">
        <p className="text-xl">Account settings</p>
        <div className="flex flex-row justify-between">
          <ul>
            <li>
              <p>Username: example</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default page;
