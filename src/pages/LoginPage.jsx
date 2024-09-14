import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
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
    <div className='flex flex-col items-center min-h-screen bg-gray-800 text-white p-4'>
      <h1 className='text-4xl font-bold mb-2'>LOGIN</h1>
      <form
        onSubmit={handleLogin}
        className='bg-gray-700 p-8 rounded-lg shadow-lg max-w-md w-full'
      >
        <div className='mb-6'>
          <label htmlFor='email' className='block text-lg font-semibold mb-2'>
            Email:
          </label>
          <input
            type='email'
            id='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='w-full p-3 rounded-md bg-gray-800 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400'
          />
          {errors.email && (
            <p className='text-red-500 text-sm mt-2'>{errors.email}</p>
          )}
        </div>

        <div className='mb-6'>
          <label
            htmlFor='password'
            className='block text-lg font-semibold mb-2'
          >
            Password:
          </label>
          <input
            type='password'
            id='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='w-full p-3 rounded-md bg-gray-800 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400'
          />
          {errors.password && (
            <p className='text-red-500 text-sm mt-2'>{errors.password}</p>
          )}
        </div>

        <button
          type='submit'
          className='text-xl w-full bg-yellow-400 text-gray-800 font-semibold py-2 rounded-md hover:bg-yellow-500 transition-colors'
        >
          Login
        </button>

        <p className='mt-6 text-center text-lg'>
          Don't have an account?{" "}
          <Link to='/signup' className='text-yellow-400 hover:underline'>
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
