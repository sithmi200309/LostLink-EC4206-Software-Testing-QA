# Boundary Value Analysis – LostLink

## 1. Introduction

Boundary Value Analysis (BVA) is a black-box testing technique that focuses on testing the boundary values of input ranges.

It is based on the observation that defects frequently occur at the minimum and maximum limits of input fields.

In the LostLink application, BVA is applied to registration fields such as the full name and password using the validation limits implemented in the backend.

## 2. Boundary Value Analysis Test Cases

### 2.1 Full Name Field

**Validation range:** 2–100 characters

| Test Case ID | Input Length | Boundary Condition | Expected Result |
|---|---:|---|---|
| BVA-NAME-01 | 1 | Below minimum | Reject |
| BVA-NAME-02 | 2 | Minimum boundary | Accept |
| BVA-NAME-03 | 3 | Just above minimum | Accept |
| BVA-NAME-04 | 99 | Just below maximum | Accept |
| BVA-NAME-05 | 100 | Maximum boundary | Accept |
| BVA-NAME-06 | 101 | Above maximum | Reject |

### 2.2 Password Field

**Validation range:** 8–72 characters

| Test Case ID | Input Length | Boundary Condition | Expected Result |
|---|---:|---|---|
| BVA-PASS-01 | 7 | Below minimum | Reject |
| BVA-PASS-02 | 8 | Minimum boundary | Accept |
| BVA-PASS-03 | 9 | Just above minimum | Accept |
| BVA-PASS-04 | 71 | Just below maximum | Accept |
| BVA-PASS-05 | 72 | Maximum boundary | Accept |
| BVA-PASS-06 | 73 | Above maximum | Reject |

## 3. Test Data Preparation

For each test case, input values will be generated with the exact character length specified in the test case.

For full name testing, the other registration fields must contain valid data.

For password testing:
- The password must be entered in both password and confirm password fields.
- Both values must match.
- The email must be valid and not already registered.
- The full name must contain a valid number of characters.

These conditions ensure that the test focuses on the boundary being evaluated rather than unrelated validation errors.

## 4. Conclusion

Boundary Value Analysis helps identify defects at the minimum and maximum input limits of the LostLink registration form. By testing values immediately below, at and above each boundary, the testing team can verify whether the implemented input validation works correctly.