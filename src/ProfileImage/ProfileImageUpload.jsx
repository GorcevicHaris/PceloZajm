import React, { useState, useEffect } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import "./profileImage.css";

const ProfileImageUpload = ({ userId }) => {
  const [cookies] = useCookies(["token"]);
  const [profileImage, setProfileImage] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch profile image
  const fetchProfileImage = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4005/api/getProfileImage",
        {
          params: { userId },
        }
      );
      if (response.data) {
        setProfileImage(response.data.imageLink);
      }
    } catch (error) {
      console.error("Error fetching profile image:", error);
    }
  };

  // Load image on mount
  useEffect(() => {
    fetchProfileImage();
  }, [userId]);

  // Handle file upload
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("user_id", userId);

    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:4005/uploadProfile",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${cookies.token}`,
          },
        }
      );
      setProfileImage(response.data.url);
      setLoading(false);
    } catch (error) {
      console.error("Upload error:", error);
      setLoading(false);
    }
  };

  return (
    <div className="profile-image-card">
      <h3 className="profile-image-title">Profilna slika</h3>
      <div className="profile-image-wrapper">
        {profileImage ? (
          <img
            src={profileImage}
            alt="Profilna slika"
            className="profile-image"
          />
        ) : (
          <div className="profile-image-placeholder">
            <span>Bez slike</span>
          </div>
        )}
      </div>
      <label className={`upload-button ${loading ? "disabled" : ""}`}>
        {loading ? (
          <span className="loading-spinner">Učitavanje...</span>
        ) : (
          "Učitaj sliku"
        )}
        <input
          type="file"
          onChange={handleFileUpload}
          accept="image/*"
          disabled={loading}
          style={{ display: "none" }}
        />
      </label>
    </div>
  );
};

export default ProfileImageUpload;
