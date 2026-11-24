# Test Execution Summary – LostLink

## 1. Introduction

This document summarises the results of functional testing performed on the LostLink – University Lost and Found Management System.

Testing was conducted using the test cases documented in the Master Test Case Register.

## 2. Test Execution Overview

A total of 28 test cases were executed to evaluate the main functionalities and access controls of the application.

| Metric | Result |
|---|---:|
| Total Test Cases | 28 |
| Passed | 28 |
| Failed | 0 |
| Blocked | 0 |
| Not Run | 0 |
| Pass Percentage | 100% |

## 3. Test Results by Feature

| Feature | Total Test Cases | Passed | Failed |
|---|---:|---:|---:|
| Registration | 5 | 5 | 0 |
| Login and Logout | 5 | 5 | 0 |
| Item Management and Browsing | 11 | 11 | 0 |
| Contact Requests | 5 | 5 | 0 |
| Access Control | 2 | 2 | 0 |
| **Total** | **28** | **28** | **0** |

## 4. Key Testing Observations

The following behaviours were verified during functional testing:

- Registration successfully created accounts using valid details and rejected duplicate email addresses and invalid inputs.
- Login accepted valid credentials and rejected incorrect passwords and unregistered email addresses.
- Logout ended the authenticated user session.
- Item browsing, searching, category filtering and sorting displayed the expected results.
- Users could submit, view, edit and delete their own item reports.
- Contact requests were successfully submitted and displayed to the item reporter.
- The application prevented duplicate pending contact requests and prevented users from contacting themselves.
- Access to private reports was restricted when the user was logged out.
- Edit and Delete controls were not displayed for items belonging to other users.

## 5. Evidence and Defect Recording

Screenshots were captured to support the observed test results.

Evidence is referenced in the Master Test Case Register and stored in:

`testing/evidence/`

No defect IDs are recorded in the completed test cases.

## 6. Conclusion

The functional testing activities recorded in the Master Test Case Register resulted in 28 passed test cases out of 28 executed test cases.

The tested registration, authentication, item management, browsing and contact request functionalities behaved according to their expected results in the local testing environment.

These results represent the tested scenarios and do not guarantee that every possible application behaviour is defect-free.