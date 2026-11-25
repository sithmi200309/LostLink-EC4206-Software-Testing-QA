# Equivalence Partitioning – LostLink

## 1. Introduction

Equivalence Partitioning (EP) is a black-box testing technique in which input data is divided into groups called equivalence classes. Values within the same class are expected to produce similar system behaviour.

Instead of testing every possible input, one representative value is selected from each valid and invalid class. This reduces the number of test cases while maintaining meaningful test coverage.

For the LostLink – University Lost and Found Management System, Equivalence Partitioning is applied to registration, item reporting and contact request fields.

## 2. Equivalence Partitioning Test Cases

### 2.1 Registration – Full Name

**Validation rule:** Full name must contain 2–100 characters after trimming whitespace.

| Class ID | Equivalence Class | Representative Test Data | Expected Result |
|---|---|---|---|
| EP-NAME-01 | Valid: 2–100 characters | `QA Test User` | Accept |
| EP-NAME-02 | Invalid: Empty value | Empty input | Reject |
| EP-NAME-03 | Invalid: Whitespace only | `     ` | Reject |
| EP-NAME-04 | Invalid: Less than 2 characters | `A` | Reject |
| EP-NAME-05 | Invalid: More than 100 characters | 101-character name | Reject |

### 2.2 Registration – Email

**Validation rule:** Email must follow a valid email format and contain no more than 254 characters. The email must also be unique.

| Class ID | Equivalence Class | Representative Test Data | Expected Result |
|---|---|---|---|
| EP-EMAIL-01 | Valid: Correct email format and unused email | `qa.user2026@example.com` | Accept |
| EP-EMAIL-02 | Invalid: Empty email | Empty input | Reject |
| EP-EMAIL-03 | Invalid: Malformed email format | `studentgmail.com` | Reject |
| EP-EMAIL-04 | Invalid: Email without a domain extension | `student@gmail` | Reject |
| EP-EMAIL-05 | Invalid: More than 254 characters | Valid-looking email exceeding 254 characters | Reject |
| EP-EMAIL-06 | Invalid: Duplicate registered email | Existing registered email | Reject |

### 2.3 Registration – Password

**Validation rule:** Password must contain 8–72 characters. The confirmation password must match the original password.

| Class ID | Equivalence Class | Representative Test Data | Expected Result |
|---|---|---|---|
| EP-PASS-01 | Valid: 8–72 characters | `TestPass123` | Accept, if confirmation matches |
| EP-PASS-02 | Invalid: Empty password | Empty input | Reject |
| EP-PASS-03 | Invalid: Less than 8 characters | `Pass123` | Reject |
| EP-PASS-04 | Invalid: More than 72 characters | 73-character password | Reject |
| EP-PASS-05 | Invalid: Confirmation password mismatch | `TestPass123` / `TestPass456` | Reject |

### 2.4 Item Reporting – Description

**Validation rule:** Item description must contain 10–1000 characters.

| Class ID | Equivalence Class | Representative Test Data | Expected Result |
|---|---|---|---|
| EP-DESC-01 | Valid: 10–1000 characters | `Black laptop reported for testing` | Accept |
| EP-DESC-02 | Invalid: Empty description | Empty input | Reject |
| EP-DESC-03 | Invalid: Blank or whitespace-only description | `          ` | Reject |
| EP-DESC-04 | Invalid: 1–9 characters | `Laptop` | Reject |
| EP-DESC-05 | Invalid: More than 1000 characters | 1001-character description | Reject |

### 2.5 Contact Request – Message

**Validation rule:** Contact request message must contain at least 10 non-whitespace characters.

| Class ID | Equivalence Class | Representative Test Data | Expected Result |
|---|---|---|---|
| EP-CONTACT-01 | Valid: At least 10 non-whitespace characters | `Hello, I would like to know more about this item.` | Accept |
| EP-CONTACT-02 | Invalid: Missing message | Empty input | Reject |
| EP-CONTACT-03 | Invalid: Whitespace-only message | `          ` | Reject |
| EP-CONTACT-04 | Invalid: 1–9 characters | `Hello123` | Reject |

## 3. Test Data Preparation

The following conditions should be maintained during execution:

- Registration tests should use valid values for all fields other than the field being tested.
- Email tests should use a valid, unused email address unless duplicate registration is being tested.
- Password confirmation should match the password except when testing the mismatch class.
- Item description tests should be performed by an authenticated user on the Report an Item page.
- Contact message tests should be performed by an authenticated user viewing an item reported by another user.
- Existing test accounts and item records should be used where required.

These conditions help ensure that each test focuses on the selected equivalence class.

## 4. Relationship Between Equivalence Partitioning and Test Execution

Equivalence Partitioning was used to identify representative valid and invalid input classes for important LostLink features.

The resulting classes support the design of the test cases recorded in the Master Test Case Register.

Actual results should be recorded separately after executing the representative test data. The expected results in this document do not, by themselves, indicate that every equivalence class has been tested.

## 5. Conclusion

Equivalence Partitioning was applied to five important input fields in LostLink: registration full name, email, password, item description and contact request message.

The inputs were divided into valid and invalid equivalence classes, and representative values were selected for each class.

This technique reduces redundant testing while providing systematic coverage of important input validation rules in the application.