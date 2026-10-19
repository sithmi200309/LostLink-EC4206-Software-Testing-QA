function Home() {
  return (
    <main className="home-page">

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <p className="hero-label">
            ABCD UNIVERSITY • LOST & FOUND
          </p>

          <h1>
            Lost something?
            <br />
            <span>Let's find it together.</span>
          </h1>

          <p className="hero-description">
            LostLink helps the ABCD University community
            reconnect with lost belongings. Report an item
            or browse items that others have found.
          </p>

          <div className="hero-buttons">
            <a href="/browse" className="primary-button">
              Browse Items →
            </a>

            <a href="/report" className="secondary-button">
              + Report an Item
            </a>
          </div>

          <div className="hero-note">
            A simpler way to find what matters.
          </div>
        </div>

        <div className="hero-visual">
          <div className="visual-circle">
            <div className="search-illustration">
              <span className="search-emoji">🔎</span>
            </div>

            <div className="floating-card floating-card-top">
              <span>🎒</span>
              <div>
                <strong>Lost something?</strong>
                <small>We're here to help.</small>
              </div>
            </div>

            <div className="floating-card floating-card-bottom">
              <span>✨</span>
              <div>
                <strong>Found something?</strong>
                <small>Help it find its owner.</small>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-section">
        <div className="section-heading">
          <p className="section-label">SIMPLE & EASY</p>
          <h2>How LostLink works</h2>
          <p>
            Three simple steps to help lost belongings
            find their way home.
          </p>
        </div>

        <div className="steps-grid">
          <article className="step-card">
            <div className="step-icon">📝</div>
            <h3>1. Report an Item</h3>
            <p>
              Lost something or found an item?
              Submit a report with the relevant details.
            </p>
          </article>

          <article className="step-card">
            <div className="step-icon">🔍</div>
            <h3>2. Browse Items</h3>
            <p>
              Search reported items and look for a
              match with the belongings you're missing.
            </p>
          </article>

          <article className="step-card">
            <div className="step-icon">🤝</div>
            <h3>3. Reconnect</h3>
            <p>
              Follow the appropriate instructions to
              help a lost item return to its owner.
            </p>
          </article>
        </div>
      </section>

      {/* Call to Action */}
      <section className="cta-section">
        <h2>Found something on campus?</h2>

        <p>
          A small act of kindness can make someone's day.
          Help return a lost belonging to its owner.
        </p>

        <a href="/report" className="primary-button">
          Report a Found Item →
        </a>
      </section>

      {/* Footer */}
      <footer className="home-footer">
        <div>
          <strong>LostLink</strong>
          <p>ABCD University Lost & Found Management System</p>
        </div>

        <p>Helping belongings find their way home.</p>
      </footer>

    </main>
  );
}

export default Home;