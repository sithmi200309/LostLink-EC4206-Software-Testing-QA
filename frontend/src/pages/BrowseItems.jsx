
import { useEffect, useState } from "react";
import { Link } from "react-router";
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

function BrowseItems() {
  const { user, token, isAuthenticated } = useAuth();

  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [category, setCategory] = useState("All categories");
  const [location, setLocation] = useState("All campus locations");
  const [dateRange, setDateRange] = useState("All dates");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Delete modal states
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState("");

  // Load items from MongoDB
  useEffect(() => {
    async function fetchItems() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          "http://localhost:5000/api/items"
        );

        if (!response.ok) {
          throw new Error("Unable to load items.");
        }

        const data = await response.json();
        setItems(data.items);
      } catch (err) {
        setError(
          "Could not load items. Please check that the backend is running."
        );
      } finally {
        setLoading(false);
      }
    }

    fetchItems();
  }, []);

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

  // Delete item from MongoDB
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
        throw new Error(
          data.message || "Failed to delete item."
        );
      }

      // Remove deleted item from the displayed list
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

  // Reset all filters
  function resetFilters() {
    setSearch("");
    setStatus("All");
    setCategory("All categories");
    setLocation("All campus locations");
    setDateRange("All dates");
  }

  // Format item date
  function formatDate(date) {
    return new Date(date).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  }

  // Get available campus locations
  const campusLocations = [
    ...new Set(items.map((item) => item.location)),
  ];

  // Filter items
  const filteredItems = items.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.location.toLowerCase().includes(search.toLowerCase()) ||
      item.description.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      status === "All" || item.status === status;

    const matchesCategory =
      category === "All categories" ||
      item.category === category;

    const matchesLocation =
      location === "All campus locations" ||
      item.location.toLowerCase().includes(location.toLowerCase());

    const itemDate = new Date(item.date);
    const now = new Date();

    const daysOld =
      (now.getTime() - itemDate.getTime()) /
      (1000 * 60 * 60 * 24);

    const matchesDate =
      dateRange === "All dates" ||
      (dateRange === "Last 7 days" &&
        daysOld >= 0 &&
        daysOld <= 7) ||
      (dateRange === "Last 30 days" &&
        daysOld >= 0 &&
        daysOld <= 30);

    return (
      matchesSearch &&
      matchesStatus &&
      matchesCategory &&
      matchesLocation &&
      matchesDate
    );
  });

  return (
    <main className="browse-page">
      <section className="browse-layout">

        {/* Sidebar filters */}
        <aside className="browse-sidebar">
          <div className="sidebar-heading">
            <h2>Filters</h2>
            <button onClick={resetFilters}>Reset all</button>
          </div>

          <h3>Category</h3>

          <div className="category-options">
            <label>
              <input
                type="radio"
                name="category"
                checked={category === "All categories"}
                onChange={() => setCategory("All categories")}
              />
              All categories
            </label>

            {categories.map((itemCategory) => (
              <label key={itemCategory}>
                <input
                  type="radio"
                  name="category"
                  checked={category === itemCategory}
                  onChange={() => setCategory(itemCategory)}
                />
                {itemCategory}
              </label>
            ))}
          </div>

          <label className="sidebar-field">
            <span>Campus location</span>

            <select
              value={location}
              onChange={(event) =>
                setLocation(event.target.value)
              }
            >
              <option value="All campus locations">
                All campus locations
              </option>

              {campusLocations.map((itemLocation) => (
                <option key={itemLocation} value={itemLocation}>
                  {itemLocation}
                </option>
              ))}
            </select>
          </label>

          <label className="sidebar-field">
            <span>Date reported</span>

            <select
              value={dateRange}
              onChange={(event) =>
                setDateRange(event.target.value)
              }
            >
              <option>All dates</option>
              <option>Last 7 days</option>
              <option>Last 30 days</option>
            </select>
          </label>

          <p className="sidebar-tip">
            Tip: Try nearby buildings too. Items sometimes travel a little.
          </p>
        </aside>

        {/* Main browse section */}
        <section className="browse-main">
          <div className="browse-topbar">
            <div className="status-filters">
              {["All", "Lost", "Found"].map((itemStatus) => (
                <button
                  key={itemStatus}
                  className={
                    status === itemStatus ? "active" : ""
                  }
                  onClick={() => setStatus(itemStatus)}
                >
                  {itemStatus === "All" ? "All items" : itemStatus}
                </button>
              ))}
            </div>

            <input
              className="compact-search"
              type="search"
              placeholder="Search items..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              aria-label="Search items"
            />
          </div>

          <div className="browse-results-heading">
            <p>
              {loading
                ? "Loading items..."
                : `Showing ${filteredItems.length} of ${items.length} items`}
            </p>

            <button onClick={resetFilters}>Clear filters</button>
          </div>

          {/* Loading and error states */}
          {loading ? (
            <div className="empty-results">
              <h3>Loading items...</h3>
              <p>Please wait while we retrieve reports.</p>
            </div>
          ) : error ? (
            <div className="empty-results">
              <h3>Unable to load items</h3>
              <p>{error}</p>
            </div>
          ) : filteredItems.length > 0 ? (
            <div className="items-grid">
              {filteredItems.map((item) => {
                const itemOwnerId =
                  item.createdBy?._id || item.createdBy;

                const isOwner =
                  isAuthenticated &&
                  String(itemOwnerId) === String(user?.id);

                return (
                  <article className="item-card" key={item._id}>
                    <div className="item-photo item-photo-placeholder">
                      <span aria-hidden="true">📦</span>
                    </div>

                    <div className="item-card-content">
                      <div className="item-card-meta">
                        <span
                          className={`item-status ${item.status.toLowerCase()}`}
                        >
                          {item.status}
                        </span>

                        <span className="item-category">
                          {item.category}
                        </span>
                      </div>

                      <h3>{item.name}</h3>

                      <p className="item-location">
                        <span aria-hidden="true">📍</span>{" "}
                        {item.location}
                      </p>

                      <div className="item-card-bottom">
                        <time dateTime={item.date}>
                          {formatDate(item.date)}
                        </time>

                        <Link
                          to={`/items/${item._id}`}
                          state={{ item }}
                        >
                          View details ↗
                        </Link>
                      </div>

                      {/* Delete button for item owner */}
                   {isOwner && (
  <div className="item-owner-actions">
    <Link
      to={`/items/${item._id}/edit`}
      className="edit-item-btn"
    >
      Edit
    </Link>

    <button
      className="delete-item-btn"
      onClick={() => confirmDelete(item._id)}
    >
      Delete
    </button>
  </div>
)}
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            <div className="empty-results">
              <h3>No matching items found</h3>
              <p>Try changing your search or filters.</p>
              <button onClick={resetFilters}>
                Reset filters
              </button>
            </div>
          )}
        </section>
      </section>

      {/* Custom delete confirmation modal */}
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
    </main>
  );
}

export default BrowseItems;
