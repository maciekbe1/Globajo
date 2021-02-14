import React, { useState } from "react";
import { Link } from "react-router-dom";
import { signIn } from "store/actions/userActions";
import { useDispatch } from "react-redux";
import * as UserService from "services/userService";

export default function Signin() {
  const dispatch = useDispatch();
  const [values, setValues] = useState({
    email: "",
    password: "",
    showPassword: false
  });
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const signInHandler = (e) => {
    e.preventDefault();
    setError(false);
    setLoading(true);
    UserService.signInService(values.email, values.password)
      .then(() => {
        UserService.getMeService().then((res) => {
          dispatch(
            signIn({
              isAuth: true,
              data: res.data
            })
          );
          setLoading(false);
          setSuccess(true);
        });
      })
      .catch((err) => {
        setError(true);
        setLoading(false);
        try {
          setMessage(err.response.data.message);
        } catch (error) {
          setMessage("Something goes wrong, try it leater");
        }
      });
  };
  return (
    <form onSubmit={(e) => signInHandler(e)}>
      <p>test@test.pl / 11111</p>
      <input type="email" onChange={handleChange("email")} />
      <input type="password" onChange={handleChange("password")} />
      {error ? <div>{message}</div> : null}
      {success ? <Link to="/protected">protected</Link> : null}
      {loading ? <div>loading...</div> : <button>Sign in</button>}
    </form>
  );
}
