# Boundary Value Analysis – LostLink

## 1. Introduction

Boundary Value Analysis (BVA) is a black-box testing technique that focuses on testing the boundary values of input ranges.

It is based on the observation that defects frequently occur at the minimum and maximum limits of input fields.

In the LostLink application, BVA is applied to registration, item reporting and contact request fields using the validation limits implemented in the backend.

The testing approach considers values immediately below, at and immediately above the specified boundaries.

## 2. Boundary Value Analysis Test Cases

### 2.1 Full Name Field

**Validation range:** 2–100 characters.

| Test Case ID | Input Length | Boundary Condition | Expected Result |
|---|---:|---|---|
| BVA-NAME-01 | 1 | Below minimum | Reject |
| BVA-NAME-02 | 2 | Minimum boundary | Accept |
| BVA-NAME-03 | 3 | Just above minimum | Accept |
| BVA-NAME-04 | 99 | Just below maximum | Accept |
| BVA-NAME-05 | 100 | Maximum boundary | Accept |
| BVA-NAME-06 | 101 | Above maximum | Reject |

### 2.2 Password Field

**Validation range:** 8–72 characters.

| Test Case ID | Input Length | Boundary Condition | Expected Result |
|---|---:|---|---|
| BVA-PASS-01 | 7 | Below minimum | Reject |
| BVA-PASS-02 | 8 | Minimum boundary | Accept |
| BVA-PASS-03 | 9 | Just above minimum | Accept |
| BVA-PASS-04 | 71 | Just below maximum | Accept |
| BVA-PASS-05 | 72 | Maximum boundary | Accept |
| BVA-PASS-06 | 73 | Above maximum | Reject |

### 2.3 Email Field

**Maximum length:** 254 characters.

The email must also follow a valid email format.

| Test Case ID | Input Length | Boundary Condition | Expected Result |
|---|---:|---|---|
| BVA-EMAIL-01 | 253 | Just below maximum | Accept if email format is valid |
| BVA-EMAIL-02 | 254 | Maximum boundary | Accept if email format is valid |
| BVA-EMAIL-03 | 255 | Above maximum | Reject |

### 2.4 Item Name Field

**Validation range:** 2–100 characters.

| Test Case ID | Input Length | Boundary Condition | Expected Result |
|---|---:|---|---|
| BVA-ITEM-01 | 1 | Below minimum | Reject |
| BVA-ITEM-02 | 2 | Minimum boundary | Accept |
| BVA-ITEM-03 | 3 | Just above minimum | Accept |
| BVA-ITEM-04 | 99 | Just below maximum | Accept |
| BVA-ITEM-05 | 100 | Maximum boundary | Accept |
| BVA-ITEM-06 | 101 | Above maximum | Reject |

### 2.5 Location Field

**Maximum length:** 150 characters.

The location field is required and has a maximum length restriction.

| Test Case ID | Input Length | Boundary Condition | Expected Result |
|---|---:|---|---|
| BVA-LOC-01 | 149 | Just below maximum | Accept |
| BVA-LOC-02 | 150 | Maximum boundary | Accept |
| BVA-LOC-03 | 151 | Above maximum | Reject |

### 2.6 Item Description Field

**Validation range:** 10–1000 characters.

| Test Case ID | Input Length | Boundary Condition | Expected Result |
|---|---:|---|---|
| BVA-DESC-01 | 9 | Below minimum | Reject |
| BVA-DESC-02 | 10 | Minimum boundary | Accept |
| BVA-DESC-03 | 11 | Just above minimum | Accept |
| BVA-DESC-04 | 999 | Just below maximum | Accept |
| BVA-DESC-05 | 1000 | Maximum boundary | Accept |
| BVA-DESC-06 | 1001 | Above maximum | Reject |

### 2.7 Contact Request Message Field

**Validation range:** 10–1000 characters.

| Test Case ID | Input Length | Boundary Condition | Expected Result |
|---|---:|---|---|
| BVA-CONTACT-01 | 9 | Below minimum | Reject |
| BVA-CONTACT-02 | 10 | Minimum boundary | Accept |
| BVA-CONTACT-03 | 11 | Just above minimum | Accept |
| BVA-CONTACT-04 | 999 | Just below maximum | Accept |
| BVA-CONTACT-05 | 1000 | Maximum boundary | Accept |
| BVA-CONTACT-06 | 1001 | Above maximum | Reject |

### 2.8 Item Date Field

The application does not allow users to report an item with a future date.

| Test Case ID | Input Value | Boundary Condition | Expected Result |
|---|---|---|---|
| BVA-DATE-01 | Yesterday | Before the current date | Accept |
| BVA-DATE-02 | Today | Current date boundary | Accept |
| BVA-DATE-03 | Tomorrow | After the current date | Reject |

## 3. Test Data Preparation

For each test case, input values should be generated with the exact character length specified in the test case.

The following conditions should be maintained during testing:

- For full name testing, all other registration fields must contain valid data.
- For password testing, the password must be entered in both password and confirmation fields, and both values must match.
- For email testing, the test email must have a valid email format and must not already be registered.
- For item name, location and description testing, all other required item-reporting fields must contain valid data.
- For contact message testing, the user must be authenticated and must select an item reported by another user.
- For date testing, the item report must contain valid values for all other required fields.

These conditions ensure that the test focuses on the boundary being evaluated rather than unrelated validation errors.

## 4. Test Execution Status

The test cases in this document represent the designed boundary test scenarios.

| Status | Meaning |
|---|---|
| Not Run | Test case has been designed but not executed |
| Pass | Actual result matches the expected result |
| Fail | Actual result differs from the expected result |

Actual execution results and supporting screenshots should be recorded after the corresponding tests are performed.

## 5. Conclusion

Boundary Value Analysis is applied to important input fields in the LostLink application, including registration details, item reporting information and contact request messages.

By testing values immediately below, at and above the specified boundaries, the testing team can evaluate whether the application's input validation correctly handles minimum and maximum limits.

This technique helps identify validation defects that may occur at the boundaries of accepted input ranges.