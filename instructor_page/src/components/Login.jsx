import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { GoogleLogin } from "@react-oauth/google";
import TeacherImage from "../assets/instructor.jpg";
import Logo from "../assets/logo.png";
import QuickCheck from "../assets/quickcheck_logo.png";
import QuickCheckLogo from "../assets/logo-withoutbg.png";
import GoogleSvg from "../assets/icons8-google.svg";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { toast } from "react-toastify";
import "./css/login.css";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    toast.info("Logging in...", { autoClose: 1000 }); // Show info for 2 seconds

    axios
      .post("http://localhost:8080/api/users/login", { email, password })
      .then((res) => {
        setEmail("");
        setPassword("");

        toast.success("Login successful!", { autoClose: 1000 }); // 3 seconds

        // Wait before navigating
        setTimeout(() => {
          if (email.includes("@admin")) {
            navigate("/admin");
          } else {
            navigate("/landing");
          }
        }, 500); // Small delay to allow toast to display
      })
      .catch((err) => {
        toast.error("Invalid credentials!", { autoClose: 4000 }); // 4 seconds
        console.error("Login error:", err);
      });
  };

  return (
    <div className="login-main">
      <div className="login-left">
        <div
          className="login-left-bg"
          style={{ backgroundImage: `url(${TeacherImage})` }}
        />
        <img
          src={QuickCheckLogo}
          alt="QuickCheck Logo"
          className="quickcheck-logo"
        />
      </div>

      <div className="login-right">
        <div className="login-right-container">
          <div className="login-logo">
            <img src={Logo} alt="App Logo" />
          </div>

          <div className="login-center">
            <h2>Welcome back!</h2>
            <p>Please enter your details</p>

            <form onSubmit={handleLogin}>
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

              <div className="login-center-buttons">
                <button type="submit" className="main-btn">
                  Log In
                </button>

                <GoogleLogin
                  onSuccess={(credentialResponse) => {
                    console.log("Google login success:", credentialResponse);

                    // Optional: Decode token or fetch user info
                    // Example decode: https://jwt.io/ or jwt-decode lib
                    navigate("/landing");
                  }}
                  onError={() => {
                    console.log("Google login failed");
                    alert("Google login failed!");
                  }}
                />
              </div>
            </form>
          </div>

          <p className="login-bottom-p">
            Don't have an account?{" "}
            <a href="#" onClick={() => navigate("/register")}>
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
