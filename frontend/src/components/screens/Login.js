import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";


export default function Login() {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:8080/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const json = await response.json();
    // console.log(json.status());
    if(json.success) {
      localStorage.setItem("userEmail",credentials.email);
      localStorage.setItem("authToken",json.authToken);
      console.log(localStorage.getItem("authToken"));
      navigate("/");
    } else {
      console.log("Invalid credentials");
    }
  };
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  return (
    <>
      <div className="container w-50 mt-5">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            
            <label for="Email" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              onChange={onChange}
              name="email"
              value={credentials.email}
            />
            <div id="emailHelp" className="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>
          <div className="mb-3">
            <label for="Password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              onChange={onChange}
              name="password"
              value={credentials.password}
            />
          </div>
          
          <button type="submit" className="btn btn-primary  m-3">
            LogIn
          </button>
          <Link to="/createuser" className="btn btn-primary  m-3">
            I'm a new user
          </Link>
        </form>
      </div>
    </>
  );
}
