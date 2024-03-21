import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Signup() {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    location: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:8080/api/createuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: credentials.name,
        email: credentials.email,
        password: credentials.password,
        location: credentials.location,
      }),
    });
    const json = await response.json();
    console.log(json);
    if (!json.success) {
      alert("Enter valid credentials");
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
            <label for="Name" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              onChange={onChange}
              name="name"
              value={credentials.name}
            />
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
          <label for="Location" className="form-label">
            Location
          </label>
          <input
            type="text"
            className="form-control"
            onChange={onChange}
            name="location"
            value={credentials.location}
          />
          <button type="submit" className="btn btn-primary  m-3">
            SignUp
          </button>
          <Link to="/login" className="btn btn-primary  m-3">
            Already a user?
          </Link>
        </form>
      </div>
    </>
  );
}
