# Master Test Case Register – LostLink

## 1. Introduction

The Master Test Case Register contains the test cases designed to verify the functionality of the LostLink – University Lost and Found Management System.

Each test case includes a unique identifier, test scenario, preconditions, execution steps, test data and expected results. During test execution, actual results and test status will also be recorded.

## 2. Test Case Register

| Test Case ID | Feature | Test Scenario | Preconditions | Test Steps | Test Data | Expected Result | Priority | Actual Result | Status |
|---|---|---|---|---|---|---|---|---|---|
| TC-REG-001 | Registration | Register with valid details | User is on registration page | Enter valid registration details and submit | Valid name, email and password | Account should be created successfully | High | Pending | Not Executed |
| TC-REG-002 | Registration | Register using an existing email | An account already exists with the email | Enter registration details using the existing email and submit | Existing email | Application should prevent duplicate registration and display appropriate feedback | High | Pending | Not Executed |
| TC-LOGIN-001 | Login | Login with valid credentials | A registered account exists | Enter valid email and password, then submit | Registered email and password | User should log in successfully | High | Pending | Not Executed |
| TC-LOGIN-002 | Login | Login with an incorrect password | A registered account exists | Enter registered email and incorrect password, then submit | Registered email and incorrect password | Login should be rejected and appropriate feedback should be displayed | High | Pending | Not Executed |
| TC-BROWSE-001 | Browse Items | View available items | User can access the browse items page | Navigate to the browse items page | Existing item records | Available items should be displayed | High | Pending | Not Executed |
| TC-SEARCH-001 | Search | Search using an existing item name | Items are available | Enter an existing item name in the search field | Existing item name | Matching item or items should be displayed | Medium | Pending | Not Executed |
| TC-REPORT-001 | Report Item | Submit a report with valid details | User is logged in and can access the report item page | Enter valid item details and submit | Valid item information | Item report should be submitted successfully | High | Pending | Not Executed |
| TC-DETAIL-001 | Item Details | View an item's details | An item exists | Select an item from the browse page | Existing item | The selected item's details should be displayed | Medium | Pending | Not Executed |

## 3. Test Execution Status

The following status values will be used during test execution:

- **Not Executed:** The test case has not yet been performed.
- **Pass:** Actual result matches the expected result.
- **Fail:** Actual result does not match the expected result.
- **Blocked:** The test cannot be executed because of an unresolved issue.

## 4. Notes

1. Test cases must be based on the actual application functionality.
2. Test data should be suitable for the separate QA database.
3. Actual results must be recorded after executing each test case.
4. Screenshots or other supporting evidence should be stored in the testing/evidence directory.
5. Failed test cases should be linked to the relevant defect reports.
6. Validation rules and expected results must be verified against the implemented application behaviour.

## 5. Conclusion

The Master Test Case Register provides a centralized record of the testing activities carried out for LostLink. It supports systematic test execution, defect identification and evaluation of application quality.