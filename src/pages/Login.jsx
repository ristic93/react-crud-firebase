import React, { useContext, useState } from "react";
import { Button } from "reactstrap";
import { Input } from "../components/common";
import { toast } from "react-toastify";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase.config";
import { useNavigate, Link } from "react-router-dom";
import "./register.scss";
import AuthContext from "../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const { login } = useContext(AuthContext);

  const handleLogin = (e) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        toast.success("Logged in successfully");
        login(user);
        navigate("/employees");
      })
      .catch((err) => {
        console.error(err);
        toast.error("Wrong email or password");
      });
  };

  return (
    <div className="register">
      <form onSubmit={handleLogin}>
        <h2>Log in</h2>
        <Input
          label="Email:"
          type="email"
          id="email"
          name="email"
          placeholder="Your Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          label="Password"
          type="password"
          id="password"
          name="password"
          placeholder="Your Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit" color="primary">
          Login
        </Button>
        <p>
          Don't have an account? <Link to="/">Sign up</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
