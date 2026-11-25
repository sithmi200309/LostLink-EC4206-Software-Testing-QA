# Boundary Value Analysis – LostLink

## 1. Introduction

Boundary Value Analysis (BVA) is a black-box testing technique that focuses on testing the boundary values of input ranges.

It is based on the observation that defects frequently occur at the minimum and maximum limits of input fields.

In the LostLink application, BVA is applied to registration, item reporting and contact request fields using the validation limits specified for the application.

The testing approach considers values immediately below, at and immediately above the specified boundaries.

## 2. Boundary Value Analysis Test Cases and Results

### 2.1 Full Name Field

**Validation range:** 2–100 characters.

| Test Case ID | Input Length | Boundary Condition | Expected Result | Actual Result | Status |
|---|---:|---|---|---|---|
| BVA-NAME-01 | 1 | Below minimum | Reject | Browser displayed a minimum-length validation message | Pass |
| BVA-NAME-02 | 2 | Minimum boundary | Accept | Account created successfully | Pass |
| BVA-NAME-03 | 3 | Just above minimum | Accept | Account created successfully | Pass |
| BVA-NAME-04 | 99 | Just below maximum | Accept | Account created successfully | Pass |
| BVA-NAME-05 | 100 | Maximum boundary | Accept | Account created successfully | Pass |
| BVA-NAME-06 | 101 | Above maximum | Reject | Account created successfully | Fail |

**Observation:** The application successfully accepted a 101-character full name. This indicates that the maximum length restriction of 100 characters may not be properly enforced.

### 2.2 Password Field

**Validation range:** 8–72 characters.

| Test Case ID | Input Length | Boundary Condition | Expected Result | Actual Result | Status |
|---|---:|---|---|---|---|
| BVA-PASS-01 | 7 | Below minimum | Reject | Browser displayed a minimum-length validation message | Pass |
| BVA-PASS-02 | 8 | Minimum boundary | Accept | Account created successfully | Pass |
| BVA-PASS-03 | 9 | Just above minimum | Accept | Account created successfully | Pass |
| BVA-PASS-04 | 71 | Just below maximum | Accept | Account created successfully | Pass |
| BVA-PASS-05 | 72 | Maximum boundary | Accept | Account created successfully | Pass |
| BVA-PASS-06 | 73 | Above maximum | Reject | Application displayed "Passwords do not match"; password length validation could not be confirmed | Inconclusive |

**Observation:** The application accepted passwords containing 8 and 72 characters. A 7-character password was rejected by browser validation. The 73-character test was inconclusive because the password confirmation values did not match.

### 2.3 Email Field

**Maximum length:** 254 characters.

The email must also follow a valid email format.

| Test Case ID | Input Length | Boundary Condition | Expected Result | Actual Result | Status |
|---|---:|---|---|---|---|
| BVA-EMAIL-01 | 253 | Just below maximum | Accept if email format is valid | Account created successfully | Pass |
| BVA-EMAIL-02 | 254 | Maximum boundary | Accept if email format is valid | Account created successfully | Pass |
| BVA-EMAIL-03 | 255 | Above maximum | Reject | Not executed | Not Run |

### 2.4 Item Name Field

**Validation range:** 2–100 characters.

| Test Case ID | Input Length | Boundary Condition | Expected Result | Actual Result | Status |
|---|---:|---|---|---|---|
| BVA-ITEM-01 | 1 | Below minimum | Reject | Not executed | Not Run |
| BVA-ITEM-02 | 2 | Minimum boundary | Accept | Not executed | Not Run |
| BVA-ITEM-03 | 3 | Just above minimum | Accept | Not executed | Not Run |
| BVA-ITEM-04 | 99 | Just below maximum | Accept | Not executed | Not Run |
| BVA-ITEM-05 | 100 | Maximum boundary | Accept | Not executed | Not Run |
| BVA-ITEM-06 | 101 | Above maximum | Reject | Not executed | Not Run |

### 2.5 Location Field

**Maximum length:** 150 characters.

The location field is required and has a maximum length restriction.

| Test Case ID | Input Length | Boundary Condition | Expected Result | Actual Result | Status |
|---|---:|---|---|---|---|
| BVA-LOC-01 | 149 | Just below maximum | Accept | Not executed | Not Run |
| BVA-LOC-02 | 150 | Maximum boundary | Accept | Not executed | Not Run |
| BVA-LOC-03 | 151 | Above maximum | Reject | Not executed | Not Run |

### 2.6 Item Description Field

**Validation range:** 10–1000 characters.

| Test Case ID | Input Length | Boundary Condition | Expected Result | Actual Result | Status |
|---|---:|---|---|---|---|
| BVA-DESC-01 | 9 | Below minimum | Reject | Not executed | Not Run |
| BVA-DESC-02 | 10 | Minimum boundary | Accept | Not executed | Not Run |
| BVA-DESC-03 | 11 | Just above minimum | Accept | Not executed | Not Run |
| BVA-DESC-04 | 999 | Just below maximum | Accept | Not executed | Not Run |
| BVA-DESC-05 | 1000 | Maximum boundary | Accept | Not executed | Not Run |
| BVA-DESC-06 | 1001 | Above maximum | Reject | Not executed | Not Run |

### 2.7 Contact Request Message Field

**Validation range:** 10–1000 characters.

| Test Case ID | Input Length | Boundary Condition | Expected Result | Actual Result | Status |
|---|---:|---|---|---|---|
| BVA-CONTACT-01 | 9 | Below minimum | Reject | Not executed | Not Run |
| BVA-CONTACT-02 | 10 | Minimum boundary | Accept | Not executed | Not Run |
| BVA-CONTACT-03 | 11 | Just above minimum | Accept | Not executed | Not Run |
| BVA-CONTACT-04 | 999 | Just below maximum | Accept | Not executed | Not Run |
| BVA-CONTACT-05 | 1000 | Maximum boundary | Accept | Not executed | Not Run |
| BVA-CONTACT-06 | 1001 | Above maximum | Reject | Not executed | Not Run |

### 2.8 Item Date Field

The application is expected not to allow users to report an item with a future date.

| Test Case ID | Input Value | Boundary Condition | Expected Result | Actual Result | Status |
|---|---|---|---|---|---|
| BVA-DATE-01 | Yesterday | Before the current date | Accept | Not executed | Not Run |
| BVA-DATE-02 | Today | Current date boundary | Accept | Not executed | Not Run |
| BVA-DATE-03 | Tomorrow | After the current date | Reject | Not executed | Not Run |

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

The following statuses are used to describe the execution results:

| Status | Meaning |
|---|---|
| Pass | The actual result matches the expected result. |
| Fail | The actual result differs from the expected result. |
| Not Run | The test case has been designed but has not been executed. |
| Inconclusive | The test was attempted, but the result was insufficient to determine whether the expected behaviour was satisfied. |

Only the test cases that were actually executed have been assigned execution results. The remaining test cases are marked as Not Run.

## 5. Summary of BVA Execution

The following table summarizes the current execution results.

| Status | Number of Test Cases |
|---|---:|
| Pass | 7 |
| Fail | 1 |
| Inconclusive | 1 |
| Not Run | 30 |
| **Total** | **39** |

**Key finding:** The full name field accepted an input of 101 characters, although the specified maximum length is 100 characters. This indicates a potential input validation defect that should be investigated.

The password field accepted the tested valid boundary values of 8 and 72 characters and rejected a 7-character password through browser validation. The 73-character test remains inconclusive.

## 6. Conclusion

Boundary Value Analysis was designed for important LostLink input fields, including registration details, item reporting information, contact request messages and item dates.

The executed tests identified a potential validation defect in the full name field because the application accepted a value exceeding the specified maximum length.

The password tests confirmed acceptance at the tested minimum and maximum valid boundaries. However, additional testing is required to establish the behaviour of the remaining input fields and unresolved boundary cases.

Although not all designed test cases were executed due to the available testing time, the document records the actual results and clearly identifies the cases that remain untested.
