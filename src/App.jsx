import './App.css';

function App() {
  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <nav className="navbar">
          <div className="logo">AnjoaurA</div>
          <ul className="nav-links">
            <li><a href="#home">Home</a></li>
            <li><a href="#features">Features</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </nav>
      </header>

      {/* Hero Section */}
      <section id="home" className="hero">
        <div className="hero-content">
          <h1>Welcome to AnjoaurA</h1>
          <p>Discover amazing features and services</p>
          <button className="cta-button">Get Started</button>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="features">
        <h2>Features</h2>
        <div className="features-grid">
          <div className="feature-card">
            <h3>Feature 1</h3>
            <p>Description of your first feature</p>
          </div>
          <div className="feature-card">
            <h3>Feature 2</h3>
            <p>Description of your second feature</p>
          </div>
          <div className="feature-card">
            <h3>Feature 3</h3>
            <p>Description of your third feature</p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about">
        <h2>About Us</h2>
        <p>Learn more about AnjoaurA and what we do.</p>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; 2026 AnjoaurA. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;