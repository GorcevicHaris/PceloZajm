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
import "./statistics.css";

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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [likesResponse, experienceResponse] = await Promise.all([
          axios.get("http://localhost:4005/api/beekeeperStats"),
          axios.get("http://localhost:4005/api/beekeeperExperienceStats"),
        ]);
        setBeekeepers(likesResponse.data);
        setExperienceData(experienceResponse.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching stats:", err);
        setError("Failed to load statistics");
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
        label: "Likes Distribution",
        data: beekeepers.slice(0, 5).map((beekeeper) => beekeeper.likes || 0),
        backgroundColor: [
          "rgba(255, 215, 0, 0.8)",
          "rgba(255, 165, 0, 0.8)",
          "rgba(255, 140, 0, 0.8)",
          "rgba(255, 99, 71, 0.8)",
          "rgba(255, 69, 0, 0.8)",
        ],
        borderColor: ["#fff"],
        borderWidth: 1,
      },
    ],
  };

  // Horizontal Bar Chart: Beekeeper Experience Distribution
  const experienceBarData = {
    labels: experienceData.map((item) => item.experience_range),
    datasets: [
      {
        label: "Number of Beekeepers",
        data: experienceData.map((item) => item.beekeeper_count),
        backgroundColor: "rgba(139, 69, 19, 0.6)", // Brown for bee theme
        borderColor: "rgba(139, 69, 19, 1)",
        borderWidth: 1,
      },
    ],
  };

  const pieOptions = {
    responsive: true,
    plugins: {
      legend: { position: "right" },
      title: { display: true, text: "Top 5 Beekeepers by Likes (Pie Chart)" },
    },
  };

  const experienceBarOptions = {
    indexAxis: "y", // Makes the bar chart horizontal
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: {
        display: true,
        text: "Beekeeper Experience Distribution (Horizontal Bar Chart)",
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        title: { display: true, text: "Number of Beekeepers" },
        ticks: { stepSize: 1 }, // Ensure integer ticks
      },
      y: { title: { display: true, text: "Experience Range" } },
    },
  };

  if (loading) return <div>Loading statistics...</div>;
  if (error) return <div>{error}</div>;
  if (beekeepers.length === 0 && experienceData.length === 0)
    return <div>No beekeeper data available.</div>;

  return (
    <div className="statistics-container">
      <h2>Beekeeper Statistics</h2>
      <div className="chart-container">
        <div className="chart">
          <Pie data={pieData} options={pieOptions} />
        </div>
        <div className="chart chart-large">
          <Pie data={experienceBarData} options={experienceBarOptions} />
        </div>
      </div>
    </div>
  );
};

export default Statistics;
