import { Link, NavLink } from "react-router";

function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar-container">
        {/* Application logo */}
        <Link to="/" className="navbar-logo">
  <span className="logo-icon" aria-hidden="true">
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10 13.5L14 9.5"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <path
        d="M7.5 15.5L5.5 17.5a4 4 0 0 1-5.7-5.7l4-4a4 4 0 0 1 5.7 0"
        transform="translate(2 0)"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16.5 8.5L18.5 6.5a4 4 0 0 1 5.7 5.7l-4 4a4 4 0 0 1-5.7 0"
        transform="translate(-2 0)"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </span>

  <span>LostLink</span>
</Link>

        {/* Main navigation links */}
        <nav className="nav-links">
          <NavLink to="/" end>
            Home
          </NavLink>

          <NavLink to="/browse">
            Browse Items
          </NavLink>

          <NavLink to="/report">
            Report an Item
          </NavLink>
        </nav>

        {/* Account buttons */}
        <div className="nav-actions">
          <Link to="/login" className="login-link">
            Log in
          </Link>

          <Link to="/register" className="get-started-btn">
            Get Started
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Navbar;