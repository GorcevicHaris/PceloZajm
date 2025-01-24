import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./pcelarposts.css";
import { Context } from "../Context";

function PcelarsPosts() {
  const { id } = useParams(); // Preuzimanje ID-a iz URL-a
  const { userId, role } = useContext(Context);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  let auth = document.cookie;
  useEffect(() => {
    if (!id) {
      navigate(`/`);
    }
  }, []);
  useEffect(() => {
    if (id) {
      // API poziv sa query parametrom user_id
      axios
        .get(`http://localhost:4005/api/getImages`, {
          params: { user_id: id },
        })
        .then((res) => {
          console.log(res.data, "mis mis mis");
          setData(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setError("Greška prilikom preuzimanja podataka.");
          setLoading(false);
        });
    }
  }, [id]);
  console.log(data[0]?.name, "pregled");
  if (loading) return <p>Učitavanje...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="pcelar-posts">
      <h1>Postovi pčelara {data[0]?.name}</h1>
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
              <h2>Post {index + 1}</h2> {/* Dodajte prilagođeni naslov */}
              <p>Opis nije dostupan.</p>{" "}
              {/* Ako `post.description` ne postoji */}
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default PcelarsPosts;
