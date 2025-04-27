import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./pcelarposts.css";
import { Context } from "../Context";

function PcelarsPosts() {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { role } = useContext(Context);
  const navigate = useNavigate();

  // Redirect if no ID
  useEffect(() => {
    if (!id) {
      navigate("/");
    }
  }, [id, navigate]);

  // Fetch posts and user info
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [imagesResponse, userResponse] = await Promise.all([
          axios.get("http://localhost:4005/api/getImages", {
            params: { user_id: id },
          }),
          axios.get("http://localhost:4005/api/getUserInfo", {
            params: { user_id: id, role: role },
          }),
        ]);
        console.log(imagesResponse, "img response");
        setData(imagesResponse.data);
        setUserInfo(userResponse.data);
        setLoading(false);
      } catch (error) {
        console.error(
          "Error fetching data:",
          error.message,
          error.response?.data
        );
        setError("Failed to load data. Please try again later.");
        setLoading(false);
      }
    };
    fetchData();
  }, [id, role]);

  if (loading) return <p className="loading">Loading...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="pcelar-posts">
      <h1>Posts by {userInfo?.name || "Unknown Beekeeper"}</h1>
      {userInfo && (
        <div className="beekeeper-info">
          <img
            src={userInfo.profile_image || "/default-image.jpg"}
            alt={`${userInfo.name}'s profile`}
            className="profile-image"
          />
          <p>
            <strong>Name:</strong> {userInfo.name || "Not available"}
          </p>
          <p>
            <strong>Description:</strong>{" "}
            {userInfo.description || "Not available"}
          </p>
          <p>
            <strong>Experience:</strong>{" "}
            {userInfo.expirience || "Not available"}
          </p>
        </div>
      )}
      {data.length === 0 ? (
        <p className="no-posts">No posts available for this beekeeper.</p>
      ) : (
        data.map((post, index) => (
          <div key={index} className="post-card">
            <img
              src={post.url}
              alt={`Post ${index + 1}`}
              className="post-image"
            />
            <div className="post-content">
              <h2>Post {index + 1}</h2>
              <p>{post.description || "No description available."}</p>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default PcelarsPosts;
