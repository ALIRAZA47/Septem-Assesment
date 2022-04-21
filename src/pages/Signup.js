import React, { useReducer, useState } from "react";
import { TextField, Alert, Card } from "@mui/material";
import { useAuth } from "../AuthContext";
import { useHistory } from "react-router-dom";

export default function Signup(props) {
  const { currentUser } = useAuth();
  const history = useHistory;

  // redirect if user is already logged in
  if (currentUser) {
    history("/plans");
  } else {
    // Cookies.set("currentUser", JSON.stringify(user), { expires: 1 });
    // console.log(Cookies.get("currentUser"));
    // console.log(JSON.parse(Cookies.get("currentUser")));
  }
  const [formValues, setFormValues] = useReducer(
    (prevState, newState) => ({ ...prevState, ...newState }),
    {
      email: "",
      password: "",
      confirmPassword: "",
      firstName: "",
      lastName: "",
      phoneNumber: "",
      companyName: "",
    }
  );

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();
  // handle change function
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    // console.log(name, value);
    setFormValues({
      [name]: value,
    });
  };

  // handle submit function
  async function handleFormSubmit(e) {
    e.preventDefault();

    if (formValues.password !== formValues.confirmPassword) {
      setError(null);
      setError("Passwords do not match");
      return;
    } else {
      if (formValues.password.length < 6) {
        setError("Password must be at least 6 characters");
        return;
      } else {
        try {
          setError(null);
          setLoading(true);
          await signup(formValues, setError);
          // console.log(res);
        } catch (error) {
          console.log(error);
          setError("Signup Failed");
        }
        // remove loading
        setLoading(false);
      }
    }
  }

  return (
    <Card sx={{ maxWidth: "80%", padding: 4 }}>
      <form onSubmit={handleFormSubmit} action="/plans">
        <h3 style={{ marginBottom: "30px" }}>Signup</h3>
        {error && (
          <Alert
            style={{ marginBottom: 16 }}
            severity="error"
            onClose={() => {
              setError(null);
            }}
          >
            {error}
          </Alert>
        )}
        <TextField
          className="form-control form-control-lg"
          label="Username"
          variant="outlined"
          type="text"
          name="username"
          onChange={handleFormChange}
          required
        />
        <TextField
          className="mt-4 form-control form-control-lg"
          label="Email"
          variant="outlined"
          type="email"
          name="email"
          onChange={handleFormChange}
        />
        <TextField
          className="mt-4 form-control form-control-lg"
          label="Password"
          variant="outlined"
          type="password"
          name="password"
          onChange={handleFormChange}
          required
        />

        <TextField
          className="mt-4 form-control form-control-lg"
          label="Confirm Password"
          variant="outlined"
          type="password"
          name="confirmPassword"
          onChange={handleFormChange}
          required
        />

        <TextField
          className="mt-4 form-control form-control-lg"
          label="First Name"
          variant="outlined"
          type="text"
          name="firstName"
          onChange={handleFormChange}
          required
        />
        <TextField
          className="mt-4 form-control form-control-lg"
          label="Last Name"
          variant="outlined"
          type="text"
          name="lastName"
          onChange={handleFormChange}
        />
        <TextField
          className="mt-4 form-control form-control-lg"
          label="Phone Number (+92 3xx-xxxxxxx)"
          variant="outlined"
          type="text"
          name="phoneNumber"
          onChange={handleFormChange}
        />
        <TextField
          className="mt-4 mb-4 form-control form-control-lg"
          label="Company Name"
          variant="outlined"
          type="text"
          name="companyName"
          onChange={handleFormChange}
        />

        <button
          disabled={loading}
          type="submit"
          className="button btn btn-primary btn-lg btn-block"
        >
          Sign Up
        </button>
      </form>
    </Card>
  );
}
