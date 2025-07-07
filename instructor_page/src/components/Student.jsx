import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import "./css/Student.css";

function StudentPage() {
  const [studentName, setStudentName] = useState(null);
  const [mode, setMode] = useState(null); // null | 'login' | 'register'

  // Form states
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    const storedStudent = sessionStorage.getItem("studentName");
    if (storedStudent) {
      setStudentName(storedStudent);
    }
  }, []);

  const handleCheckIn = () => {
    alert("Checked in successfully!");
    // Implement actual check-in logic here
  };

  const handleLogin = (e) => {
    e.preventDefault();
    axios.post("http://localhost:8080/api/users/login", { email, password })
      .then((res) => {
        alert("Login successful!");
        const nameFromEmail = email.split('@')[0];
        sessionStorage.setItem("studentName", nameFromEmail); // Save to sessionStorage
        setStudentName(nameFromEmail);
        resetForm();
      })
      .catch((err) => {
        alert("Invalid credentials!");
        console.error("Login error:", err);
      });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    axios.post("http://localhost:8080/api/users/register", {
      fullName: name,
      email,
      password,
    })
      .then((res) => {
        alert("Registration successful!");
        sessionStorage.setItem("studentName", name);
        setStudentName(name);
        resetForm();
      })
      .catch((err) => {
        alert("Registration failed!");
        console.error("Register error:", err);
      });
  };

  const resetForm = () => {
    setMode(null);
    setEmail("");
    setName("");
    setPassword("");
    setConfirmPassword("");
    setShowPassword(false);
    setShowConfirmPassword(false);
  };

  const handleLogout = () => {
    sessionStorage.removeItem("studentName");
    setStudentName(null);
  };

  return (
    <div className="student-page-container">
      <div className="top-section">
        <h2>Class Name</h2>
        <p>Welcome, {studentName ? studentName : "Guest"}!</p>
      </div>

      <div className="bottom-section">
        {studentName ? (
          <>
            <button className="main-btn" onClick={handleCheckIn}>
              Check In
            </button>
            <button className="main-btn" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : mode === null ? (
          <>
            <button className="main-btn" onClick={() => setMode("login")}>
              Login
            </button>
            <button className="main-btn" onClick={() => setMode("register")}>
              Register
            </button>
          </>
        ) : mode === "login" ? (
          <form onSubmit={handleLogin} className="auth-form">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <div className="pass-input-div">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              {showPassword ? (
                <FaEyeSlash onClick={() => setShowPassword(false)} />
              ) : (
                <FaEye onClick={() => setShowPassword(true)} />
              )}
            </div>

            <button type="submit" className="main-btn">Log In</button>
            <p className="toggle-mode" onClick={() => setMode("register")}>
              Don't have an account? Register
            </p>
          </form>
        ) : (
          <form onSubmit={handleRegister} className="auth-form">
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <div className="pass-input-div">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              {showPassword ? (
                <FaEyeSlash onClick={() => setShowPassword(false)} />
              ) : (
                <FaEye onClick={() => setShowPassword(true)} />
              )}
            </div>

            <div className="pass-input-div">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              {showConfirmPassword ? (
                <FaEyeSlash onClick={() => setShowConfirmPassword(false)} />
              ) : (
                <FaEye onClick={() => setShowConfirmPassword(true)} />
              )}
            </div>

            <button type="submit" className="main-btn">Register</button>
            <p className="toggle-mode" onClick={() => setMode("login")}>
              Already have an account? Log In
            </p>
          </form>
        )}
      </div>
    </div>
  );
}

export default StudentPage;