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
  const [cookies, setCookie] = useCookies([
    "token",
    "likedPosts",
    "likedUsers",
  ]);
  const [postLikes, setPostLikes] = useState({});
  const [userLikes, setUserLikes] = useState(0);

  useEffect(() => {
    if (!id) {
      navigate("/");
    }
  }, [id, navigate]);

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
        const initialPostLikes = {};
        imagesResponse.data.forEach((post) => {
          initialPostLikes[post.id] = post.likes || 0;
        });
        setPostLikes(initialPostLikes);
        setUserLikes(userResponse.data.likes || 0);
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

  const fetchProfileImage = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4005/api/getProfileImage",
        {
          params: { userId: id },
        }
      );
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

  const sendLike = async (postId, currentLikes) => {
    const likedPosts = cookies.likedPosts || [];
    if (likedPosts.includes(postId)) {
      alert("You have already liked this post!");
      return;
    }

    const newLikes = currentLikes + 1;
    setPostLikes((prevLikes) => ({
      ...prevLikes,
      [postId]: newLikes,
    }));

    try {
      const response = await axios.post("http://localhost:4005/api/sendLike", {
        likes: newLikes,
        id: postId,
      });
      console.log("Like sent successfully:", response.data);
      const updatedLikedPosts = [...likedPosts, postId];
      setCookie("likedPosts", updatedLikedPosts, {
        path: "/",
        maxAge: 31536000,
      });
    } catch (error) {
      console.error("Error sending like:", error.message, error.response?.data);
      setPostLikes((prevLikes) => ({
        ...prevLikes,
        [postId]: currentLikes,
      }));
      alert("Failed to send like. Please try again.");
    }
  };

  const userLike = async () => {
    const likedUsers = cookies.likedUsers || [];
    if (likedUsers.includes(id)) {
      alert("You have already liked this user!");
      return;
    }

    const newLikes = userLikes + 1;
    setUserLikes(newLikes);

    try {
      const response = await axios.post("http://localhost:4005/api/userLike", {
        likes: newLikes,
        userId: id,
      });
      console.log("User like sent successfully:", response.data);
      const updatedLikedUsers = [...likedUsers, id];
      setCookie("likedUsers", updatedLikedUsers, {
        path: "/",
        maxAge: 31536000,
      });
    } catch (error) {
      console.error(
        "Error sending user like:",
        error.message,
        error.response?.data
      );
      setUserLikes(userLikes);
      alert("Failed to send user like. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="bp-loading-wrapper">
        <div className="bp-honeycomb-loader">
          <div className="bp-honeycomb-cell"></div>
          <div className="bp-honeycomb-cell"></div>
          <div className="bp-honeycomb-cell"></div>
        </div>
        <p>Loading beekeeper's profile...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bp-error-wrapper">
        <div className="bp-error-icon">!</div>
        <h2>Something went wrong</h2>
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>Try Again</button>
      </div>
    );
  }

  return (
    <div className="bp-container">
      <div className="bp-honeycomb-bg"></div>

      <header className="bp-header">
        <div className="bp-profile-container">
          <div className="bp-image-wrapper">
            <img
              src={profileImage}
              className="bp-profile-image"
              alt="Beekeeper profile"
            />
          </div>

          <div className="bp-profile-details">
            <h1>{userInfo?.name || "Beekeeper"}</h1>
            <button
              onClick={userLike}
              className="bp-user-like-btn"
              disabled={cookies.likedUsers?.includes(id)}
              aria-label={`Like ${userInfo?.name || "Beekeeper"}'s profile`}
            >
              <span className="bp-user-like-icon">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
              </span>
              <span className="bp-user-like-count">{userLikes}</span>
            </button>
            <div className="bp-experience-badge">
              <span>{userInfo?.expirience || "Experienced"} Beekeeper</span>
            </div>
            <p className="bp-profile-bio">
              {userInfo?.description || "No description available"}
            </p>
          </div>
        </div>
      </header>

      <section className="bp-posts-section">
        <h2 className="bp-section-title">
          <span className="bp-title-icon">🐝</span>
          Recent Posts
          <span className="bp-title-underline"></span>
        </h2>

        {data.length === 0 ? (
          <div className="bp-no-posts">
            <p>This beekeeper hasn't shared any posts yet.</p>
            <p className="bp-hint">
              Check back soon for updates on their beekeeping journey!
            </p>
          </div>
        ) : (
          <div className="bp-posts-grid">
            {data.map((post, index) => (
              <article key={index} className="bp-post-card">
                <div className="bp-post-img-container">
                  <img
                    src={post.url}
                    alt={post.title || `Post ${index + 1}`}
                    className="bp-post-img"
                  />
                  <div className="bp-post-date">{post.date || "Recent"}</div>
                  <button
                    onClick={() => sendLike(post.id, postLikes[post.id] || 0)}
                    className="bp-like-btn"
                    disabled={cookies.likedPosts?.includes(post.id)}
                    aria-label={`Like post ${
                      post.title || `Post ${index + 1}`
                    }`}
                  >
                    <span className="bp-like-icon">🍯</span>

                    <span className="bp-like-count">
                      {postLikes[post.id] || 0}
                    </span>
                  </button>
                </div>

                <div className="bp-post-content">
                  <h3 className="bp-post-title">
                    {post.title || `Post ${index + 1}`}
                  </h3>
                  <p className="bp-post-desc">
                    {post.description || "No description available."}
                  </p>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      <footer className="bp-footer">
        <p>
          Follow this beekeeper's journey and discover the wonderful world of
          beekeeping!
        </p>
      </footer>
    </div>
  );
}

export default PcelarsPosts;
