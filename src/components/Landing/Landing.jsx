import { useContext, useEffect, useState } from "react";
import { ChevronRight } from "lucide-react";
import "./landing.css";
import { useNavigate } from "react-router-dom";
import Image1 from "../../Assets/image1.png";
import Image2 from "../../Assets/image2.png";
import Image3 from "../../Assets/image3.png";
import Image4 from "../../Assets/image4.png";
import Image5 from "../../Assets/image5.png";

import { Context } from "../../Context";
import axios from "axios";

function App() {
  const [hoveredId, setHoveredId] = useState(null);
  const { userId } = useContext(Context);
  const [info, setInfo] = useState([]);
  const navigate = useNavigate();

  function goToPcelarPosts(id) {
    navigate(`/pcelarPosts/${id}`);
  }

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
  console.log(userId, "user id iz landinga");

  return (
    <div className="container-landing">
      <div className="beekeepers-grid">
        {info.map((beekeeper, index) => (
          <div
            key={index} // Koristi index jer API verovatno ne pruža ID
            className="beekeeper-card"
          >
            <div className="card-image-container">
              <img alt={beekeeper.name} className="card-image" />
            </div>

            <div className="card-content">
              <h2>{beekeeper.name}</h2>
              <p className="role">Pčelar</p> {/* Podrazumevana uloga */}
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
