
import { useState } from "react";
import { Link } from "react-router";
import { useAuth } from "../context/AuthContext";

function ReportItem() {
  const { token, isAuthenticated } = useAuth();

  const [formData, setFormData] = useState({
    status: "Lost",
    name: "",
    category: "",
    location: "",
    date: "",
    description: "",
  });

  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));

    setMessage("");
    setIsSuccess(false);
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setMessage("");
    setIsSuccess(false);

    if (!isAuthenticated || !token) {
      setMessage("Please sign in before submitting a report.");
      return;
    }

    try {
      setIsSubmitting(true);

      const response = await fetch(
        "http://localhost:5000/api/items",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.errors?.join(" ") ||
          data.message ||
          "Failed to submit your report."
        );
      }

      setIsSuccess(true);
      setMessage("Your report has been saved successfully!");

      setFormData({
        status: "Lost",
        name: "",
        category: "",
        location: "",
        date: "",
        description: "",
      });
    } catch (error) {
      setMessage(
        error.message === "Failed to fetch"
          ? "Cannot connect to the server. Please make sure the backend is running."
          : error.message
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="report-page">
      <div className="report-container">
        <Link to="/browse" className="report-back-link">
          ← Back to Browse Items
        </Link>

        <header className="report-header">
          <p className="report-eyebrow">
            ABCD UNIVERSITY · LOST & FOUND
          </p>

          <h1>Report an Item</h1>

          <p>
            Help reunite lost belongings with their owners by sharing
            the details below.
          </p>
        </header>

        <section className="report-card">
          <form onSubmit={handleSubmit}>
            <fieldset className="report-status-field">
              <legend>What would you like to report?</legend>

              <div className="report-status-options">
                <label
                  className={
                    formData.status === "Lost"
                      ? "report-status-option selected"
                      : "report-status-option"
                  }
                >
                  <input
                    type="radio"
                    name="status"
                    value="Lost"
                    checked={formData.status === "Lost"}
                    onChange={handleChange}
                  />

                  <span aria-hidden="true">🔍</span>

                  <span>
                    <strong>Lost Item</strong>
                    <small>I've lost something.</small>
                  </span>
                </label>

                <label
                  className={
                    formData.status === "Found"
                      ? "report-status-option selected"
                      : "report-status-option"
                  }
                >
                  <input
                    type="radio"
                    name="status"
                    value="Found"
                    checked={formData.status === "Found"}
                    onChange={handleChange}
                  />

                  <span aria-hidden="true">🎒</span>

                  <span>
                    <strong>Found Item</strong>
                    <small>I've found something.</small>
                  </span>
                </label>
              </div>
            </fieldset>

            <div className="report-form-grid">
              <label className="report-field">
                <span>Item Name *</span>

                <input
                  type="text"
                  name="name"
                  placeholder="e.g. Black backpack"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  minLength={2}
                  maxLength={100}
                />
              </label>

              <label className="report-field">
                <span>Category *</span>

                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select a category</option>
                  <option value="Bags">Bags</option>
                  <option value="Electronics">Electronics</option>
                  <option value="Personal Items">Personal Items</option>
                  <option value="Documents">Documents</option>
                  <option value="Stationery">Stationery</option>
                  <option value="Accessories">Accessories</option>
                  <option value="Clothing">Clothing</option>
                  <option value="Other">Other</option>
                </select>
              </label>

              <label className="report-field">
                <span>
                  {formData.status === "Lost"
                    ? "Where did you last see it? *"
                    : "Where did you find it? *"}
                </span>

                <input
                  type="text"
                  name="location"
                  placeholder="e.g. University Library"
                  value={formData.location}
                  onChange={handleChange}
                  required
                  maxLength={150}
                />
              </label>

              <label className="report-field">
                <span>
                  {formData.status === "Lost"
                    ? "Date Lost *"
                    : "Date Found *"}
                </span>

                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  max={new Date().toLocaleDateString("en-CA")}
                  required
                />
              </label>

              <label className="report-field full-width">
                <span>Description *</span>

                <textarea
                  name="description"
                  placeholder="Describe the item, where it was lost or found, and any useful identifying details..."
                  value={formData.description}
                  onChange={handleChange}
                  required
                  minLength={10}
                  maxLength={1000}
                  rows={5}
                />

                <small>
                  Avoid including passwords, student ID numbers, or
                  other sensitive personal information.
                </small>
              </label>
            </div>

            <div className="report-form-notice">
              <span aria-hidden="true">🛡️</span>

              <p>
                Your report will be saved securely in LostLink and
                associated with your account.
              </p>
            </div>

            {message && (
              <p
                className={
                  isSuccess
                    ? "report-success-message"
                    : "report-error-message"
                }
                role={isSuccess ? "status" : "alert"}
              >
                {message}
              </p>
            )}

            <div className="report-form-actions">
              <button
                type="submit"
                className="report-submit-button"
                disabled={isSubmitting || !isAuthenticated}
              >
                {isSubmitting ? "Submitting..." : "Submit Report →"}
              </button>

              <Link to="/browse" className="report-cancel-link">
                Cancel
              </Link>
            </div>

            {!isAuthenticated && (
              <p className="report-login-notice">
                Please <Link to="/login">sign in</Link> to submit a report.
              </p>
            )}
          </form>
        </section>
      </div>
    </main>
  );
}

export default ReportItem;
