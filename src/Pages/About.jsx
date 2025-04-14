import { Award, Users, Heart, Leaf, Shield, Sun } from "lucide-react";
import "./about.css";

function About() {
  return (
    <div className="about-page">
      <div className="about-hero">
        <h1>Our Story</h1>
        <p>Dedicated to preserving nature's sweetest treasure since 1995</p>
      </div>

      <div className="about-container">
        <section className="mission-section">
          <div className="mission-content">
            <h2>Our Mission</h2>
            <p>
              At BeeKeepers, we're more than just honey producers – we're
              guardians of a sacred tradition. Our mission is to maintain the
              delicate balance between nature and nurture, ensuring that every
              drop of honey we produce meets the highest standards of quality
              while protecting our precious bee populations.
            </p>

            <div className="values-grid">
              <div className="value-item">
                <Shield className="value-icon" />
                <h3>Quality First</h3>
                <p>Premium honey produced with care and expertise</p>
              </div>
              <div className="value-item">
                <Leaf className="value-icon" />
                <h3>Sustainability</h3>
                <p>Eco-friendly practices in all our operations</p>
              </div>
              <div className="value-item">
                <Heart className="value-icon" />
                <h3>Community</h3>
                <p>Supporting local beekeepers and their families</p>
              </div>
            </div>
          </div>
        </section>

        <section className="story-section">
          <div className="story-image">
            <img
              src="https://images.unsplash.com/photo-1587620962725-abab7fe55159?ixlib=rb-1.2.1&auto=format&fit=crop&q=80&w=1950"
              alt="Beekeeper at work"
            />
          </div>
          <div className="story-content">
            <h2>Our Journey</h2>
            <p>
              Starting with just five hives in 1995, our passion for beekeeping
              has grown into a thriving community of dedicated professionals.
              Today, we manage over 1,000 hives across the region, producing
              some of the finest honey while maintaining the highest standards
              of bee welfare.
            </p>
            <div className="story-stats">
              <div className="stat">
                <span className="stat-number">25+</span>
                <span className="stat-label">Years Experience</span>
              </div>
              <div className="stat">
                <span className="stat-number">1000+</span>
                <span className="stat-label">Active Hives</span>
              </div>
              <div className="stat">
                <span className="stat-number">50+</span>
                <span className="stat-label">Expert Beekeepers</span>
              </div>
            </div>
          </div>
        </section>

        <section className="team-section">
          <h2>Meet Our Experts</h2>
          <div className="team-grid">
            <div className="team-member">
              <img
                src="https://www.radiostoplus.com/wp-content/uploads/2024/03/ucenici-kompanija-tehnicka-skola.jpg"
                alt="Team member"
              />
              <h3>Haris Gorcevic</h3>
              <p className="role">Master Beekeeper</p>
              <p className="description">
                25 years of expertise in sustainable beekeeping practices
              </p>
            </div>
            <div className="team-member">
              <img
                src="https://media.licdn.com/dms/image/v2/D4D22AQGScUNFqDjn-w/feedshare-shrink_800/feedshare-shrink_800/0/1728144905201?e=2147483647&v=beta&t=Ldo4N9owkjTrH2NLb4TSk8ll1gP3B9ZioZlwMBdIsZ0"
                alt="Team member"
              />
              <h3>Erhad Masovic</h3>
              <p className="role">Quality Specialist</p>
              <p className="description">
                Ensures premium honey quality and production standards
              </p>
            </div>
            <div className="team-member">
              <img
                src="https://avatars.githubusercontent.com/u/88393813?v=4"
                alt="Team member"
              />
              <h3>Hamza Gorcevic</h3>
              <p className="role">Hive Manager</p>
              <p className="description">
                Expert in bee health and colony management
              </p>
            </div>
          </div>
        </section>

        <section className="achievements-section">
          <h2>Our Achievements</h2>
          <div className="achievements-grid">
            <div className="achievement-item">
              <Award className="achievement-icon" />
              <h3>Best Honey Producer 2023</h3>
              <p>Recognized for exceptional honey quality</p>
            </div>
            <div className="achievement-item">
              <Users className="achievement-icon" />
              <h3>Community Excellence</h3>
              <p>Leading supporter of local beekeeping initiatives</p>
            </div>
            <div className="achievement-item">
              <Sun className="achievement-icon" />
              <h3>Sustainability Award</h3>
              <p>Recognized for eco-friendly practices</p>
            </div>
          </div>
        </section>

        <section className="commitment-section">
          <div className="commitment-content">
            <h2>Our Commitment to Quality</h2>
            <p>
              Every jar of honey represents our dedication to excellence. We
              maintain strict quality control measures throughout our production
              process, ensuring that you receive only the finest, purest honey
              nature can provide.
            </p>
            <div className="quality-badges">
              <div className="badge">
                <span className="badge-number">100%</span>
                <span className="badge-label">Pure & Natural</span>
              </div>
              <div className="badge">
                <span className="badge-number">0</span>
                <span className="badge-label">Artificial Additives</span>
              </div>
              <div className="badge">
                <span className="badge-number">5★</span>
                <span className="badge-label">Quality Rating</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default About;
