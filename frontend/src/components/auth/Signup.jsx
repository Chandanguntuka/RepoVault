import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../../authContext";
import { PageHeader, Box, Button } from "@primer/react";
import "./auth.css";
import logo from "../../assets/github-mark-white.svg";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const { setCurrentUser } = useAuth();

  const handleSignup = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!email || !username || !password) {
      setError("Please fill in all fields");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const res = await axios.post("/api/signup", {
        email,
        password,
        username,
      });

      if (res.data && res.data.token) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("userId", res.data.userId);
        setCurrentUser(res.data.userId);
        navigate("/"); // Using navigate instead of window.location
      } else {
        throw new Error("Invalid response from server");
      }
    } catch (err) {
      console.error("Signup Error:", err);
      setError(err.response?.data?.message || "Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-logo-container">
        <img className="logo-login" src={logo} alt="GitHub Logo" />
      </div>

      <div className="login-box-wrapper">
        <div className="login-heading">
          <Box sx={{ padding: 1 }}>
            <h1 style={{ color: "#f1f6fd", fontSize: "32px", marginBottom: "10px" }}>
              Sign Up
            </h1>
          </Box>
        </div>

        {error && (
          <div className="error-message" style={{ color: "red", marginBottom: "15px" }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSignup} className="login-box">
          <div>
            <label className="label">Username</label>
            <input
              autoComplete="off"
              name="username"
              id="username"
              className="input"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="label">Email address</label>
            <input
              autoComplete="off"
              name="email"
              id="email"
              className="input"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="label">Password</label>
            <input
              autoComplete="off"
              name="password"
              id="password"
              className="input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength="6"
            />
          </div>

          <Button
            variant="primary"
            className="login-btn"
            disabled={loading}
            type="submit"
          >
            {loading ? "Loading..." : "Sign Up"}
          </Button>
        </form>

        <div className="pass-box">
          <p style={{ color: "#f1f6fd" }}>
            Already have an account?{" "}
            <Link to="/auth" style={{ color: "#58a6ff" }}>
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;