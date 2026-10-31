
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { useAuth } from "../context/AuthContext";

const categories = [
  "Bags",
  "Electronics",
  "Personal Items",
  "Documents",
  "Stationery",
  "Accessories",
  "Clothing",
  "Other",
];

function getTodayDate() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function EditItem() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token, isAuthenticated, user } = useAuth();

  const [formData, setFormData] = useState({
    status: "Lost",
    name: "",
    category: "",
    location: "",
    date: "",
    description: "",
  });

  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  // Load existing item details
  useEffect(() => {
    async function fetchItem() {
      if (!isAuthenticated || !token) {
        navigate("/login");
        return;
      }

      try {
        const response = await fetch(
          `http://localhost:5000/api/items/${id}`
        );

        const data = await response.json().catch(() => ({}));

        if (!response.ok) {
          throw new Error(
            data.message || "Unable to load item."
          );
        }

        const item = data.item;

        if (!item) {
          throw new Error("Item not found.");
        }

        // Check item ownership
        const ownerId = item.createdBy?._id || item.createdBy;
        const currentUserId = user?.id || user?._id;

        if (String(ownerId) !== String(currentUserId)) {
          setMessage(
            "You do not have permission to edit this item."
          );
          return;
        }

        setFormData({
          status: item.status,
          name: item.name,
          category: item.category,
          location: item.location,
          date: item.date ? item.date.slice(0, 10) : "",
          description: item.description,
        });
      } catch (error) {
        setMessage(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchItem();
  }, [id, token, isAuthenticated, navigate, user]);

  // Handle form changes
  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));

    setMessage("");
    setIsSuccess(false);
  }

  // Validate form before submitting
  function validateForm() {
    const name = formData.name.trim();
    const location = formData.location.trim();
    const description = formData.description.trim();

    if (!["Lost", "Found"].includes(formData.status)) {
      return "Please select a valid item status.";
    }

    if (name.length < 2 || name.length > 100) {
      return "Item name must contain between 2 and 100 characters.";
    }

    if (!categories.includes(formData.category)) {
      return "Please select a valid item category.";
    }

    if (!location || location.length > 150) {
      return "Location is required and must not exceed 150 characters.";
    }

    if (!formData.date) {
      return "Please select the date.";
    }

    if (formData.date > getTodayDate()) {
      return "The date cannot be in the future.";
    }

    if (description.length < 10 || description.length > 1000) {
      return "Description must contain between 10 and 1000 characters.";
    }

    return null;
  }

  // Submit updated item
  async function handleSubmit(event) {
    event.preventDefault();

    if (isSubmitting) return;

    setMessage("");
    setIsSuccess(false);

    if (!isAuthenticated || !token) {
      setMessage("Please sign in before editing this item.");
      return;
    }

    const validationError = validateForm();

    if (validationError) {
      setMessage(validationError);
      return;
    }

    const cleanedData = {
      status: formData.status,
      name: formData.name.trim(),
      category: formData.category,
      location: formData.location.trim(),
      date: formData.date,
      description: formData.description.trim(),
    };

    try {
      setIsSubmitting(true);

      const response = await fetch(
        `http://localhost:5000/api/items/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(cleanedData),
        }
      );

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(
          data.errors?.join(" ") ||
          data.message ||
          "Failed to update item."
        );
      }

      setIsSuccess(true);
      setMessage("Your item has been updated successfully!");

      setTimeout(() => {
        navigate("/browse");
      }, 1000);

    } catch (error) {
      setMessage(
        error.message || "Unable to connect to the server."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  if (loading) {
    return (
      <main className="report-page">
        <div className="report-container">
          <p>Loading item details...</p>
        </div>
      </main>
    );
  }

  if (message && !formData.name) {
    return (
      <main className="report-page">
        <div className="report-container">
          <h2>Unable to edit item</h2>
          <p role="alert">{message}</p>
          <Link to="/browse">Back to Browse Items</Link>
        </div>
      </main>
    );
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

          <h1>Edit Item</h1>

          <p>
            Update the information about your lost or found item.
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

                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
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
                  max={getTodayDate()}
                  required
                />
              </label>

              <label className="report-field full-width">
                <span>Description *</span>

                <textarea
                  name="description"
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
                Your updated information will be saved in LostLink.
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
                disabled={isSubmitting}
              >
                {isSubmitting ? "Saving..." : "Save Changes →"}
              </button>

              <Link
                to="/browse"
                className="report-cancel-link"
              >
                Cancel
              </Link>
            </div>

          </form>
        </section>
      </div>
    </main>
  );
}

export default EditItem;
