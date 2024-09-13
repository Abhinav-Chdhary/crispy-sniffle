import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import "./LoginPage.css";
const apiUrl = import.meta.env.VITE_API_URL;

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { login } = useAuth();
  const navigate = useNavigate();

  // Helper function to validate email
  const isValidEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!email) {
      newErrors.email = "Email is required.";
    } else if (!isValidEmail(email)) {
      newErrors.email = "Invalid email format.";
    }

    if (!password) {
      newErrors.password = "Password is required.";
    } else if (password.length < 5) {
      newErrors.password = "Password must be at least 5 characters long.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const checkTokenAndLogin = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        // Verify token with the server
        const response = await fetch(`${apiUrl}/api/validateToken`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        if (data && data.success) {
          login({ username: data.username, highScore: data.highScore });
          navigate("/game");
        } else {
          console.error("Token validation failed");
        }
      } catch (error) {
        console.error("Token validation error:", error);
      }
    }
  };

  useEffect(() => {
    checkTokenAndLogin();
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    // Perform validation before submitting the form
    if (!validateForm()) {
      return;
    }

    try {
      const response = await fetch(`${apiUrl}/api/userLogin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (data && data.success) {
        const { _, token, username, highScore } = data;
        localStorage.setItem("token", token);

        login({ username, highScore });
        navigate("/game");
      } else {
        alert("Invalid Credentials");
        console.error("Login failed: Invalid credentials");
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <>
      <h1>LOGIN</h1>
      <form onSubmit={handleLogin}>
        <label>
          Email:
          <input
            type='email'
            id='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
        </label>
        <label>
          Password:
          <input
            type='password'
            id='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && <p style={{ color: "red" }}>{errors.password}</p>}
        </label>
        <button type='submit'>Login</button>
        <p>
          Don't have an account? <Link to={"/signup"}>Sign Up</Link>
        </p>
      </form>
    </>
  );
};

export default LoginPage;
