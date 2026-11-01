
import { useEffect, useState } from "react";
import { Link } from "react-router";
import { useAuth } from "../context/AuthContext";

function MyReports() {
  const { token } = useAuth();

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Delete modal states
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState("");

  // Fetch reports belonging to the logged-in user
  useEffect(() => {
    const fetchMyReports = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/items/my-reports",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to load your reports.");
        }

        setItems(data.items);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchMyReports();
    } else {
      setLoading(false);
      setError("Please log in to view your reports.");
    }
  }, [token]);

  // Open delete confirmation modal
  function confirmDelete(itemId) {
    setSelectedItemId(itemId);
    setDeleteError("");
    setShowDeleteModal(true);
  }

  // Close delete confirmation modal
  function closeDeleteModal() {
    if (isDeleting) return;

    setShowDeleteModal(false);
    setSelectedItemId(null);
    setDeleteError("");
  }

  // Delete report from MongoDB
  async function handleDelete() {
    if (!selectedItemId || !token) return;

    try {
      setIsDeleting(true);
      setDeleteError("");

      const response = await fetch(
        `http://localhost:5000/api/items/${selectedItemId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to delete item.");
      }

      // Remove deleted report from the page
      setItems((previousItems) =>
        previousItems.filter(
          (item) => item._id !== selectedItemId
        )
      );

      setShowDeleteModal(false);
      setSelectedItemId(null);
    } catch (err) {
      setDeleteError(err.message);
    } finally {
      setIsDeleting(false);
    }
  }

  // Calculate report statistics
  const lostCount = items.filter(
    (item) => item.status === "Lost"
  ).length;

  const foundCount = items.filter(
    (item) => item.status === "Found"
  ).length;

  if (loading) {
    return (
      <div className="my-reports-page">
        <div className="my-reports-container">
          Loading your reports...
        </div>
      </div>
    );
  }

  return (
    <div className="my-reports-page">
      <div className="my-reports-container">

        {/* Page heading */}
        <div className="my-reports-header">
          <h1>My Reports</h1>
          <p>Manage the items you have reported on LostLink.</p>
        </div>

        {error && (
          <p className="report-error-message">{error}</p>
        )}

        {!error && (
          <>
            {/* Statistics cards */}
            <div className="my-reports-stats">
              <div className="my-report-stat">
                <h3>Total Reports</h3>
                <p>{items.length}</p>
              </div>

              <div className="my-report-stat">
                <h3>Lost Items</h3>
                <p>{lostCount}</p>
              </div>

              <div className="my-report-stat">
                <h3>Found Items</h3>
                <p>{foundCount}</p>
              </div>
            </div>

            {/* Reports list */}
            <div className="my-reports-list">
              {items.length === 0 ? (
                <div className="my-reports-empty">
                  <h2>No reports yet</h2>
                  <p>
                    You haven't reported any lost or found items.
                  </p>
                  <Link to="/report">Report an Item</Link>
                </div>
              ) : (
                items.map((item) => (
                  <div className="my-report-card" key={item._id}>
                    <div className="my-report-card-info">

                      <span
                        className={`my-report-status ${item.status.toLowerCase()}`}
                      >
                        {item.status}
                      </span>

                      <h2>{item.name}</h2>

                      <p>
                        <strong>Category:</strong> {item.category}
                      </p>

                      <p>
                        <strong>Location:</strong> {item.location}
                      </p>

                      <p>
                        <strong>Date:</strong>{" "}
                        {new Date(item.date).toLocaleDateString("en-GB")}
                      </p>
                    </div>

                    {/* Report actions */}
                    <div className="my-report-actions">
                      <Link to={`/items/${item._id}`}>
                        View Details
                      </Link>

                      <Link to={`/items/${item._id}/edit`}>
                        Edit
                      </Link>

                      <button
                        className="delete-item-btn"
                        onClick={() => confirmDelete(item._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </>
        )}
      </div>

      {/* Delete confirmation modal */}
      {showDeleteModal && (
        <div className="delete-modal-overlay">
          <div
            className="delete-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="delete-modal-title"
          >
            <div className="delete-modal-icon">
              🗑️
            </div>

            <h2 id="delete-modal-title">
              Delete this item?
            </h2>

            <p>
              Are you sure you want to delete this report?
              This action cannot be undone.
            </p>

            {deleteError && (
              <p className="delete-modal-error">
                {deleteError}
              </p>
            )}

            <div className="delete-modal-actions">
              <button
                className="cancel-delete-btn"
                onClick={closeDeleteModal}
                disabled={isDeleting}
              >
                Cancel
              </button>

              <button
                className="confirm-delete-btn"
                onClick={handleDelete}
                disabled={isDeleting}
              >
                {isDeleting ? "Deleting..." : "Yes, Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MyReports;
