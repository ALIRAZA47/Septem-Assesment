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
    if (user.length > 0) {
      // console.log("user exists", user[0]);
      // user already exists -> redirect to plans page
      setCurrentUser(user);
      const strUser = JSON.stringify(user[0]);

      Cookies.set("currentUser", strUser, { expires: 1 });

      navigateTo("/plans");
      return;
    } else {
      await createUserWithEmailAndPassword(
        auth,
        formValues.username + "@ark.com",
        formValues.password
      )
        .then((cred) => {
          // Sign in success
          //add user to firestore
          addUserToFirestore(formValues, setError);

          // redirect to plans page
          history.push("/plans");
          setCurrentUser(formValues);
          console.log(cred);
        })
        .catch((error) => {
          // Handle Errors here.
          var errorMessage = error.message;
          setError(errorMessage);
          // ...
        });
    }
  }
  function navigateTo(path) {
    history.push(path);
  }
  function signout() {
    auth.signOut();
    Cookies.remove("currentUser");
    setCurrentUser(null);
    history.push("/");
  }

  function getUser() {
    try {
      const user = JSON.parse(Cookies.get("currentUser"));
      return user;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
  function isUser() {
    if (getUser()) {
      return true;
    }
    return false;
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
