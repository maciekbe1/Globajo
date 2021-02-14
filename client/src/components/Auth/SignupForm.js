import React, { useState } from "react";
import * as UserService from "services/userService";

export default function Signup() {
  const [values, setValues] = useState({
    email: "",
    password: "",
    name: ""
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("");
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };
  const signUpHandler = (e) => {
    e.preventDefault();
    UserService.signUpService(values.name, values.password, values.email)
      .then(() => {
        setSuccess(true);
      })
      .catch((err) => {
        setError(true);
        console.log(err);
        setMessage(err.response.data.message);
      });
  };
  return (
    <form onSubmit={(e) => signUpHandler(e)}>
      <input
        type="email"
        placeholder="email"
        onChange={handleChange("email")}
      />
      <input
        type="password"
        placeholder="password"
        onChange={handleChange("password")}
      />
      <input type="text" placeholder="name" onChange={handleChange("name")} />
      {error ? <div>{message}</div> : null}
      {success ? <div>Success</div> : null}
      <button>Sign up</button>
    </form>
  );
}
