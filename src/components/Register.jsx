import React, { useState } from 'react';
import { TextField } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";


const Register = () => {

    const [email, setEmail] = useState("");
    const [fname, setFname] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState(0);

    const navigate = useNavigate();

    const registerHandler = () => {

        if(email.length !== 0 || fname.length !== 0 || password.length !== 0 || phone.length !== 0) {
            fetch(`${process.env.REACT_APP_API_URL}/user-auth/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email,
                    fname,
                    phone,
                    password,
                })
            })
            .then(res => res.json())
            .then(data => {
                localStorage.setItem("user", JSON.stringify(data.token.access));
                navigate("/");
            })
        } else {
            console.log("Please enter all the details");
        }
    }

  return (
    <div className='flex flex-col justify-center items-center p-4'>

        <h1 className="font-sans-serif text-3xl text-center py-4 font-bold">Create your account</h1>

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
          label="Full Name"
          type="text"
          variant="filled"
          required
          value={fname}
          onChange={(e) => setFname(e.target.value)}
        />

        <TextField
          id="filled-basic"
          label="Phone"
          type="phone"
          variant="filled"
          required
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
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
          onClick={registerHandler}
          disabled={email.length === 0 || password.length === 0}
        >
          Register
        </button>

        <div className="h-[20vh]">
          <p className="mt-10 font-bold text-xl">
            Have an account?
            <Link className="text-blue-600 underline" to="/login">
              {" "}
              Login
            </Link>{" "}
            here !{" "}
          </p>
        </div>
      </div>



    </div>
  )
}

export default Register