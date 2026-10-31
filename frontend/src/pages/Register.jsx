
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";

function Register() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));

    setError("");
    setSuccess("");
  }

  function validateForm() {
    const fullName = formData.fullName.trim();
    const email = formData.email.trim();

    if (!fullName || !email || !formData.password || !formData.confirmPassword) {
      return "Please fill in all fields.";
    }

    if (fullName.length < 2 || fullName.length > 100) {
      return "Full name must contain between 2 and 100 characters.";
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email.length > 254 || !emailPattern.test(email)) {
      return "Please enter a valid email address.";
    }

    if (formData.password.length < 8) {
      return "Password must contain at least 8 characters.";
    }

    if (formData.password.length > 72) {
      return "Password cannot exceed 72 characters.";
    }

    if (formData.password !== formData.confirmPassword) {
      return "Passwords do not match.";
    }

    return null;
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (isSubmitting) return;

    setError("");
    setSuccess("");

    const validationError = validateForm();

    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setIsSubmitting(true);

      const response = await fetch(
        "http://localhost:5000/api/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            fullName: formData.fullName.trim(),
            email: formData.email.trim().toLowerCase(),
            password: formData.password,
            confirmPassword: formData.confirmPassword,
          }),
        }
      );

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(data.message || "Registration failed.");
      }

      login({
        user: data.user,
        token: data.token,
      });

      setSuccess(
        `Account created successfully! Welcome, ${data.user.fullName}!`
      );

      setFormData({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
      });

      navigate("/");
    } catch (error) {
      setError(
        error.message === "Failed to fetch"
          ? "Cannot connect to the server. Please check that the backend is running."
          : error.message
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="register-page">
      <div className="register-shell">
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
              <div className="auth-message auth-success" role="status">
                {success}
              </div>
            )}

            <form className="register-form" onSubmit={handleSubmit}>
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
                  minLength={2}
                  maxLength={100}
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
                  maxLength={254}
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
                  maxLength={72}
                  required
                />

                <small className="register-field-hint">
                  Use 8–72 characters.
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
                disabled={isSubmitting}
              >
                <span aria-hidden="true">→</span>
                {isSubmitting ? "Creating account..." : "Create account"}
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
