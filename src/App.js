import React from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter as Link } from "react-router-dom";

import { AuthProvider } from "./AuthContext";

import { Routes } from "./constants/routes";

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <nav
          style={{
            margin: 10,
            borderRadius: 4,
            backgroundColor: "#1C8EF9",
            // marginBottom: 20,
          }}
          className="navbar navbar-expand-lg navbar-light fixed-top"
        >
          <div className="container justify-content-center text-white font-arial">
            <Link className="navbar-brand text-white" to={"/"}>
              <b>ARK Web Hosting</b>
            </Link>
          </div>
        </nav>

        <div
          className=" d-flex justify-content-center text-center "
          style={{
            backgroundColor: "#abcfe4",
            marginTop: "15%",
            marginBottom: "5%",
            height: "80%s",
          }}
        >
          <Routes />
        </div>
      </div>
    </AuthProvider>
  );
}

export default App;
