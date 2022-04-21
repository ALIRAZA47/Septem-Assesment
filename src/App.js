import React from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter as Link } from "react-router-dom";

import { AuthProvider } from "./AuthContext";
import { Routes } from "./routes";
import Navbar from "./components/Navbar";

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <Navbar />
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
