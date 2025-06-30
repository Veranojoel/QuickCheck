import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/logo.png";
import QuickCheck from "../assets/quickcheck_logo.png";
import GoogleSvg from "../assets/icons8-google.svg";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import "./css/login.css";
import axios from "axios";
import TeacherImage from "../assets/instructor.jpg"; 

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
  e.preventDefault();
  if (password !== confirmPassword) {
    alert("Passwords do not match!");
    return;
  }

  try {
    const response = await axios.post("http://localhost:8080/api/users/register", {
      fullName: name,
      email,
      password,
    });

    console.log("Registered user:", response.data);
    alert("Registration successful!");
    navigate("/login");
  } catch (error) {
    console.error("Registration failed:", error);
    alert("Registration failed. Please try again.");
  }
};

  return (
    <div className="login-main">
      <div className="login-left">
        <div
        className="login-left-bg"
        style={{ backgroundImage: `url(${TeacherImage})` }}
      />
        <img src={QuickCheck} alt="QuickCheck Logo" className="quickcheck-logo" />
      </div>

      <div className="login-right">
        <div className="login-right-container">
          <div className="login-logo">
            <img src={Logo} alt="" />
          </div>
          <div className="login-center">
            <h2>Create your account</h2>
            <p>Please fill in your details</p>
            <form onSubmit={handleRegister}>
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
              <div className="login-center-buttons">
                <button type="submit" className="main-btn">
                  Sign Up
                </button>
                <button type="button">
                  <img src={GoogleSvg} alt="" />
                  Sign Up with Google
                </button>
              </div>
            </form>
          </div>
          <p className="login-bottom-p">
            Already have an account?{" "}
            <a href="#" onClick={() => navigate("/login")}>
              Log In
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
