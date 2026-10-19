import { useState } from "react";
import { Link } from "react-router";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));

    setError("");
    setSuccess("");
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!formData.email.trim() || !formData.password) {
      setError("Please enter your email address and password.");
      return;
    }

    setError("");

    setSuccess(
      "Form validation successful! Login will be connected to the backend next."
    );

    console.log("Login form submitted:", {
      email: formData.email,
    });
  }

  return (
    <main className="login-page">
      <div className="login-shell">
        <section className="login-welcome">
          <div className="welcome-content">
            <p className="welcome-eyebrow">
              <span aria-hidden="true">∞</span>
              LOST THINGS. FOUND CONNECTIONS.
            </p>

            <h1>
              Your campus.
              <br />
              Your community.
              <br />A little less lost.
            </h1>

            <p className="welcome-description">
              A shared place for the ABCD University community
              to find lost belongings and help reunite people
              with the things that matter.
            </p>

            <div className="welcome-feature">
              <span aria-hidden="true">✓</span>
              A community that looks out for one another
            </div>
          </div>

          <div className="campus-image">
            <img
              src="https://images.unsplash.com/photo-1562774053-701939374585?w=1200"
              alt="University campus building"
            />

            <div className="campus-image-caption">
              <strong>Looking out for each other, one item at a time.</strong>
              <span>The ABCD Community</span>
            </div>
          </div>
        </section>

        <section className="login-form-panel">
          <div className="login-form-inner">
            <Link to="/" className="login-brand">
              <span className="logo-icon" aria-hidden="true">
                ∞
              </span>
              <span>LostLink</span>
            </Link>

            <div className="login-heading">
              <span className="login-eyebrow">
                WELCOME BACK TO LOSTLINK
              </span>

              <h2>Let's pick up where you left off.</h2>

              <p>
                Sign in to manage your reports and reconnect
                with your belongings.
              </p>
            </div>

            {error && (
              <div className="auth-message auth-error" role="alert">
                {error}
              </div>
            )}

            {success && (
              <div
                className="auth-message auth-success"
                role="status"
              >
                {success}
              </div>
            )}

            <form className="login-form" onSubmit={handleSubmit}>
              <div className="auth-field">
                <label htmlFor="email">Email address</label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  autoComplete="email"
                  required
                />
              </div>

              <div className="auth-field">
                <label htmlFor="password">Password</label>

                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  autoComplete="current-password"
                  required
                />
              </div>

              <button
                type="submit"
                className="login-submit-button"
              >
                <span aria-hidden="true">→</span>
                Sign in
              </button>
            </form>

            <p className="login-register-link">
              New to LostLink?{" "}
              <Link to="/register">Create an account</Link>
            </p>

            
          </div>
        </section>
      </div>

      <footer className="login-page-footer">
        <span>© 2026 LostLink · ABCD University</span>

        <span className="footer-links">
          Campus lost and found
        </span>
      </footer>
    </main>
  );
}

export default Login;