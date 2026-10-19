import { useState } from "react";
import { Link } from "react-router";

function Register() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
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

    if (
      !formData.fullName.trim() ||
      !formData.email.trim() ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      setError("Please fill in all fields.");
      return;
    }

    if (formData.password.length < 8) {
      setError("Password must contain at least 8 characters.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setError("");

    setSuccess(
      "Form validation successful! Account creation will be connected to the backend next."
    );

    console.log("Registration form validated:", {
      fullName: formData.fullName,
      email: formData.email,
    });
  }

  return (
    <main className="register-page">
      <div className="register-shell">

        {/* Left welcome panel — shared with the Login design */}
        <section className="register-welcome">
          <div className="register-welcome-content">
            <p className="register-welcome-eyebrow">
              <span aria-hidden="true">∞</span>
              LOST THINGS. FOUND CONNECTIONS.
            </p>

            <h1>
              Your campus.
              <br />
              Your community.
              <br />A little less lost.
            </h1>

            <p className="register-welcome-description">
              A shared place for the ABCD University community
              to find lost belongings and help reunite people
              with the things that matter.
            </p>

            <div className="register-welcome-feature">
              <span aria-hidden="true">✓</span>
              A community that looks out for one another
            </div>
          </div>

          <div className="register-campus-image">
            <img
              src="https://images.unsplash.com/photo-1562774053-701939374585?w=1200&auto=format&fit=crop"
              alt="University campus building"
            />

            <div className="register-campus-caption">
              <strong>
                Looking out for each other, one item at a time.
              </strong>
              <span>The ABCD Community</span>
            </div>
          </div>
        </section>

        {/* Right registration form */}
        <section className="register-form-panel">
          <div className="register-form-inner">

            <Link to="/" className="register-brand">
              <span className="logo-icon" aria-hidden="true">
                ∞
              </span>
              <span>LostLink</span>
            </Link>

            <div className="register-heading">
              <span className="register-eyebrow">
                YOU BELONG HERE
              </span>

              <h2>Join your campus community.</h2>

              <p>
                Create your account to report items, reconnect
                with finders, and manage your reports.
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

            <form
              className="register-form"
              onSubmit={handleSubmit}
            >
              <div className="auth-field">
                <label htmlFor="fullName">
                  Full name <span>*</span>
                </label>

                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  placeholder="Enter your full name"
                  value={formData.fullName}
                  onChange={handleChange}
                  autoComplete="name"
                  required
                />
              </div>

              <div className="auth-field">
                <label htmlFor="email">
                  Email address <span>*</span>
                </label>

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

                <small className="register-field-hint">
                  Use an email address you can access.
                </small>
              </div>

              <div className="auth-field">
                <label htmlFor="password">
                  Password <span>*</span>
                </label>

                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="At least 8 characters"
                  value={formData.password}
                  onChange={handleChange}
                  autoComplete="new-password"
                  minLength={8}
                  required
                />

                <small className="register-field-hint">
                  Use at least 8 characters.
                </small>
              </div>

              <div className="auth-field">
                <label htmlFor="confirmPassword">
                  Confirm password <span>*</span>
                </label>

                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  placeholder="Enter your password again"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  autoComplete="new-password"
                  required
                />
              </div>

              <button
                type="submit"
                className="register-submit-button"
              >
                <span aria-hidden="true">→</span>
                Create account
              </button>
            </form>

            <p className="register-login-link">
              Already have an account?{" "}
              <Link to="/login">Sign in</Link>
            </p>

            

          </div>
        </section>
      </div>

      <footer className="register-page-footer">
        <span>© 2026 LostLink · ABCD University</span>
        <span>Campus lost and found</span>
      </footer>
    </main>
  );
}

export default Register;