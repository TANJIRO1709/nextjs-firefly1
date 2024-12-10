"use client";
import React from "react";
import UserContext from "./userContext";
import { useState } from "react";
import { useRouter } from 'next/navigation'
import {
  auth,
  GoogleAuthProvider,
  signInWithPopup,
} from "../util/firebase-config";

function UserState({children}) {
  const router = useRouter();
  const host = process.env.NEXT_PUBLIC_HOST;
  const [user, setUser] = useState(null); // Initialize as null
  const [likedProducts, setLikedProducts] = useState([]);
  const [userModels, setUserModels] = useState([]);
  const [alert, setAlert] = useState(null);

  const getUserData = async () => {
    try {
      const response = await fetch(`${host}/user`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }

      const data = await response.json();

      if (!data.success) {
        showAlert("You are not logged in", "info");
        return;
      }

      //console.log("Fetched user data:", data.user);

      // Update state with fetched data
      setUser({
        userName: data.user.userName,
        email: data.user.email,
      });

      setLikedProducts(data.user.likedProducts || []);
      setUserModels(data.user.models || []);

      showAlert("User data fetched successfully", "success");
    } catch (error) {
      console.error("Error fetching user data:", error);
      showAlert("An error occurred while fetching user data", "error");
    }
  };
  
  const login = async (values) => {
    const url = `${host}/login`;
    const response = await fetch(url, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });
    const data = await response.json();
    console.log("data post login=> ", data);
    if (data.success) {
      getUserData();
      //props.showAlert("LoggedIn successfully", "success");
      router.push("/");
    } else {
      showAlert("Failed to LogIn", "danger");
    }
  };

  const signup = async (values) => {
    const url = `${host}/signin`;
    const response = await fetch(url, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });
    const data = await response.json();
    if (data.success) {
      getUserData();
      //props.showAlert("LoggedIn successfully", "success");
      router.push("/");
    } else {
      showAlert("Failed to SignUp", "danger");
    }
  };

  const googleSignin = async () => {
    //console.log("Google Login");
    const provider = new GoogleAuthProvider();
    //console.log("provider = ", provider);
    signInWithPopup(auth, provider).then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const user = result.user;
      // console.log("User = ", user);
      // console.log("HOST = ", host);

      fetch(`${host}/googlesignin`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: user.displayName,
          email: user.email,
          password: user.uid,
        }),
      }).then((response) => {
        //console.log("response => ", response);
        if (response.ok) {
          getUserData();
          showAlert("LoggedIn successfully", "success");
          router.push("/");
        } else {
          showAlert("Failed to SignUp", "danger");
        }
      });
    });
  };

  const logout = async () => {
    console.log("Logout");
    const url = `${host}/logout`;
    const response = await fetch(url, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    if (data.success) {
      setUser(null);
      showAlert("Logged out Successfully", "info");
    }
  };

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 4000);
  };
  const closeAlert = () => {
    setAlert(null);
  };

  const likeProduct = async (productId, like) => {
    try {
      const response = fetch(host + "/likeproduct", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId, like }),
      });
      const data = (await response).json();
      if (data) {
        if (like) {
          setLikedProducts([...likedProducts, productId]);
        } else {
          setLikedProducts(likedProducts.filter((item) => item !== productId));
        }
      } else {
        showAlert("Failed to Liked", "danger");
      }
    } catch (err) {
      showAlert("Failed to like Product", "danger");
      console.log("Error occured in likeProduct", err);
    }
  };

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        login,
        signup,
        logout,
        googleSignin,
        getUserData,
        likeProduct,
        likedProducts,
        userModels,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export default UserState;
