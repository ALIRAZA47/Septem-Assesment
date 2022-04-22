import React, { useReducer, useState } from "react";
import { TextField, Alert, Card } from "@mui/material";
import { useAuth } from "../AuthContext";

export default function Login(props) {
  const { isUser, navigateTo } = useAuth();
  if (isUser()) {
    navigateTo("/dashboard");
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
  const { login } = useAuth();
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

    if (formValues.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    } else {
      try {
        setError(null);
        setLoading(true);
        await login(formValues, setError);
        // console.log(res);
      } catch (error) {
        console.log(error);
        setError("Login Failed");
      }
      // remove loading
      setLoading(false);
    }
  }

  return (
    <Card sx={{ maxWidth: "80%", padding: 4 }}>
      <form onSubmit={handleFormSubmit} action="/plans">
        <h3 style={{ marginBottom: "30px" }}>Login</h3>
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
          label="Password"
          variant="outlined"
          type="password"
          name="password"
          onChange={handleFormChange}
          required
        />

        <button
          style={{
            marginTop: "30px",
          }}
          disabled={loading}
          type="submit"
          className="button btn btn-primary btn-lg btn-block"
        >
          Login
        </button>
        <p className="mt-4">
          Don't hava an account? <a href="/signup">Create account</a>
        </p>
      </form>
    </Card>
  );
}
