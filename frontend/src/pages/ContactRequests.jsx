import { useEffect, useState } from "react";
import { Link } from "react-router";
import { useAuth } from "../context/AuthContext";

function ContactRequests() {
  const { token } = useAuth();

  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/contact/received",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to load contact requests.");
        }

        setRequests(data.requests || []);
      } catch (err) {
        setError(err.message || "Something went wrong.");
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchRequests();
    } else {
      setError("Please log in to view your contact requests.");
      setLoading(false);
    }
  }, [token]);

  const formatDate = (date) => {
    if (!date) return "Date unavailable";

    return new Date(date).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="contact-requests-page">
        <p className="requests-message">Loading contact requests...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="contact-requests-page">
        <p className="requests-error">{error}</p>
      </div>
    );
  }

  return (
    <div className="contact-requests-page">
      <div className="contact-requests-header">
        <div>
          <h1>Contact Requests</h1>
          <p>View messages from people interested in your reported items.</p>
        </div>

        <span className="request-count">
          {requests.length} {requests.length === 1 ? "Request" : "Requests"}
        </span>
      </div>

      {requests.length === 0 ? (
        <div className="empty-requests">
          <h2>No Contact Requests Yet</h2>
          <p>
            When someone contacts you about one of your reported items,
            their message will appear here.
          </p>
          <Link to="/my-reports" className="requests-back-button">
            View My Reports
          </Link>
        </div>
      ) : (
        <div className="contact-requests-list">
          {requests.map((request) => (
            <div className="contact-request-card" key={request._id}>
              <div className="contact-request-card-header">
                <div>
                  <h2>{request.item?.name || "Item unavailable"}</h2>
                  <p className="request-item-category">
                    {request.item?.category || "Category unavailable"}
                  </p>
                </div>

                <span
                  className={`request-status ${(
                    request.status || "Pending"
                  ).toLowerCase()}`}
                >
                  {request.status || "Pending"}
                </span>
              </div>

              <div className="request-item-details">
                <span>
                  <strong>Item type:</strong>{" "}
                  {request.item?.status || "Unavailable"}
                </span>

                <span>
                  <strong>Location:</strong>{" "}
                  {request.item?.location || "Unavailable"}
                </span>
              </div>

              <div className="request-sender">
                <strong>From:</strong>{" "}
                {request.sender?.fullName || "Unknown user"}
              </div>

              <div className="request-message">
                <strong>Message</strong>
                <p>{request.message}</p>
              </div>

              <div className="request-date">
                Received on {formatDate(request.createdAt)}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ContactRequests;