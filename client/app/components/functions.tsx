import { error } from "console";
import {
  ALL_ARTICLES,
  ARTICLE_FROM_SLUG,
  CHANGE_BIO,
  CREATE_ARTICLE,
  CSRFTOKEN,
  GET_ALL_USERS,
  GET_OWN_ARTICLES,
  GET_OWN_AVATAR,
  GET_PROFILE_INFO,
  GET_USER_EMAIL,
  GET_USER_INFO,
  RANDOM_ARTICLE,
  USER_LOGIN,
  USER_LOGOUT,
} from "./urls";

export const userLogout = async (setlogoutStatus: any) => {
  try {
    const response = await fetch(USER_LOGOUT, {
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

export const getUsername = async (
  setGetuserUsername: any,
  setusersUsername: any
) => {
  try {
    const response = await fetch(GET_USER_INFO, {
      method: "GET",
      credentials: "include",
    });
    if (!response.body) {
      setGetuserUsername(1);
      throw new Error("Error getting user's data");
    }
    if (response.ok) {
      const data = await response.json();
      setGetuserUsername(2);
      setusersUsername(data.message);
      return "hi";
    }
    setGetuserUsername(1);
  } catch (err) {
    console.log(err, "unable to get user information");
    setGetuserUsername(1);
  }
};

export const getUserArticles = async (
  setGetArticles: any,
  setArticles: any
) => {
  try {
    const response = await fetch(GET_OWN_ARTICLES, {
      method: "GET",
      credentials: "include",
    });
    if (!response.body) {
      setGetArticles(1);
      throw new Error("coulnt access to bloggg ig");
    }
    const result = await response.json();
    setGetArticles(2);
    console.log(result);
    setArticles(result);
  } catch (error) {
    console.error("Error fetching data:", error);
    setGetArticles(1);
  }
};

export const getRandomBlog = async (
  setRandomblog: React.Dispatch<React.SetStateAction<{}>>,
  setRandomStatus: React.Dispatch<React.SetStateAction<number>>
) => {
  try {
    const response = await fetch(RANDOM_ARTICLE, {
      method: "GET",
      credentials: "include",
    });
    if (!response.body) {
      setRandomStatus(1);
      console.log("error getting random blog", response);
      throw new Error("couldnt get random blog");
    }
    console.log("correctly got blog", response.body);
    const result = await response.json();
    setRandomStatus(2);
    setRandomblog(result);
  } catch (err) {
    setRandomStatus(1);
    console.log(err);
  }
};

export const handleCreateBlog = async (
  title: any,
  content: any,
  setBlogMade: any,
  setGetArticles: any,
  setArticles: any,
  setCreateBlogGUI: any
) => {
  try {
    const data = {
      title: title,
      content: content,
    };
    const response = await fetch(CREATE_ARTICLE, {
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(data),
      method: "POST",
    });
    if (!response.ok) {
      console.error("Error logging increating blog");
      setBlogMade(1);
    }
    if (response.ok) {
      console.log("blog made successfully");
      setBlogMade(2);
      getUserArticles(setGetArticles, setArticles);
      setCreateBlogGUI(false);
    }
  } catch (err) {
    console.error("problem creating blog", err);
    setBlogMade(1);
  }
};

export const getAllArticles = async (setArticles: any) => {
  try {
    const response = await fetch(ALL_ARTICLES, { method: "GET" });
    if (!response.ok) {
      throw new Error("couldnt get blogs");
    }

    const result = await response.json();
    setArticles(result);
  } catch (err) {
    console.log(err);
  }
};

export const getArticleFromSlug = async (
  setpageArticle: any,
  slug: any,
  setArticleStatus: any
) => {
  try {
    const sluggedURLRequest = ARTICLE_FROM_SLUG + slug;
    const response = await fetch(sluggedURLRequest, { method: "GET" });
    if (!response.ok) {
      console.log(response.body);
      setArticleStatus(1);
      throw new Error("couldnt get blogs");
    }

    const result = await response.json();
    setpageArticle(result);
    setArticleStatus(2);
  } catch (err) {
    setArticleStatus(1);
    console.log(err);
  }
};

export const getOwnAvatar = async (
  setAvatarData: React.Dispatch<React.SetStateAction<{}>>,
  setGetAvatarStatus: React.Dispatch<React.SetStateAction<number>>
) => {
  try {
    const response = await fetch(GET_OWN_AVATAR, {
      method: "GET",
      credentials: "include",
    });
    if (!response.body) {
      console.log("error getting response getting profile data");
      setGetAvatarStatus(1);
    }
    const result = await response.json();
    setAvatarData(result);
    setGetAvatarStatus(2);
  } catch (err) {
    console.log("error getting profile data", err);
    setGetAvatarStatus(1);
  }
};

export const getProfileData = async (
  slug: string,
  setprofileData: React.Dispatch<React.SetStateAction<{}>>,
  setProfileStatus: React.Dispatch<React.SetStateAction<number>>
) => {
  try {
    const sluggedURL = GET_PROFILE_INFO + "/" + slug;
    const response = await fetch(sluggedURL, { method: "GET" });
    if (!response.body) {
      console.log("error getting response getting profile data");
      setProfileStatus(1);
    }
    const result = await response.json();
    setprofileData(result);
    setProfileStatus(2);
  } catch (err) {
    console.log("error getting profile data", err);
    setProfileStatus(1);
  }
};

export const changeBio = async (event: any) => {
  try {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const data = { bio: formData.get("bio") };
    const response = await fetch(CHANGE_BIO, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      credentials: "include",
    });
    if (!response.ok) {
      console.log(response);
      throw new Error("changing bio failed");
    }
    const responseData = await response.json();
    console.log("changed bio", responseData);
  } catch (err) {
    console.log("error changing bio", err);
  }
};

export const loginUser = async (event: any, setLoginStatus: any) => {
  event.preventDefault();

  const formData = new FormData(event.target as HTMLFormElement);

  const getCsrfToken = async () => {
    const response = await fetch(CSRFTOKEN, {
      method: "GET",
      credentials: "include",
    });
    if (!response.ok) {
      setLoginStatus(1);
      throw new Error("failed retriving the csrf token");
    }
    const data = await response.json();
    return data.csfrToken;
  };

  const submit = {
    username: formData.get("username"),
    password: formData.get("password"),
  };

  const csfrToken = await getCsrfToken();

  try {
    const response = await fetch(USER_LOGIN, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": csfrToken,
      },
      body: JSON.stringify(submit),
      credentials: "include",
    });

    if (!response.ok) {
      setLoginStatus(1);
      throw new Error("login failed");
    }

    const responseData = await response.json();
    setLoginStatus(2);
    console.log("login successful:", responseData);
  } catch (err) {
    setLoginStatus(1);
    console.error("Error during login:");
  }
};

export const getEmail = async (
  setGetUserEmailStatus: any,
  setUsersEmail: any
) => {
  try {
    const response = await fetch(GET_USER_EMAIL, {
      method: "GET",
      credentials: "include",
    });
    if (!response.body) {
      setGetUserEmailStatus(1);
      throw new Error("Error getting user's data");
    }
    if (response.ok) {
      const data = await response.json();
      setGetUserEmailStatus(2);
      setUsersEmail(data.message);
      return "hi";
    }
    setGetUserEmailStatus(1);
  } catch (err) {
    console.log(err, "unable to get user's email information");
    setGetUserEmailStatus(1);
  }
};

export const getAllUsers = async (
  setUsersArray: React.Dispatch<React.SetStateAction<never[]>>,
  setUserArrayStatus: React.Dispatch<React.SetStateAction<number>>
) => {
  try {
    const response = await fetch(GET_ALL_USERS, {
      method: "GET",
      credentials: "include",
    });
    if (!response.body) {
      console.log("error getting users");
      setUserArrayStatus(1);
      return "";
    }

    const result = await response.json();
    setUsersArray(result);
    setUserArrayStatus(2);
  } catch (err) {
    console.log("error getting all users", err);
    setUserArrayStatus(1);
  }
};

export const cutoffText = (content, maxLength) => {
  if (content && content.length > maxLength) {
    return content.substring(0, maxLength) + "...";
  } else {
    return content;
  }
};
