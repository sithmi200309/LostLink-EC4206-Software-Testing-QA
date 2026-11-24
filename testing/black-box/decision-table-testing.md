# Decision Table Testing – LostLink

## 1. Introduction

Decision Table Testing is a black-box testing technique used to verify system behaviour for different combinations of input conditions.

It is particularly useful when an application's output depends on multiple conditions.

For the LostLink – University Lost and Found Management System, Decision Table Testing is applied to the user login functionality.

The login process depends on the validity of the supplied email, whether the account exists in the system and whether the entered password matches the registered password.

## 2. Login Conditions

The following conditions are considered:

- C1: Is a valid email address supplied?
- C2: Does an account exist with the supplied email?
- C3: Does the entered password match the registered password?

The expected outcomes are:

- O1: Login successful.
- O2: Input validation error.
- O3: Authentication error.

## 3. Login Decision Table

| Rule | Valid email supplied? | Account exists? | Password matches? | Expected Outcome |
|---|---|---|---|---|
| R1 | No | – | – | Reject login and display an input validation message |
| R2 | Yes | No | – | Reject login and display "Invalid email or password." |
| R3 | Yes | Yes | No | Reject login and display "Invalid email or password." |
| R4 | Yes | Yes | Yes | Allow login and redirect the user to the Home page |

**Note:** The dash (–) indicates that the condition is not evaluated because an earlier condition already determines the outcome.

## 4. Test Scenarios Derived from the Decision Table

| Test Case ID | Rule | Test Scenario | Test Data | Expected Result |
|---|---|---|---|---|
| DT-LOGIN-001 | R1 | Attempt login with an invalid email format | `studentgmail.com` | Login should be prevented and an email validation message should be displayed |
| DT-LOGIN-002 | R2 | Attempt login using an unregistered email | `notregistered2026@example.com` / `TestPass123` | Login should be rejected with "Invalid email or password." |
| DT-LOGIN-003 | R3 | Attempt login using a registered email and incorrect password | `qa.test.2026@example.com` / `WrongPass123` | Login should be rejected with "Invalid email or password." |
| DT-LOGIN-004 | R4 | Login using valid registered credentials | `qa.test.2026@example.com` / `TestPass123` | Login should succeed and the user should be redirected to the Home page |

## 5. Observed Test Results

The following login behaviours were observed during functional testing:

| Test Scenario | Observed Result | Status |
|---|---|---|
| Invalid email format | Browser displayed an email validation message and prevented form submission | Pass |
| Unregistered email | Application displayed "Invalid email or password." | Pass |
| Incorrect password | Application displayed "Invalid email or password." | Pass |
| Valid credentials | Application redirected to the Home page and displayed the authenticated user's account information | Pass |

## 6. Analysis

The decision table identifies four meaningful login scenarios based on the supplied conditions.

The application successfully handled the tested scenarios:

- Invalid email input was rejected through validation.
- Unregistered email addresses were rejected.
- Incorrect passwords were rejected without authenticating the user.
- Valid credentials allowed the user to access the application.

The generic authentication error message for unregistered email addresses and incorrect passwords avoids revealing whether a particular email address is registered.

## 7. Conclusion

Decision Table Testing was applied to the LostLink login functionality to examine the relationship between email validity, account existence and password correctness.

Four login rules were identified and corresponding test scenarios were designed.

The observed results demonstrate that the application handled the tested login conditions according to the expected behaviour.