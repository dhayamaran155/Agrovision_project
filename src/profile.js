import React, { useEffect, useState } from "react";
import Header from "./components/header";
import Footer from "./components/footer";
import { useAuth } from "./AuthContext";
import "./profile.css";

function Profile() {
  const [user, setUser] = useState(null);
  const { logout, isLoggedIn } = useAuth();

  useEffect(() => {
    if (!isLoggedIn) {
      window.location.href = "/login";
      return;
    }

    // 📡 Fetch profile data
    const token = localStorage.getItem("token");
    fetch("http://127.0.0.1:8000/api/profile/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Unauthorized");
        }
        return res.json();
      })
      .then((data) => {
        setUser(data);
      })
      .catch((err) => {
        console.log("Profile error:", err);
        localStorage.removeItem("token");
        window.location.href = "/login";
      });
  }, [isLoggedIn]);

  // ⏳ Loading state
  if (!user) {
    return (
      <div style={{ paddingTop: "120px", textAlign: "center" }}>
        <h3>Loading profile...</h3>
      </div>
    );
  }

  return (
    <>
      <Header />
      <div className="profile-container">
        <div className="profile-card">
          <h2>👤 User Profile</h2>
          <p>
            <b>Username:</b> {user.username}
          </p>
          <p>
            <b>Email:</b> {user.email}
          </p>
          <div className="btn-group">
            <button
              onClick={() => {
                logout();
                window.location.href = "/login";
              }}
            >
              Logout
            </button>
            <button
              onClick={() => {
                window.location.href = "/";
              }}
            >
              Home
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Profile;
