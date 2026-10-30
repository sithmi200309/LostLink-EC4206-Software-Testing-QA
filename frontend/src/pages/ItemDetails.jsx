import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";


function ItemDetails() {
  const { id } = useParams();

  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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

            <p>
              {error || "We couldn't find this item."}
            </p>

            <Link to="/browse" className="details-back-link">
              ← Back to Browse Items
            </Link>
          </div>
        </div>
      </main>
    );
  }


  // Format the report date for display.
 const formattedDate = new Date(item.date).toLocaleDateString(
  "en-GB",
  {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }
);

  // Use a simple fallback if a description is missing.
  const description =
    item.description || "No description has been provided for this item.";

  return (
    <main className="details-page">
      <div className="details-container">
        {/* Back navigation */}
        <Link to="/browse" className="details-back-link">
          ← Back to Browse Items
        </Link>

        <div className="details-layout">
          {/* LEFT COLUMN: Image and item information */}
          <section className="details-main">
            {/* Item image placeholder */}
            <div
              className={`details-image ${item.color || "blue"}`}
              role="img"
              aria-label={`Illustration of ${item.name}`}
            >
              <span aria-hidden="true">
                {item.icon || "📦"}
              </span>
            </div>

            {/* Item information card */}
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

              {/* Location and date */}
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

              {/* Description */}
              <div className="details-description">
                <h2>About This Item</h2>

                <p>{description}</p>
              </div>

              {/* Privacy notice */}
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

          {/* RIGHT COLUMN: Safety and helpful information */}
          <aside className="details-sidebar">
            {/* Contact information */}
            <section className="details-side-card">
              <h2>Think this is yours?</h2>

              <p>
                Recognise this item? Follow the university's
                approved process to confirm ownership and
                arrange its return.
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

              <Link
                to="/login"
                className="details-contact-button"
              >
                Sign in to continue
              </Link>

              <p className="details-private-note">
                Please sign in before accessing any
                account-specific features. Personal contact
                details should not be displayed publicly.
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

            {/* Secondary report button */}
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