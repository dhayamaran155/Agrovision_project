import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (data.success) {
        navigate("/login");
      } else {
        setError(data.message || "Registration failed!");
      }
    } catch (err) {
      setError("Server error!");
    }
  };

  return (
    <div className="register-page">
      {/* ✅ Internal CSS */}
      <style>{`
        .register-page {
          height: 100vh;
          width: 100%;
          background-image: url('/Background3.jpeg'); /* put image in public/ */
          background-size: cover;
          background-position: center;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .form-container {
          background: rgba(255, 255, 255, 0.9);
          padding: 30px;
          border-radius: 15px;
          width: 350px;
          text-align: center;
          box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.2);
        }
        .form-container h1 {
          color: #2d6a4f;
          font-weight: bold;
          margin-bottom: 5px;
        }
        .form-container h2 {
          margin-bottom: 20px;
          color: #2d6a4f;
        }
        .form-container input {
          width: 100%;
          padding: 12px;
          margin: 10px 0;
          border: 1px solid #ccc;
          border-radius: 8px;
          outline: none;
          font-size: 14px;
        }
        .form-container button {
          width: 100%;
          padding: 12px;
          margin-top: 10px;
          border: none;
          border-radius: 8px;
          background-color: #2d6a4f;
          color: white;
          font-size: 16px;
          cursor: pointer;
          transition: 0.3s ease;
        }
        .form-container button:hover {
          background-color: #1b4332;
        }
        .error {
          color: red;
          margin-top: 8px;
          font-size: 14px;
        }
        .form-container span {
          color: #2d6a4f;
          font-weight: bold;
          cursor: pointer;
          text-decoration: underline;
        }
        /* ✅ Simple Go Home button */
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
      `}</style>

      <div className="form-container">
        <h1>🌱 AGROVISION</h1>
        <h2>Register</h2>
        <form onSubmit={handleRegister}>
          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Register</button>

          {error && <p className="error">{error}</p>}
        </form>
        <p>
          Already have an account?{" "}
          <span onClick={() => navigate("/login")}>Login</span>
        </p>
        <p>
          <Link to="/"><button className="home-btn">Go to Home</button></Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
