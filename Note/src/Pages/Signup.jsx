import React from "react";
import { auth } from "../firebase";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";

const Signup = () => {
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

  const signUp = async (e) => {
    e.preventDefault();
    try {
      const userCred = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      alert("Your account has been created successfully");
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
      console.error(error);
    }
  };

  return (
    <div className="grid gap-5 p-14 justify-center">
      <h1 className="text-center p-4 text-3xl bg-blue-100 font-semibold text-slate-400 shadow-xl">WELCOME TO MY NOTE'S WEBSITE</h1>
      <form
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        onSubmit={signUp}
      >
        <h1 className="text-4xl font-bold text-slate-600 text-center mb-6">
          Create an Account
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
            name="password"
            id="password"
            placeholder="Enter your Password"
            value={password}
            onChange={handleChange}
          />
        </div>

        <div className="flex items-center justify-between">
          <button
            onClick={signUp}
            type="button"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Submit
          </button>
        </div>

        <div className="flex">
          <p>Already have an account?</p>
          <button type="button" className=" text-blue-900">
            <Link to="/signin">Sign In</Link>
          </button>
        </div>
      </form>
    </div>
  );
};

export default Signup;
