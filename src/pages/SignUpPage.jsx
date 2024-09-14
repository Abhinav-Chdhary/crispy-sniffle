import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const apiUrl = import.meta.env.VITE_API_URL;

export default function SignUpPage() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
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

    if (!username) {
      newErrors.username = "Username is required.";
    } else if (username.length < 3) {
      newErrors.username = "Username must be at least 3 characters long.";
    }

    if (!password) {
      newErrors.password = "Password is required.";
    } else if (password.length < 5) {
      newErrors.password = "Password must be at least 5 characters long.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    // Perform validation before submitting the form
    if (!validateForm()) {
      return;
    }

    try {
      const response = await fetch(`${apiUrl}/api/addNewUser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, username, password }),
      });

      const data = await response.json();
      if (data.success) {
        console.log("Sign up successful");
        navigate("/");
      } else {
        if (data.message === "duplicate key error") {
          alert("Use a different username/email Id");
        }
        console.error("Sign Up failed");
      }
    } catch (error) {
      console.error("Error occurred:", error);
    }
  };

  return (
    <div className='flex flex-col items-center min-h-screen bg-gray-800 text-white p-4'>
      <h1 className='text-4xl font-bold mb-4'>SIGN UP</h1>
      <form
        onSubmit={handleSignUp}
        className='bg-gray-700 p-8 rounded-lg shadow-lg max-w-md w-full'
      >
        <div className='mb-3'>
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

        <div className='mb-3'>
          <label
            htmlFor='username'
            className='block text-lg font-semibold mb-2'
          >
            Username:
          </label>
          <input
            type='text'
            id='username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className='w-full p-3 rounded-md bg-gray-800 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400'
          />
          {errors.username && (
            <p className='text-red-500 text-sm mt-2'>{errors.username}</p>
          )}
        </div>

        <div className='mb-3'>
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
          className='w-full bg-yellow-400 text-gray-800 font-semibold py-2 rounded-md hover:bg-yellow-500 transition-colors text-lg'
        >
          Submit
        </button>
      </form>
    </div>
  );
}
