import {
  ALL_ARTICLES,
  ARTICLE_FROM_SLUG,
  CREATE_ARTICLE,
  CSRFTOKEN,
  GET_OWN_ARTICLES,
  GET_USER_EMAIL,
  GET_USER_INFO,
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
    setArticles(result);
  } catch (error) {
    console.error("Error fetching data:", error);
    setGetArticles(1);
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

export const getArticleFromSlug = async (setpageArticle: any, slug: any) => {
  try {
    const sluggedURLRequest = ARTICLE_FROM_SLUG + slug;
    const response = await fetch(sluggedURLRequest, { method: "GET" });
    if (!response.ok) {
      console.log(response.body);
      throw new Error("couldnt get blogs");
    }

    const result = await response.json();
    setpageArticle(result);
  } catch (err) {
    console.log(err);
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
