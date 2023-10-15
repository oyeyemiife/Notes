import React from "react";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";

const Signin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const signIn = async (e) => {
    e.preventDefault();
    try {
      const userCred = await signInWithEmailAndPassword(auth, email, password);
      console.log("done");

      localStorage.setItem(
        "user",
        JSON.stringify({
          email: userCred.user.email,
          uid: userCred.user.uid,
        })
      );

      navigate("/notes");
    } catch (error) {
      alert("Check email and password");
      console.error(error);
    }
  };

  return (
    <div className="flex p-14 justify-center">
      <form
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        onSubmit={signIn}
      >
        <h1 className="text-4xl font-bold text-slate-600 text-center mb-6">
          Sign-In
        </h1>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>

          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="email"
            name="email"
            id="email"
            placeholder="Enter your Email"
            value={email}
            onChange={handleChange}
          />
        </div>

        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>

          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="password"
            id="password"
            name="password"
            placeholder="Enter your Password"
            value={password}
            onChange={handleChange}
          />
        </div>

        <div className="flex items-center justify-between">
          <button
            onClick={signIn}
            type="button"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Login
          </button>
        </div>

        <div className="flex">
          <p>Don't have an account?</p>
          <button type="button" className=" text-blue-900">
            <Link to="/signup">Sign Up</Link>
          </button>
        </div>
      </form>
    </div>
  );
};

export default Signin;
