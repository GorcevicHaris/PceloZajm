import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./pcelarposts.css";
import { Context } from "../Context";
import { useCookies } from "react-cookie";

function PcelarsPosts() {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { role } = useContext(Context);
  const navigate = useNavigate();
  const [profileImage, setProfileImage] = useState([]);
  const [cookies] = useCookies(["token"]);

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

        setData(imagesResponse.data);
        setUserInfo(userResponse.data);
        setLoading(false);
      } catch (error) {
        console.error(
          "Error fetching data:",
          error.message,
          error.response?.data
        );
        setError("Failed to load beekeeper data. Please try again later.");
        setLoading(false);
      }
    };

    fetchData();
  }, [id, role]);
  console.log(id, "--- id");
  const fetchProfileImage = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4005/api/getProfileImage",
        {
          params: { userId: id },
        }
      );
      console.log(response.data, "Data Response");
      if (response.data) {
        setProfileImage(response.data.imageLink);
      }
    } catch (error) {
      console.error("Error fetching profile image:", error);
    }
  };

  useEffect(() => {
    fetchProfileImage();
  }, [id]);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="honeycomb-loader">
          <div className="honeycomb-cell"></div>
          <div className="honeycomb-cell"></div>
          <div className="honeycomb-cell"></div>
        </div>
        <p>Loading beekeeper's profile...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <div className="error-icon">!</div>
        <h2>Something went wrong</h2>
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>Try Again</button>
      </div>
    );
  }

  console.log(profileImage);
  return (
    <div className="beekeeper-posts">
      <div className="honeycomb-bg"></div>

      <header className="beekeeper-header">
        <div className="profile-container">
          <div className="profile-image-wrapper">
            <img src={profileImage} className="profile-image" />
          </div>

          <div className="profile-details">
            <h1>{userInfo?.name || "Beekeeper"}</h1>
            <div className="experience-badge">
              <span>{userInfo?.expirience || "Experienced"} Beekeeper</span>
            </div>
            <p className="profile-description">
              {userInfo?.description || "No description available"}
            </p>
          </div>
        </div>
      </header>

      <section className="posts-section">
        <h2 className="section-title">
          <span className="title-icon">🐝</span>
          Recent Posts
          <span className="title-underline"></span>
        </h2>

        {data.length === 0 ? (
          <div className="no-posts">
            <p>This beekeeper hasn't shared any posts yet.</p>
            <p className="hint">
              Check back soon for updates on their beekeeping journey!
            </p>
          </div>
        ) : (
          <div className="posts-grid">
            {data.map((post, index) => (
              <article key={index} className="post-card">
                <div className="post-image-container">
                  <img
                    src={post.url}
                    alt={post.title || `Post ${index + 1}`}
                    className="post-image"
                  />
                  <div className="post-date">{post.date || "Recent"}</div>
                </div>

                <div className="post-content">
                  <h3 className="post-title">
                    {post.title || `Post ${index + 1}`}
                  </h3>
                  <p className="post-description">
                    {post.description || "No description available."}
                  </p>
                  <div className="post-footer">
                    <button className="read-more-btn">Read More</button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      <footer className="beekeeper-footer">
        <p>
          Follow this beekeeper's journey and discover the wonderful world of
          beekeeping!
        </p>
      </footer>
    </div>
  );
}

export default PcelarsPosts;
