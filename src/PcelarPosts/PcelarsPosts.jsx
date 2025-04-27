import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./pcelarposts.css";
import { Context } from "../Context";

function PcelarsPosts() {
  const { id } = useParams(); // Preuzimanje ID-a iz URL-a
  const [data, setData] = useState([]); // Postovi
  const [userInfo, setUserInfo] = useState(null); // Podaci o korisniku (objekat, ne niz)
  const [loading, setLoading] = useState(true); // Čeka oba API poziva
  const [error, setError] = useState(null);
  const { role } = useContext(Context);
  const navigate = useNavigate();

  // Preusmeravanje ako nema ID-a
  useEffect(() => {
    if (!id) {
      navigate("/");
    }
  }, [id]);

  // Dohvatanje podataka (postovi i podaci o korisniku)
  useEffect(() => {
    console.log("Fetching data for ID:", id, "Role:", role); // Debagovanje
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
        console.log(userResponse.data, "informations of <users>");
        setData(imagesResponse.data);
        setUserInfo(userResponse.data);
        setLoading(false);
      } catch (error) {
        console.error(
          "Error fetching data:",
          error.message,
          error.response?.data
        );
        setError("Greška prilikom preuzimanja podataka.");
        setLoading(false);
      }
    };
    fetchData();
  }, [id, role]);

  if (loading) return <p>Učitavanje...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="pcelar-posts">
      <h1>Postovi pčelara {userInfo?.name || "Nepoznat pčelar"}</h1>
      {userInfo && (
        <div className="beekeeper-info">
          <img
            src={userInfo.profile_image || "/default-image.jpg"}
            alt="Profile"
            className="profile-image"
          />
          <p>Opis: {userInfo.description || "Nije dostupno"}</p>
          <p>Iskustvo: {userInfo.experience || "Nije dostupno"}</p>
        </div>
      )}
      {data.length === 0 ? (
        <p>Nema postova za ovog pčelara.</p>
      ) : (
        data.map((post, index) => (
          <div key={index} className="post-card">
            <img
              src={post.url}
              alt={`Slika ${index + 1}`}
              className="post-image"
            />
            <div className="post-content">
              <h2>Post {index + 1}</h2>
              <p>Opis nije dostupan.</p>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default PcelarsPosts;
