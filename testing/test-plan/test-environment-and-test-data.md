# LostLink – Test Environment and Test Data Record

## 1. Purpose

This document describes the hardware, software, application configuration and test data used to evaluate the LostLink University Lost and Found Management System.

## 2. Software Test Environment

| Component | Configuration |
|---|---|
| Operating System | Microsoft Windows |
| Frontend Framework | React.js |
| Frontend Development Server | Vite |
| Frontend URL | http://localhost:5173 |
| Backend Runtime | Node.js |
| Backend Framework | Express.js |
| Backend URL | http://localhost:5000 |
| Database | MongoDB |
| ODM | Mongoose |
| Browser | Google Chrome |
| Code Editor | Visual Studio Code |
| Version Control | Git and GitHub |

## 3. Application Configuration

The LostLink application is executed locally using separate frontend and backend development servers.

The backend connects to a dedicated MongoDB QA database. Test accounts and sample item records are used during testing.

The actual browser version, Node.js version and MongoDB database name should be recorded from the test machine before final submission.

## 4. Test Data Management

The following test data categories are used:

| Data Category | Example | Purpose |
|---|---|---|
| Valid user account | Synthetic user with valid email and password | Registration and login testing |
| Invalid email | studentgmail.com | Email validation |
| Existing email | Previously registered test account | Duplicate registration testing |
| Invalid password | Password shorter than 8 characters | Password validation |
| Valid item | Synthetic lost/found item details | Item reporting and browsing |
| Invalid item data | Missing required item information | Item validation |
| Contact request | Synthetic message of at least 10 characters | Contact request testing |
| Invalid contact message | Empty or fewer than 10 characters | Contact validation |

## 5. Test Data Safety

- Use synthetic test accounts and dummy item information.
- Do not use real users' personal information.
- Use a separate QA database rather than production data.
- Do not include passwords, database credentials or secret keys in Git commits.
- Reset or remove test records when appropriate after testing.

## 6. Environment Readiness

The LostLink application has been started successfully in the local development environment.

| Readiness Check | Status |
|---|---|
| Frontend installation and startup | Verified |
| Backend installation and startup | Verified |
| MongoDB connection | Verified |
| QA database configuration | Configured |
| Browser access to application | Verified |
| Test account preparation | To be recorded |
| Test execution | Pending |

## 7. Conclusion

The local testing environment provides the required frontend, backend and database components for executing functional and black-box tests on LostLink. A separate QA database and synthetic test data are used to support safe and repeatable testing.