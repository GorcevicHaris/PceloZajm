import { useEffect, useState } from "react";
import { ChevronRight } from "lucide-react";
import "./landing.css";
import { useNavigate } from "react-router-dom";
import Image1 from "../../Assets/image1.png";
import Image2 from "../../Assets/image2.png";
import Image3 from "../../Assets/image3.png";
import Image4 from "../../Assets/image4.png";

function App() {
  const [hoveredId, setHoveredId] = useState(null);
  const navigate = useNavigate();
  let auth = document.cookie;
  console.log(auth, "auth");
  useEffect(() => {
    if (auth) {
      navigate("/profile");
    }
  }, []);
  //
  const beekeepers = [
    {
      id: 1,
      name: "Senad Gorcevic",
      role: "Master pčelar",
      specialty: "Organski med",
      image: Image1,
    },
    {
      id: 2,
      name: "Hamza Gorcevic",
      role: "Specijalista za matice",
      specialty: "Bagremov med",
      image: Image2,
    },
    {
      id: 3,
      name: "Erhad Masovic",
      role: "Tradicionalni pčelar",
      specialty: "Livadski med",
      image: Image3,
    },
    {
      id: 4,
      name: "Milutin Milankovic",
      role: "Inovativni pčelar",
      specialty: "Šumski med",
      image: Image4,
    },
    {
      id: 5,
      name: "Milutin Milankovic",
      role: "Ekološki pčelar",
      specialty: "Planinski med",
      image: Image1,
    },
  ];

  return (
    <div className="app">
      {/* Hero Section */}
      <div className="hero">
        <div className="hero-background" />
        <div className="hero-content">
          <div className="hero-icon"></div>
          <h1>Dobrodošli u Svet Pčelara</h1>
          <p>Upoznajte naše iskusne pčelare i njihove proizvode</p>
        </div>
      </div>
      <div className="container-landing">
        <div className="beekeepers-grid">
          {beekeepers.map((beekeeper) => (
            <div
              key={beekeeper.id}
              className="beekeeper-card"
              onMouseEnter={() => setHoveredId(beekeeper.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <div className="card-image-container">
                <img
                  src={beekeeper.image}
                  alt={beekeeper.name}
                  className="card-image"
                />
              </div>

              <div className="card-content">
                <h2>{beekeeper.name}</h2>
                <p className="role">{beekeeper.role}</p>
                <p className="specialty">{beekeeper.specialty}</p>

                <button className="view-button">
                  <span>Pregledaj</span>
                  <ChevronRight className="button-icon" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
