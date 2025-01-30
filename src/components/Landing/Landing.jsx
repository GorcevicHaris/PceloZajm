import { useContext, useEffect, useState } from "react";
import { ChevronRight } from "lucide-react";
import "./landing.css";
import { useNavigate } from "react-router-dom";
import ProfileImageUpload from "../../ProfileImage/ProfileImageUpload";
import { useCookies } from "react-cookie";

import { Context } from "../../Context";
import axios from "axios";

function App() {
  const { userId } = useContext(Context);
  const [info, setInfo] = useState([]);
  const navigate = useNavigate();
  const [profileImage, setProfileImage] = useState(null);

  // Функција за преузимање профилне слике

  // Ефекат за учитавање слике при монтажи
  useEffect(() => {
    const fetchProfileImage = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4005/api/getProfileImage",
          {
            params: { userId },
          }
        );
        if (response?.data) {
          setProfileImage(response.data.imageLink);
        }
      } catch (error) {
        console.error("Error fetching profile image:", error);
      }
    };
    fetchProfileImage();
  }, [userId]);

  function goToPcelarPosts(id) {
    navigate(`/pcelarPosts/${id}`);
  }
  console.log(profileImage, "profile image", userId, "userid");
  useEffect(() => {
    if (!userId) {
      navigate("/");
    }
  }, [userId]);

  useEffect(() => {
    function getInfo() {
      axios.get("http://localhost:4005/api/getAdminNames").then((res) => {
        console.log(res.data, "informacije po adminima");
        setInfo(res.data);
      });
    }
    getInfo();
  }, []);
  console.log(userId, "user id iz landinga", "info - ", info);

  return (
    <div className="container-landing">
      <div className="beekeepers-grid">
        {info.map((beekeeper, index) => (
          <div
            key={index} // Koristi index jer API verovatno ne pruža ID
            className="beekeeper-card"
          >
            {profileImage && (
              <img src={profileImage} alt="Profile" className="profile-image" />
            )}
            <div className="card-image-container">
              <img alt={beekeeper.name} className="card-image" />
            </div>

            <div className="card-content">
              <h2>{beekeeper.name}</h2>
              <p className="role">Pčelar</p>
              <p className="specialty">Specijalnost nije dostupna</p>{" "}
              <button
                onClick={() => goToPcelarPosts(beekeeper.id)}
                className="view-button"
              >
                <span>Pregledaj</span>
                <ChevronRight className="button-icon" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
