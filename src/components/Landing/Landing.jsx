import "./landing.css";

function App() {
  const beekeepers = [
    {
      id: 1,
      name: "Marko Marković",
      image: "logo512.png",
    },
    {
      id: 2,
      name: "Ana Anić",
      image:
        "https://images.unsplash.com/photo-1587773403675-ba676c058e8c?w=500&auto=format",
    },
    {
      id: 3,
      name: "Petar Petrović",
      image:
        "https://images.unsplash.com/photo-1583845112239-97ef2b576b82?w=500&auto=format",
    },
    {
      id: 4,
      name: "Jovana Jovanović",
      image:
        "https://images.unsplash.com/photo-1544634076-a90160ddf44d?w=500&auto=format",
    },
  ];

  return (
    <div className="landing-container">
      <header className="header">
        <h1>Dobrodošli u Svet Pčelara</h1>
        <p>Upoznajte naše iskusne pčelare i njihove proizvode</p>
      </header>

      <div className="beekeepers-grid">
        {beekeepers.map((beekeeper) => (
          <div key={beekeeper.id} className="beekeeper-card">
            <img
              src={beekeeper.image}
              alt={beekeeper.name}
              className="beekeeper-image"
            />
            <div className="beekeeper-info">
              <h2 className="beekeeper-name">{beekeeper.name}</h2>
              <button className="view-button">Pregledaj</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
