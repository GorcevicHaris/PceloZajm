import React, { useEffect, useState } from "react";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import axios from "axios";
import "./Statistics.css";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const Statistics = () => {
  const [beekeepers, setBeekeepers] = useState([]);
  const [experienceData, setExperienceData] = useState([]);
  const [topExperienceBeekeepers, setTopExperienceBeekeepers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [likesResponse, experienceResponse, topExperienceResponse] =
          await Promise.all([
            axios.get("http://localhost:4005/api/beekeeperStats"),
            axios.get("http://localhost:4005/api/beekeeperExperienceStats"),
            axios.get("http://localhost:4005/api/topBeekeepersByExperience"),
          ]);
        setBeekeepers(likesResponse.data);
        setExperienceData(experienceResponse.data);
        setTopExperienceBeekeepers(topExperienceResponse.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching stats:", err);
        setError("Učitavanje statistike nije uspelo");
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Pie Chart: Top 5 Beekeepers by Likes
  const pieData = {
    labels: beekeepers.slice(0, 5).map((beekeeper) => beekeeper.name),
    datasets: [
      {
        label: "Distribucija Lajkova",
        data: beekeepers.slice(0, 5).map((beekeeper) => beekeeper.likes || 0),
        backgroundColor: [
          "rgba(255, 215, 0, 0.9)", // Vibrant yellow
          "rgba(255, 165, 0, 0.9)", // Bright orange
          "rgba(255, 140, 0, 0.9)", // Deep orange
          "rgba(255, 99, 71, 0.9)", // Vivid coral
          "rgba(255, 69, 0, 0.9)", // Bold red-orange
        ],
        borderColor: ["#fff"],
        borderWidth: 2,
      },
    ],
  };

  // Horizontal Bar Chart: Beekeeper Experience Distribution
  const experienceBarData = {
    labels: experienceData.map((item) => {
      // Translate experience ranges to Serbian
      const range = item.experience_range;
      if (range === "0-2 years") return "0-2 godine";
      if (range === "3-5 years") return "3-5 godina";
      if (range === "6-10 years") return "6-10 godina";
      if (range === "10+ years") return "10+ godina";
      return range; // Default fallback
    }),
    datasets: [
      {
        label: "Broj Pčelara",
        data: experienceData.map((item) => item.beekeeper_count),
        backgroundColor: [
          "rgba(255, 223, 0, 0.9)", // Vibrant golden yellow
          "rgba(255, 191, 0, 0.9)", // Bright amber
          "rgba(255, 159, 64, 0.9)", // Vivid orange
          "rgba(255, 127, 80, 0.9)", // Bold coral
        ].slice(0, experienceData.length),
        borderColor: [
          "rgba(255, 223, 0, 1)",
          "rgba(255, 191, 0, 1)",
          "rgba(255, 159, 64, 1)",
          "rgba(255, 127, 80, 1)",
        ].slice(0, experienceData.length),
        borderWidth: 2,
      },
    ],
  };

  // Vertical Bar Chart: Top Beekeepers by Experience
  const topExperienceBarData = {
    labels: topExperienceBeekeepers.map((beekeeper) => beekeeper.name),
    datasets: [
      {
        label: "Godine Iskustva",
        data: topExperienceBeekeepers.map(
          (beekeeper) => beekeeper.expirience || 0
        ),
        backgroundColor: "rgba(218, 165, 32, 0.9)", // Bold goldenrod
        borderColor: "rgba(218, 165, 32, 1)",
        borderWidth: 2,
      },
    ],
  };

  const pieOptions = {
    responsive: true,
    animation: {
      animateScale: true,
      animateRotate: true,
      duration: 1000,
    },
    plugins: {
      legend: {
        position: "right",
        labels: { font: { size: 16, family: "'Georgia', serif" } },
      },
      title: {
        display: true,
        text: "Top 5 Pčelara po Lajkovima",
        font: { size: 20, family: "'Georgia', serif", weight: "bold" },
        color: "#3c2f2f",
      },
      tooltip: { bodyFont: { size: 14 } },
    },
  };

  const experienceBarOptions = {
    indexAxis: "y",
    responsive: true,
    animation: {
      duration: 1000,
      easing: "easeOutBounce",
    },
    plugins: {
      legend: {
        position: "top",
        labels: { font: { size: 16, family: "'Georgia', serif" } },
      },
      title: {
        display: true,
        text: "Distribucija Iskustva Pčelara",
        font: { size: 20, family: "'Georgia', serif", weight: "bold" },
        color: "#3c2f2f",
      },
      tooltip: { bodyFont: { size: 14 } },
    },
    scales: {
      x: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Broj Pčelara",
          font: { size: 16, family: "'Georgia', serif" },
        },
        ticks: { stepSize: 1, font: { size: 14 } },
      },
      y: {
        title: {
          display: true,
          text: "Raspon Iskustva",
          font: { size: 16, family: "'Georgia', serif" },
        },
        ticks: { font: { size: 14 } },
      },
    },
  };

  const topExperienceBarOptions = {
    responsive: true,
    animation: {
      duration: 1000,
      easing: "easeOutBounce",
    },
    plugins: {
      legend: {
        position: "top",
        labels: { font: { size: 16, family: "'Georgia', serif" } },
      },
      title: {
        display: true,
        text: "Pčelari sa Najviše Iskustva",
        font: { size: 20, family: "'Georgia', serif", weight: "bold" },
        color: "#3c2f2f",
      },
      tooltip: { bodyFont: { size: 14 } },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Godine Iskustva",
          font: { size: 16, family: "'Georgia', serif" },
        },
        ticks: { stepSize: 1, font: { size: 14 } },
      },
      x: {
        title: {
          display: true,
          text: "Pčelari",
          font: { size: 16, family: "'Georgia', serif" },
        },
        ticks: { font: { size: 14 } },
      },
    },
  };

  if (loading) return <div className="loading">Učitavanje statistike...</div>;
  if (error) return <div className="error">{error}</div>;
  if (
    beekeepers.length === 0 &&
    experienceData.length === 0 &&
    topExperienceBeekeepers.length === 0
  )
    return <div className="no-data">Nema dostupnih podataka o pčelarima.</div>;

  return (
    <div className="statistics-container">
      <h2>Statistika Pčelara</h2>
      <div className="chart-container">
        <div className="chart">
          <Pie data={pieData} options={pieOptions} />
        </div>
        <div className="chart chart-large">
          <Bar data={experienceBarData} options={experienceBarOptions} />
        </div>
        <div className="chart">
          <Bar data={topExperienceBarData} options={topExperienceBarOptions} />
        </div>
      </div>
    </div>
  );
};

export default Statistics;
