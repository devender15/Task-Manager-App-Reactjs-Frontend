import React, { useState } from "react";
import { TextField } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {

    localStorage.clear();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

  const loginHandler = () => {
    fetch(`${process.env.REACT_APP_API_URL}/user-auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        localStorage.setItem("user", JSON.stringify(data.token.access));
        navigate("/");
      });
  };

  return (
    <div className="flex flex-col justify-center items-center p-4">
      <h1 className="font-sans-serif text-3xl text-center py-4 font-bold">
        Login
      </h1>

      <div className="flex flex-col w-[85vw] h-[60vh] mt-12 rounded-md shadow-lg space-y-4 justify-center p-6 md:w-[30vw]">
        <TextField
          id="filled-basic"
          label="Email"
          type={email}
          variant="filled"
          required
          value={email}          
          onChange={(e) => setEmail(e.target.value)}
        />

        <TextField
          id="filled-basic"
          type="password"
          label="Password"
          variant="filled"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          className="bg-blue-600 p-2 rounded-lg border-none text-white font-bold hover:bg-blue-700 hover:transition-all hover:cursor-pointer"
          onClick={loginHandler}
          disabled={email.length === 0 || password.length === 0}
        >
          Login
        </button>

        <div className="h-[20vh]">
          <p className="mt-10 font-bold text-xl">
            Not have an account?
            <Link className="text-blue-500 underline" to="/register">
              {" "}
              Register
            </Link>{" "}
            here !{" "}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
