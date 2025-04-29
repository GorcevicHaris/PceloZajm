import { useContext, useEffect, useState } from "react";
import {
  ChevronRight,
  Bee,
  Award,
  Info,
  MessageSquare,
  Search,
} from "lucide-react";
import "./landing.css";
import { useNavigate } from "react-router-dom";
import { Context } from "../../Context";
import axios from "axios";

function App() {
  const { userId } = useContext(Context);
  const [profileImages, setProfileImages] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([
    {
      id: 1,
      name: "Livadski med",
      price: "12.99€",
      image:
        "https://cdn.pixabay.com/photo/2017/01/06/17/49/honey-1958464_1280.jpg",
      description: "Prirodni livadski med bogat raznolikim cvjetnim nektarom.",
    },
    {
      id: 2,
      name: "Bagremov med",
      price: "14.99€",
      image:
        "https://cdn.pixabay.com/photo/2014/10/28/20/36/honey-507139_1280.jpg",
      description: "Svjetli, blago aromatični med od cvijeta bagrema.",
    },
    {
      id: 3,
      name: "Cvijetni med",
      price: "11.99€",
      image:
        "https://cdn.pixabay.com/photo/2011/03/24/12/05/honey-5864_1280.jpg",
      description:
        "Bogati med s mješavinom nektara različitog sezonskog cvijeća.",
    },
  ]);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  // Učitavanje svih profilnih slika i informacija o pčelarima
  useEffect(() => {
    const fetchAllProfileImages = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4005/api/getAllProfileImages"
        );
        if (response?.data) {
          console.log(response.data, "resssss");
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

  const filteredBeekeepers = searchQuery
    ? profileImages.filter((beekeeper) =>
        beekeeper.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : profileImages;

  return (
    <div className="app-container">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-background"></div>
        <div className="hero-content">
          <div className="hero-icon"></div>
          <h1>Dobrodošli u Svijet Pčelarstva</h1>
          <p>Otkrijte najbolje domaće pčelare i njihove prirodne proizvode</p>
        </div>
        <div className="honeycomb-decoration left"></div>
        <div className="honeycomb-decoration right"></div>
      </section>

      {/* Featured Products */}
      {/* <section className="featured-section">
        <div className="container-landing">
          <div className="section-header">
            <h2>Istaknuti Proizvodi</h2>
            <div className="section-divider">
              <span className="divider-bee">🐝</span>
            </div>
          </div>
          <div className="featured-products">
            {featuredProducts.map((product) => (
              <div key={product.id} className="product-card">
                <div className="product-image-container">
                  <img
                    src={product.image || "/default-product.jpg"}
                    alt={product.name}
                    className="product-image"
                  />
                </div>
                <div className="product-content">
                  <h3>{product.name}</h3>
                  <p className="product-price">{product.price}</p>
                  <p className="product-description">{product.description}</p>
                  <button className="product-button">Detaljnije</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* Benefits Section */}
      <section className="benefits-section">
        <div className="container-landing">
          <div className="section-header">
            <h2>Zašto Odabrati Naše Pčelare?</h2>
            <div className="section-divider">
              <span className="divider-bee">🐝</span>
            </div>
          </div>
          <div className="benefits-grid">
            <div className="benefit-card">
              <div className="benefit-icon">
                <Award />
              </div>
              <h3>Vrhunski Kvalitet</h3>
              <p>
                Svi naši proizvodi dolaze direktno od provjerenih pčelara sa
                dugogodišnjim iskustvom.
              </p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon">
                <Info />
              </div>
              <h3>Transparentnost</h3>
              <p>
                Detaljne informacije o porijeklu i načinu proizvodnje svakog
                proizvoda.
              </p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon">
                <MessageSquare />
              </div>
              <h3>Direktan Kontakt</h3>
              <p>
                Povežite se direktno s pčelarima i saznajte više o njihovim
                metodama i proizvodima.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Beekeepers Section */}
      <section className="beekeepers-section">
        <div className="container-landing">
          <div className="section-header">
            <h2>Naši Pčelari</h2>
            <div className="section-divider">
              <span className="divider-bee">🐝</span>
            </div>
          </div>

          {/* Search input moved here, right above the beekeepers listing */}
          <div className="beekeepers-search">
            <div className="search-container">
              <Search className="search-icon" />
              <input
                type="text"
                placeholder="Pretraži pčelare..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
            </div>
          </div>

          <div className="beekeepers-grid">
            {filteredBeekeepers.map((beekeeper, index) => (
              <div key={index} className="beekeeper-card">
                <div className="hexagon-frame">
                  <img
                    src={beekeeper.imageLink || "/default-image.jpg"}
                    alt="Profile"
                    className="profile-image"
                  />
                </div>
                <div className="card-content">
                  <h2>{beekeeper.name}</h2>
                  <p className="role">Pčelar</p>
                  <p className="specialty">Specijalnost nije dostupna</p>
                  <div className="beekeeper-location">
                    <i className="location-icon">📍</i>
                    <span>
                      {beekeeper.location || "Lokacija nije dostupna"}
                    </span>
                  </div>
                  <div className="hive-count">
                    <i className="hive-icon">🏠</i>
                    <span>{beekeeper.hiveCount || "?"} košnica</span>
                  </div>
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
      </section>

      {/* Newsletter Section */}
      <section className="newsletter-section">
        <div className="container-landing">
          <div className="newsletter-content">
            <h2>Pretplatite se na naš Bilten</h2>
            <p>
              Budite u toku s najnovijim vijestima i ponudama iz svijeta
              pčelarstva
            </p>
            <div className="newsletter-form">
              <input
                type="email"
                placeholder="Vaša email adresa"
                className="newsletter-input"
              />
              <button className="newsletter-button">Pretplati se</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
