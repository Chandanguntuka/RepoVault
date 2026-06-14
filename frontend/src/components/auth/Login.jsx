import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../../authContext";
import { Button, Heading, BaseStyles } from "@primer/react";
import logo from "../../assets/github-mark-white.svg";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { setCurrentUser } = useAuth(); // Get setCurrentUser from auth context

  // useEffect(() => {
  //   localStorage.removeItem("token");
  //   localStorage.removeItem("userId");
  //   setCurrentUser(null); // Clear current user in context on component mount
  // });

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post("http://localhost:3003/login", {
        email: email,
        password: password,
      });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userId", res.data.userId);
      setCurrentUser(res.data.userId);
      setLoading(false);
      window.location.href = "/";
    } catch (err) {
      console.error(err);
      alert("Login Failed!");
      setLoading(false);
    }
  };

  return (
    <BaseStyles>
      <div style={styles.page}>
        {/* Logo */}
        <div style={styles.logoContainer}>
          <img src={logo} alt="GitHub Logo" style={styles.logo} />
        </div>

        {/* Heading */}
        <Heading as="h1" style={styles.heading}>
          Sign In
        </Heading>

        {/* Form Box */}
        <div style={styles.formBox}>
          <div style={styles.fieldGroup}>
            <label style={styles.label}>Email address</label>
            <input
              autoComplete="off"
              name="Email"
              id="Email"
              style={styles.input}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div style={styles.fieldGroup}>
            <label style={styles.label}>Password</label>
            <input
              autoComplete="off"
              name="Password"
              id="Password"
              style={styles.input}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <Button
            variant="primary"
            disabled={loading}
            onClick={handleLogin}
            style={styles.button}
          >
            {loading ? "Loading..." : "Login"}
          </Button>
        </div>

        {/* New to GitHub box */}
        <div style={styles.loginBox}>
          <p style={styles.loginText}>
            New to GitHub?{" "}
            <Link to="/signup" style={styles.link}>
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </BaseStyles>
  );
};

const styles = {
  page: {
    backgroundColor: "#0d1117",
    minHeight: "100vh",
    width: "100%",
    margin: 0,
    padding: "40px 16px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    boxSizing: "border-box",
  },
  logoContainer: {
    marginBottom: "16px",
  },
  logo: {
    width: "52px",
    height: "52px",
  },
  heading: {
    color: "#e6edf3",
    fontSize: "28px",
    fontWeight: "300",
    marginBottom: "20px",
    textAlign: "center",
  },
  formBox: {
    backgroundColor: "#161b22",
    border: "1px solid #30363d",
    borderRadius: "10px",
    padding: "24px",
    width: "100%",
    maxWidth: "340px",
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  fieldGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
  },
  label: {
    color: "#e6edf3",
    fontSize: "14px",
    fontWeight: "600",
  },
  input: {
    backgroundColor: "#0d1117",
    border: "1px solid #30363d",
    borderRadius: "6px",
    color: "#e6edf3",
    fontSize: "14px",
    padding: "8px 12px",
    outline: "none",
    width: "100%",
    boxSizing: "border-box",
  },
  button: {
    width: "100%",
    padding: "8px",
    fontSize: "14px",
    marginTop: "4px",
    backgroundColor: "#238636",
    borderColor: "#2ea043",
    color: "#fff",
    cursor: "pointer",
  },
  loginBox: {
    backgroundColor: "#161b22",
    border: "1px solid #30363d",
    borderRadius: "10px",
    padding: "20px",
    width: "100%",
    maxWidth: "340px",
    marginTop: "16px",
    textAlign: "center",
  },
  loginText: {
    color: "#e6edf3",
    fontSize: "14px",
    margin: 0,
  },
  link: {
    color: "#58a6ff",
    textDecoration: "none",
  },
};

export default Login;