
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { useAuth } from "../context/AuthContext";

// Keep these image URLs consistent with BrowseItems.jsx
export const categoryImages = {
  Bags:
    "https://images.unsplash.com/photo-1642375352634-ad952121fdb3?auto=format&fit=crop&w=1000&q=85",

  Electronics:
    "https://images.unsplash.com/photo-1661961110144-12ac85918e40?auto=format&fit=crop&w=1000&q=85",

  "Personal Items":
    "https://images.unsplash.com/photo-1755719401551-9e2b4be00555?auto=format&fit=crop&w=1000&q=85",

  Documents:
    "https://images.unsplash.com/photo-1517673132405-a56a62b18caf?auto=format&fit=crop&w=1000&q=85",

  Stationery:
    "https://images.unsplash.com/photo-1726726192241-a36ce220c2b3?auto=format&fit=crop&w=1000&q=85",

  Accessories:
    "https://images.unsplash.com/photo-1770331168808-18b4ec8643f7?auto=format&fit=crop&w=1000&q=85",

  Clothing:
    "https://images.unsplash.com/photo-1777394615575-ec1da2f97c31?auto=format&fit=crop&w=1000&q=85",

  Other:
    "https://images.unsplash.com/photo-1755719401551-9e2b4be00555?auto=format&fit=crop&w=1000&q=85",
};

function ItemDetails() {
  const { id } = useParams();
  const { isAuthenticated, user, token } = useAuth();

  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Contact form states
  const [showContactForm, setShowContactForm] = useState(false);
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [contactError, setContactError] = useState("");
  const [contactSuccess, setContactSuccess] = useState("");

  useEffect(() => {
    async function fetchItem() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `http://localhost:5000/api/items/${id}`
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || "Unable to load item details."
          );
        }

        setItem(data.item);
      } catch (err) {
        setError(
          err.message === "Failed to fetch"
            ? "Cannot connect to the server. Please check that the backend is running."
            : err.message
        );
      } finally {
        setLoading(false);
      }
    }

    fetchItem();
  }, [id]);

  // Send contact request
  const handleContactSubmit = async (e) => {
    e.preventDefault();

    setContactError("");
    setContactSuccess("");

    if (message.trim().length < 10) {
      setContactError(
        "Please enter a message with at least 10 characters."
      );
      return;
    }

    try {
      setSending(true);

      const response = await fetch(
        "http://localhost:5000/api/contact",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            itemId: item._id,
            message: message.trim(),
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Unable to send contact request."
        );
      }

      setContactSuccess(
        "Your contact request has been sent successfully!"
      );

      setMessage("");
      setShowContactForm(false);
    } catch (err) {
      setContactError(err.message);
    } finally {
      setSending(false);
    }
  };

  if (loading) {
    return (
      <main className="details-page">
        <div className="details-container">
          <p>Loading item details...</p>
        </div>
      </main>
    );
  }

  if (error || !item) {
    return (
      <main className="details-page">
        <div className="details-container">
          <div className="details-unavailable">
            <h1>Item details unavailable</h1>
            <p>{error || "We couldn't find this item."}</p>

            <Link to="/browse" className="details-back-link">
              ← Back to Browse Items
            </Link>
          </div>
        </div>
      </main>
    );
  }

  // Check whether the logged-in user reported this item
  const itemOwnerId = item.createdBy?._id || item.createdBy;
  const currentUserId = user?.id || user?._id;

  const isOwner =
    isAuthenticated &&
    String(itemOwnerId) === String(currentUserId);

  // Get the representative image for this item's category
  const suggestedImage =
    categoryImages[item.category] || categoryImages.Other;

  // Format the report date
  const formattedDate = new Date(item.date).toLocaleDateString(
    "en-GB",
    {
      day: "numeric",
      month: "long",
      year: "numeric",
      timeZone: "UTC",
    }
  );

  const description =
    item.description ||
    "No description has been provided for this item.";

  // Button wording based on item status
  const contactButtonText =
    item.status === "Found"
      ? "Contact Finder"
      : "Contact Reporter";

  return (
    <main className="details-page">
      <div className="details-container">

        {/* Back navigation */}
        <Link to="/browse" className="details-back-link">
          ← Back to Browse Items
        </Link>

        <div className="details-layout">

          {/* LEFT COLUMN */}
          <section className="details-main">

            {/* Suggested category image */}
            <div className="details-image details-category-image">
              <img
                src={suggestedImage}
                alt={`Representative image for ${item.category}`}
                onError={(event) => {
                  event.currentTarget.style.display = "none";
                }}
              />
            </div>

            <article className="details-card">

              <div className="details-labels">
                <span
                  className={
                    item.status === "Lost"
                      ? "item-status lost"
                      : "item-status found"
                  }
                >
                  {item.status}
                </span>

                <span className="details-category">
                  {item.category}
                </span>
              </div>

              <h1>{item.name}</h1>

              <div className="details-information">
                <p>
                  <strong>Location</strong>
                  <span>⌖ {item.location}</span>
                </p>

                <p>
                  <strong>Date reported</strong>
                  <span>{formattedDate}</span>
                </p>
              </div>

              <div className="details-description">
                <h2>About This Item</h2>
                <p>{description}</p>
              </div>

              <div className="details-notice">
                <strong>
                  Help reunite this item with its owner
                </strong>

                <p>
                  If you recognise this item, please follow
                  the university's approved lost-and-found
                  process. Avoid sharing passwords, student
                  ID numbers, or other sensitive information.
                </p>
              </div>

              <Link
                to="/report"
                className="details-report-button"
              >
                Report an Item
              </Link>

            </article>
          </section>

          {/* RIGHT COLUMN */}
          <aside className="details-sidebar">

            {/* Contact section */}
            <section className="details-side-card">

              <h2>
                {item.status === "Found"
                  ? "Think this is yours?"
                  : "Found this item?"}
              </h2>

              <p>
                {item.status === "Found"
                  ? "Recognise this item? Contact the person who found it to arrange its return."
                  : "Have you found this missing item? Contact the person who reported it."}
              </p>

              <div className="details-owner">
                <div
                  className="details-owner-avatar"
                  aria-hidden="true"
                >
                  LL
                </div>

                <div>
                  <strong>LostLink Community</strong>
                  <small>ABCD University</small>
                </div>
              </div>

              <div className="details-safety-label">
                <span aria-hidden="true">✓</span>
                <span>
                  Arrange collection through a safe,
                  approved university location.
                </span>
              </div>

              {/* Logged-in user viewing their own item */}
              {isOwner ? (
                <div className="details-private-note">
                  This is your own report. You can manage it
                  through My Reports.
                  <br />
                  <Link to="/my-reports">
                    Go to My Reports
                  </Link>
                </div>
              ) : !isAuthenticated ? (

                /* Logged-out user */
                <>
                  <Link
                    to="/login"
                    className="details-contact-button"
                  >
                    Sign in to contact the reporter
                  </Link>

                  <p className="details-private-note">
                    Please sign in to send a contact request.
                  </p>
                </>

              ) : (

                /* Logged-in user viewing another user's item */
                <>
                  {!showContactForm && !contactSuccess && (
                    <button
                      type="button"
                      className="details-contact-button"
                      onClick={() => {
                        setShowContactForm(true);
                        setContactError("");
                      }}
                    >
                      {contactButtonText}
                    </button>
                  )}

                  {showContactForm && (
                    <form
                      className="contact-request-form"
                      onSubmit={handleContactSubmit}
                    >
                      <h3>Send a Contact Request</h3>

                      <p>
                        Introduce yourself and explain why
                        you are contacting the reporter.
                      </p>

                      <label htmlFor="contactMessage">
                        Your Message
                      </label>

                      <textarea
                        id="contactMessage"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Write your message here..."
                        rows="5"
                        minLength="10"
                        maxLength="1000"
                        required
                      />

                      <small>
                        {message.length}/1000 characters
                      </small>

                      {contactError && (
                        <p className="contact-error">
                          {contactError}
                        </p>
                      )}

                      <button
                        type="submit"
                        className="details-contact-button"
                        disabled={sending}
                      >
                        {sending
                          ? "Sending..."
                          : "Send Contact Request"}
                      </button>

                      <button
                        type="button"
                        className="contact-cancel-button"
                        onClick={() => {
                          setShowContactForm(false);
                          setContactError("");
                        }}
                        disabled={sending}
                      >
                        Cancel
                      </button>
                    </form>
                  )}

                  {contactError && !showContactForm && (
                    <p className="contact-error">
                      {contactError}
                    </p>
                  )}

                  {contactSuccess && (
                    <div className="contact-success">
                      <strong>✓ Request Sent!</strong>
                      <p>{contactSuccess}</p>
                    </div>
                  )}
                </>
              )}

              <p className="details-private-note">
                Personal contact details should not be
                displayed publicly. Use the approved
                university process to arrange collection.
              </p>

            </section>

            {/* Collection guidance */}
            <section className="details-side-card">

              <h2 className="details-location-heading">
                <span aria-hidden="true">⌖</span>
                Safe Collection
              </h2>

              <p>
                Use an approved ABCD University location
                when arranging the return of an item.
              </p>

              <h3>Before you collect</h3>

              <ol className="details-collection-list">
                <li>
                  Confirm ownership with the appropriate
                  university representative.
                </li>

                <li>
                  Arrange collection at a staffed campus
                  location.
                </li>

                <li>
                  Update the report once the item has
                  been returned.
                </li>
              </ol>

            </section>

            {/* Helpful reminder */}
            <section className="details-search-card">
              <strong>Still searching?</strong>

              <p>
                Can't find your belongings? Create a lost
                item report so the university community
                knows what to look for.
              </p>
            </section>

            <Link
              to="/report"
              className="details-sidebar-report"
            >
              Report a Lost Item
            </Link>

          </aside>
        </div>
      </div>
    </main>
  );
}

export default ItemDetails;
