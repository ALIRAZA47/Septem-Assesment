import React, { useState, useContext } from "react";
import { auth, getUserFromFirestore, addUserToFirestore } from "./firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useHistory } from "react-router-dom";
import Cookies from "js-cookie";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const history = useHistory();

  // create signup func
  async function signup(formValues, setError) {
    console.log(formValues.username);
    const user = [];
    user.push(await getUserFromFirestore(formValues.username));
    console.log("user", user);
    if (user[0] !== null) {
      // console.log("user exists", user[0]);
      // user already exists -> redirect to plans page
      setCurrentUser(user);
      const strUser = JSON.stringify(user[0]);

      Cookies.set("currentUser", strUser, { expires: 1 });

      window.location.reload();
      return;
    } else {
      console.log("user does not exist");
      const signupRes = await createUserWithEmailAndPassword(
        auth,
        formValues.username + "@ark.com",
        formValues.password
      );
      console.log("signupRes", signupRes);
      if (signupRes.user) {
        // Sign in success;
        //add user to firestore
        await addUserToFirestore(formValues, setError);
        // redirect to plans page
        setCurrentUser(formValues);
        Cookies.set("currentUser", JSON.stringify(formValues), { expires: 1 });
        window.location.reload();
      } else {
        // Handle Errors here.
        // var errorMessage = error.message;
        setError("Error Signing Up: ");
      }
    }
  }
  function navigateTo(path) {
    history.push(path);
  }
  function signout() {
    auth.signOut();
    Cookies.remove("currentUser");
    setCurrentUser(null);
    window.location.reload();
  }

  function getUser() {
    try {
      const savedUser = Cookies.get("currentUser");
      if (savedUser) {
        const user = JSON.parse(savedUser);
        return user;
      } else {
        return null;
      }
    } catch (error) {
      console.log(error);
      return null;
    }
  }
  function isUser() {
    try {
      if (getUser() !== null) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  }

  // set return values
  const value = {
    currentUser,
    navigateTo,
    signup,
    signout,
    getUser,
    isUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
