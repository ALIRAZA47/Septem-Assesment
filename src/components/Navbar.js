import React from "react";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../App.css";
import { BrowserRouter as Link } from "react-router-dom";
import { useAuth } from "../AuthContext";
import { Button } from "@mui/material";

export default function Navbar() {
  const { signout, isUser } = useAuth();
  const logoutBtnVisibility = isUser() ? "visible" : "hidden";

  const logoutNow = () => {
    console.log("logout");
    signout();
    window.location.reload();
  };
  return (
    <nav
      style={{
        margin: 10,
        borderRadius: 4,
        backgroundColor: "#1C8EF9",
        // marginBottom: 20,
      }}
      className="navbar navbar-expand-lg navbar-light fixed-top"
    >
      <div className="container justify-content-space-between text-white font-arial">
        <Link className="navbar-brand text-white" to={"/"}>
          <b>ARK Web Hosting</b>
        </Link>
        <Button
          id="logout-main"
          variant="contained"
          sx={{
            visibility: logoutBtnVisibility,
            backgroundColor: "white",
            color: "#1C8EF9",
            fontWeight: "bold",
            ":hover": {
              backgroundColor: "white",
              color: "#1C8EF9",
            },
          }}
          onClick={() => {
            logoutNow();
          }}
        >
          Logout
        </Button>
      </div>
    </nav>
  );
}
