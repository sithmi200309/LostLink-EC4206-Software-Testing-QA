# Test Environment and Test Data Record – LostLink

## 1. Introduction

This document describes the test environment and test data used during the functional testing of the LostLink – University Lost and Found Management System.

The purpose is to maintain a consistent environment and use appropriate test data to verify the application's functionality.

## 2. Test Environment Configuration

The following software and tools were used during testing.

| Component | Configuration |
|---|---|
| Operating System | Windows 11 |
| Frontend Framework | React.js |
| Frontend Development Tool | Vite |
| Frontend URL | http://localhost:5173 |
| Backend Runtime | Node.js v24.13.0 |
| Package Manager | npm 11.6.2 |
| Backend Framework | Express.js |
| Database | MongoDB |
| Database ODM | Mongoose |
| Browser | Google Chrome |
| Browser Version | 158.0.8127.36 (64-bit) |
| Code Editor | Visual Studio Code |
| Version Control | Git and GitHub |

## 3. Test Environment Setup

The following steps were followed to prepare the testing environment:

1. The LostLink project source code was opened in Visual Studio Code.
2. The required frontend and backend dependencies were installed using npm.
3. The backend server was started using Node.js.
4. The frontend development server was started using Vite.
5. The application was accessed through the local frontend URL.
6. MongoDB was used as the application's database through Mongoose.
7. Functional test cases were executed using Google Chrome.

## 4. Test Data

Synthetic test data was used to verify the main functionalities of the LostLink application.

| Test Data Category | Test Data Description | Purpose |
|---|---|---|
| User Registration | QA Test User with a new email address | Verify successful registration |
| Existing User Account | Previously registered QA account | Verify duplicate email validation |
| Login Credentials | Valid registered email and password | Verify successful authentication |
| Invalid Credentials | Incorrect password and unregistered email | Verify login error handling |
| Item Records | Back Pack, Wallet, Blue Water Bottle and Test Laptop | Verify browsing, searching, filtering and item details |
| Item Categories | Bags, Electronics, Stationery and Accessories | Verify category filtering |
| Item Locations | Auditorium, University Library and other campus locations | Verify item location information |
| Contact Request Message | Valid message and a message shorter than 10 characters | Verify contact request validation |
| Duplicate Contact Request | Another request for an item with an existing pending request | Verify duplicate request prevention |

## 5. Test Data Management and Security

- Test accounts and item records were used for functional testing.
- Invalid input values were used to verify application validation.
- Test data was used to examine both successful and unsuccessful operations.
- Real user credentials and confidential information were not used as test data.
- Database records created for testing were used to verify application behaviour.

## 6. Test Environment Limitations

- Testing was performed in a local development environment.
- Browser-based functional testing was performed using Google Chrome.
- Testing results may differ in other browsers or production environments.
- Performance under heavy concurrent user loads was not evaluated as part of these functional tests.

## 7. Conclusion

The LostLink application was tested using a local development environment consisting of React.js, Vite, Node.js, Express.js and MongoDB.

Google Chrome was used to execute the functional test cases. Synthetic test data was prepared to verify registration, authentication, item management, browsing, searching, filtering and contact request functionalities.