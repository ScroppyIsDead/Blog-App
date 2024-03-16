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
      hiiii
      {getProfileStatus === 2 ? (
        <div>
          <p>bio: {profileData.bio}</p>
          <p>username: {profileData.username}</p>
          <img src={profileData.avatar} />
        </div>
      ) : getProfileStatus === 1 ? (
        <p>didnt get profile</p>
      ) : null}
    </div>
  );
};

export default page;
