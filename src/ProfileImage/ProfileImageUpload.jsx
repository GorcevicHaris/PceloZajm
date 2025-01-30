import React, { useState, useEffect } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import "./profileImage.css";
const ProfileImageUpload = ({ userId }) => {
  const [cookies] = useCookies(["token"]);
  const [profileImage, setProfileImage] = useState(null);
  const [loading, setLoading] = useState(false);

  // Функција за преузимање профилне слике
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

  // Ефекат за учитавање слике при монтажи
  useEffect(() => {
    fetchProfileImage();
  }, [userId]);

  // Руковање отпремањем датотеке
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
    <div className="profile-image-container">
      {profileImage && (
        <img src={profileImage} alt="Profile" className="profile-image" />
      )}
      <label className="upload-label">
        {loading ? "Uploading..." : "Upload Profile Image"}
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
