import React, { useState } from "react";
import { Button } from "reactstrap";
import { Input } from "../components/common";
import { toast } from "react-toastify";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase.config";
import { useNavigate, Link } from "react-router-dom";
import "./register.scss";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        toast.success("Successfully registered");
        navigate("/login");
      })
      .catch((err) => {
        console.error(err);
        toast.error("Both fields are mandatory");
      });
  };

  return (
    <div className="register">
      <form onSubmit={handleRegister}>
        <h2>Register user</h2>
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
          Sign up
        </Button>
        <p>
          Already have an account? <Link to="/login">Log in</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
