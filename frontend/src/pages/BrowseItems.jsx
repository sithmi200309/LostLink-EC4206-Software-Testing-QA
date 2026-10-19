import { useState } from "react";
import { Link } from "react-router";

const sampleItems = [
  {
    id: 1,
    name: "Sony wireless headphones",
    category: "Electronics",
    status: "Found",
    location: "West Library · Floor 2",
    date: "2026-10-19",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600",
  },
  {
    id: 2,
    name: "Blue North Face backpack",
    category: "Bags & backpacks",
    status: "Lost",
    location: "Student Union",
    date: "2026-10-19",
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600",
  },
  {
    id: 3,
    name: "Stainless steel water bottle",
    category: "Everyday essentials",
    status: "Found",
    location: "Recreation Center",
    date: "2026-10-18",
    image:
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=600",
  },
  {
    id: 4,
    name: "Silver MacBook Air",
    category: "Electronics",
    status: "Lost",
    location: "Engineering Hall · E204",
    date: "2026-10-18",
    image:
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600",
  },
  {
    id: 5,
    name: "Keys with a blue lanyard",
    category: "Keys & cards",
    status: "Found",
    location: "Science Building",
    date: "2026-10-17",
    image:
      "https://images.unsplash.com/photo-1582139329536-e7284fece509?w=600",
  },
  {
    id: 6,
    name: "Calculus textbook",
    category: "Books & stationery",
    status: "Found",
    location: "West Library · Café",
    date: "2026-10-17",
    image:
      "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=600",
  },
];

const categories = [
  "Electronics",
  "Bags & backpacks",
  "Keys & cards",
  "Books & stationery",
  "Clothing",
  "Everyday essentials",
];

const locations = [
  "West Library",
  "Student Union",
  "Recreation Center",
  "Engineering Hall",
  "Science Building",
];

function BrowseItems() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [category, setCategory] = useState("All categories");
  const [location, setLocation] = useState("All campus locations");
  const [dateRange, setDateRange] = useState("All dates");

  const filteredItems = sampleItems.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.location.toLowerCase().includes(search.toLowerCase());

    const matchesStatus = status === "All" || item.status === status;

    const matchesCategory =
      category === "All categories" || item.category === category;

    const matchesLocation =
      location === "All campus locations" ||
      item.location.includes(location);

    const itemDate = new Date(item.date + "T00:00:00");
    const today = new Date("2026-10-19T00:00:00");
    const daysOld = (today - itemDate) / (1000 * 60 * 60 * 24);

    const matchesDate =
      dateRange === "All dates" ||
      (dateRange === "Last 7 days" && daysOld <= 7) ||
      (dateRange === "Last 30 days" && daysOld <= 30);

    return (
      matchesSearch &&
      matchesStatus &&
      matchesCategory &&
      matchesLocation &&
      matchesDate
    );
  });

  function resetFilters() {
    setSearch("");
    setStatus("All");
    setCategory("All categories");
    setLocation("All campus locations");
    setDateRange("All dates");
  }

  return (
    <main className="browse-page">
      <section className="browse-layout">
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
              onChange={(event) => setLocation(event.target.value)}
            >
              <option>All campus locations</option>
              {locations.map((itemLocation) => (
                <option key={itemLocation}>{itemLocation}</option>
              ))}
            </select>
          </label>

          <label className="sidebar-field">
            <span>Date reported</span>
            <select
              value={dateRange}
              onChange={(event) => setDateRange(event.target.value)}
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

        <section className="browse-main">
          <div className="browse-topbar">
            <div className="status-filters">
              {["All", "Lost", "Found"].map((itemStatus) => (
                <button
                  key={itemStatus}
                  className={status === itemStatus ? "active" : ""}
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
              Showing {filteredItems.length} of {sampleItems.length} items
            </p>
            <button onClick={resetFilters}>Clear filters</button>
          </div>

          {filteredItems.length > 0 ? (
            <div className="items-grid">
              {filteredItems.map((item) => (
                <article className="item-card" key={item.id}>
                  <img
                    className="item-photo"
                    src={item.image}
                    alt={item.name}
                    loading="lazy"
                  />

                  <div className="item-card-content">
                    <div className="item-card-meta">
                      <span
                        className={`item-status ${
                          item.status.toLowerCase()
                        }`}
                      >
                        {item.status}
                      </span>

                      <span className="item-category">
                        {item.category}
                      </span>
                    </div>

                    <h3>{item.name}</h3>

                    <p className="item-location">
                      <span aria-hidden="true">📍</span> {item.location}
                    </p>

                    <div className="item-card-bottom">
                      <time dateTime={item.date}>
                        {new Date(
                          item.date + "T00:00:00"
                        ).toLocaleDateString("en-GB", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </time>

                      <Link
                        to={`/items/${item.id}`}
                        state={{ item }}
                      >
                        View details ↗
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="empty-results">
              <h3>No matching items found</h3>
              <p>Try changing your search or filters.</p>
              <button onClick={resetFilters}>Reset filters</button>
            </div>
          )}
        </section>
      </section>
    </main>
  );
}

export default BrowseItems;