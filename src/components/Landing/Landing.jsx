import { useContext, useEffect, useState } from "react";
import { ChevronRight } from "lucide-react";
import "./landing.css";
import { useNavigate } from "react-router-dom";
import { Context } from "../../Context";
import axios from "axios";

function App() {
  const { userId } = useContext(Context);
  const [profileImages, setProfileImages] = useState([]);
  const navigate = useNavigate();

  // Učitavanje svih profilnih slika i informacija o pčelarima
  useEffect(() => {
    const fetchAllProfileImages = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4005/api/getAllProfileImages"
        );
        if (response?.data) {
          setProfileImages(response.data); // Čuva sve podatke o pčelarima
        }
      } catch (error) {
        console.error("Error fetching all profile images:", error);
      }
    };
    fetchAllProfileImages();
  }, []);

  // Ako nema userId, preusmeri na login stranicu
  useEffect(() => {
    if (!userId) {
      navigate("/");
    }
  }, [userId]);

  // Funkcija za navigaciju
  function goToPcelarPosts(id) {
    navigate(`/pcelarPosts/${id}`);
  }

  return (
    <div className="container-landing">
      <div className="beekeepers-grid">
        {profileImages.map((beekeeper, index) => (
          <div key={index} className="beekeeper-card">
            <img
              src={beekeeper.imageLink || "/default-image.jpg"} // Ako nema slike, koristi podrazumevanu
              alt="Profile"
              className="profile-image"
            />
            <div className="card-image-container">
              <img className="card-image" />
            </div>
            <div className="card-content">
              <h2>{beekeeper.name}</h2>
              <p className="role">Pčelar</p>
              <p className="specialty">Specijalnost nije dostupna</p>
              <button
                onClick={() => goToPcelarPosts(beekeeper.userId)}
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
