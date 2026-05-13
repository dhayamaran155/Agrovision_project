import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

function Register() {

  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  // ✅ Clear form EVERY TIME page opens
  useEffect(() => {
    setEmail("");
    setPassword("");
    setError("");
    setSuccess(false);
  }, []);

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("http://127.0.0.1:8000/api/register/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await res.json();

      if (data.success) {
        alert("Registration successful");
        navigate("/login");
      } else {
        setError(data.message || "Registration failed");
      }
    } catch (err) {
      setError("Server error");
    }
  };

  return (
    <div className="register-page">
      <style>{`
        body {
          margin: 0;
        }

        .register-page {
          min-height: 100vh;
          width: 100%;
          background: linear-gradient(135deg, #2d6a4f, #95d5b2);
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 16px;
          box-sizing: border-box;
        }

        .form-container {
          background: white;
          padding: 35px;
          border-radius: 16px;
          width: min(100%, 360px);
          text-align: center;
          box-shadow: 0 15px 30px rgba(0,0,0,0.25);
          animation: fadeScale 0.8s ease;
          box-sizing: border-box;
        }

        @keyframes fadeScale {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .form-container h1 {
          color: #2d6a4f;
          font-weight: bold;
        }

        .form-container h2 {
          margin-bottom: 20px;
          color: #40916c;
        }

        .form-container input {
          width: 100%;
          padding: 12px;
          margin: 10px 0;
          border: 1px solid #ccc;
          border-radius: 8px;
          font-size: 14px;
        }

        .form-container button {
          width: 100%;
          padding: 12px;
          margin-top: 12px;
          border: none;
          border-radius: 8px;
          background: linear-gradient(135deg, #2d6a4f, #40916c);
          color: white;
          font-size: 16px;
          cursor: pointer;
        }

        .error {
          color: red;
          margin-top: 8px;
          font-size: 14px;
        }

        .success {
          color: green;
          margin-top: 8px;
          font-size: 15px;
          font-weight: bold;
        }

        .form-container span {
          color: #2d6a4f;
          font-weight: bold;
          cursor: pointer;
          text-decoration: underline;
        }

        .home-btn {
          margin-top: 12px;
          padding: 10px 15px;
          border: 1px solid #2d6a4f;
          background: white;
          color: #2d6a4f;
          border-radius: 6px;
          font-size: 14px;
          cursor: pointer;
        }

        @media (max-width: 480px) {
          .form-container {
            padding: 20px 16px;
          }
        }
      `}</style>

      <div className="form-container">
        <h1>🌱 AGROVISION</h1>
        <h2>Create Account</h2>

        <form onSubmit={handleRegister} autoComplete="off">
          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="off"
            required
          />

          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="new-password"
            required
          />

          <button type="submit">Register</button>

          {error && <p className="error">{error}</p>}
          {success && <p className="success">✅ Registration Successful</p>}
        </form>

        <p>
          Already have an account?{" "}
          <span onClick={() => navigate("/login")}>Login</span>
        </p>

        <Link to="/">
          <button className="home-btn">Go to Home</button>
        </Link>
      </div>
    </div>
  );
}

export default Register;
