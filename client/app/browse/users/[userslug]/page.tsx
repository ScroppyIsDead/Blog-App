"use client";
import { getProfileData } from "@/app/components/functions";
import React, { useEffect, useState } from "react";

const page = ({ params }: { params: { userslug: any } }) => {
  const [profileData, setprofileData] = useState({});
  const [getProfileStatus, setProfileStatus] = useState(0);

  const slug = params.userslug;

  useEffect(() => {
    getProfileData(slug, setprofileData, setProfileStatus);
  }, []);

  return (
    <div>
      {getProfileStatus === 2 ? (
        <div>
          <p>username: {profileData.username}</p>
          {profileData.bio.split("\n").map((line, index) => (
            <p key={index}>{line}</p>
          ))}

          <img src={profileData.avatar} />
        </div>
      ) : getProfileStatus === 1 ? (
        <p>didnt get profile</p>
      ) : null}
    </div>
  );
};

export default page;
