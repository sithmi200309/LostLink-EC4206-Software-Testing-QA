# Master Test Case Register â€“ LostLink

## 1. Introduction

The Master Test Case Register contains the test cases designed to verify the functionality of the LostLink â€“ University Lost and Found Management System.

Each test case includes a unique identifier, feature, scenario, preconditions, test steps, test data, expected result, priority and execution details.

The test cases cover registration, authentication, item management, browsing, searching, filtering, sorting and contact requests.

**Test execution status:** A total of 28 test cases have been documented and executed. Actual results, execution statuses and supporting screenshots have been recorded in the register.

## 2. Test Case Register

| Test Case ID | Feature | Test Scenario | Preconditions | Test Steps | Test Data | Expected Result | Priority | Actual Result | Status | Evidence / Defect ID |
|---|---|---|---|---|---|---|---|---|---|---|
| TC-REG-001 | Registration | Register with valid details | User is on registration page | Enter valid details and submit | New name, unused email, valid password and matching confirmation | Account should be created successfully and appropriate success feedback displayed | High | Registration was successful. The application redirected to the Home page, displayed the QA Test User account name | Pass | testing/member-1-test-planning-black-box-evidence/TC-REG-001_pass.png |
| TC-REG-002 | Registration | Register using an existing email | An account already exists with the email | Enter valid registration details using the existing email and submit | Existing registered email | Registration should be rejected and duplicate-email feedback displayed | High | Registration was rejected. The application displayed the message "An account with this email already exists." | Pass | testing/member-1-test-planning-black-box-evidence/TC-REG-002_pass.png |
| TC-REG-003 | Registration | Register using an invalid email format | User is on registration page | Enter an invalid email and submit | `studentgmail.com` | Registration should be rejected with an email validation message | High | Browser displayed an email validation message indicating that the email address was missing an '@' symbol and prevented submission. | Pass | testing/member-1-test-planning-black-box-evidence/TC-REG-003_pass.png |
| TC-REG-004 | Registration | Submit registration with missing required fields | User is on registration page | Enter valid full name and email, leave password and confirmation fields empty, and submit | Empty password and confirmation fields | Registration should be rejected and validation feedback displayed | High | Browser displayed "Please fill out this field." for the empty password field and prevented form submission. | Pass | testing/member-1-test-planning-black-box-evidence/TC-REG-004_pass.png |
| TC-REG-005 | Registration | Submit registration with mismatched passwords | User is on registration page | Enter valid details with different password and confirmation values, then submit | `TestPass123` / `TestPass456` | Registration should be rejected with a password mismatch message | High | Registration was rejected. The application displayed the validation message "Passwords do not match." | Pass | testing/member-1-test-planning-black-box-evidence/TC-REG-005_pass.png |
| TC-LOGIN-001 | Login | Login with valid credentials | A registered account exists | Enter registered email and correct password, then submit | qa.test.2026@example.com / TestPass123 | User should be authenticated and redirected to the appropriate page | High | Login was successful. The application redirected to the Home page and displayed the QA Test User account name and Logout button. | Pass | testing/member-1-test-planning-black-box-evidence/TC-LOGIN-001_pass.png |
| TC-LOGIN-002 | Login | Login with an incorrect password | A registered account exists | Enter registered email and incorrect password, then submit | qa.test.2026@example.com / WrongPass123 | Login should be rejected and an appropriate error message displayed | High | Login was rejected. The application displayed the message "Invalid email or password." and did not authenticate the user. | Pass | testing/member-1-test-planning-black-box-evidence/TC-LOGIN-002_pass.png |
| TC-LOGIN-003 | Login | Login using an unregistered email | User is on login page | Enter an unregistered email and password, then submit | notregistered2026@example.com / TestPass123 | Login should be rejected | High | Login was rejected. The application displayed the message "Invalid email or password." | Pass | testing/member-1-test-planning-black-box-evidence/TC-LOGIN-003_pass.png |
| TC-LOGIN-004 | Login | Submit login form with empty credentials | User is on login page | Leave email and password empty and click Sign in | Empty email and password | Login should be prevented and validation feedback displayed | High | Browser displayed "Please fill out this field." and prevented submission of the login form. | Pass | testing/member-1-test-planning-black-box-evidence/TC-LOGIN-004_pass.png |
| TC-LOGIN-005 | Logout | Logout from an authenticated session | User is logged in | Select the logout option | Authenticated test account | User session should end and the application should navigate to the appropriate unauthenticated page | High | After clicking Logout, the application redirected to the home page. The logged-in user profile and Logout button disappeared, and Login/Get Started options became visible. | Pass | testing/member-1-test-planning-black-box-evidence/TC-LOGIN-005_pass.png |
| TC-ITEM-001 | Browse Items | View available reported items | Application is running and item records exist | Open the Browse Items page | Existing item records | Available item listings should be displayed | High | The Browse Items page successfully displayed 3 of 3 available items: Back Pack, Wallet, and Blue Water Bottle. Each item displayed its image, category, location, and reported date. | Pass | testing/member-1-test-planning-black-box-evidence/TC-ITEM-001_pass.png |
| TC-ITEM-002 | Search Items | Search for an existing item | Item records exist | Enter an existing item name in the search field | Back Pack | Matching item records should be displayed | Medium | After entering "Back Pack" in the search field, the application displayed only the matching Back Pack item and updated the result count to "Showing 1 of 3 items." | Pass | testing/member-1-test-planning-black-box-evidence/TC-ITEM-002_pass.png |
| TC-ITEM-003 | Search Items | Search using a non-matching keyword | Item records exist | Enter a keyword that does not match any item | LaptopXYZ999 | No matching results should be displayed with appropriate feedback | Medium | After entering "LaptopXYZ999", the application displayed "Showing 0 of 3 items" and the message "No matching items found", with guidance to change the search or filters. | Pass | testing/member-1-test-planning-black-box-evidence/TC-ITEM-003_pass.png |
| TC-ITEM-004 | Filter Items | Filter items using an available category | Items from different categories exist | Select the Bags category filter | Category: Bags | Only items matching the selected category should be displayed | Medium | After selecting Bags, the application displayed only the Back Pack item and showed "Showing 1 of 3 items." | Pass | testing/member-1-test-planning-black-box-evidence/TC-ITEM-004_pass.png |
| TC-ITEM-005 | Sort Items | Sort items by oldest reported date | Multiple item records with different reported dates exist | Select Oldest First from the Sort by dropdown | Existing items reported on 22, 23 and 24 Nov 2026 | Items should be displayed in ascending date order, from oldest to newest | Medium | After selecting Oldest First, the items were displayed in the order Blue Water Bottle (22 Nov 2026), Wallet (23 Nov 2026) and Back Pack (24 Nov 2026). | Pass | testing/member-1-test-planning-black-box-evidence/TC-ITEM-005_pass.png |
| TC-ITEM-006 | Report Item | Submit a new item report with valid details | User is authenticated and on the Report an Item page | Select Lost Item or Found Item, enter all required details and submit the report | Valid item name, category, campus location, date and description | Item report should be saved and appropriate success feedback displayed | High | The report was submitted successfully. The application displayed "Your report has been saved successfully!" and cleared the form fields after submission. | Pass | testing/member-1-test-planning-black-box-evidence/TC-ITEM-006_pass.png |
| TC-ITEM-007 | Report Item | Submit an item report with missing required information | User is authenticated and on the Report an Item page | Leave Item Name empty, fill in the other required fields and click Submit Report | Empty item name; other required fields completed | Submission should be prevented and validation feedback displayed | High | Browser displayed "Please fill out this field." for the empty Item Name field and prevented form submission. | Pass | testing/member-1-test-planning-black-box-evidence/TC-ITEM-007_pass.png |
| TC-ITEM-008 | Item Details | View details of an existing item | An item is available on the Browse Items page | Select an item and click View Details | Existing item: Back Pack | The selected item's details should be displayed correctly | High | The application successfully opened the selected item's details page. The item image, name (Back Pack), status (Found), category (Bags), location (Auditorium), reported date (24 November 2026), and description were displayed. | Pass | testing/member-1-test-planning-black-box-evidence/TC-ITEM-008_pass.png |
| TC-ITEM-009 | Edit Item | Edit an item report owned by the logged-in user | User is authenticated and owns an existing report | Open the report, select Edit, modify the description and click Save Changes | Updated description: Samsung Phone with Black Color - Updated for testing | Updated information should be saved and displayed correctly | High | The application displayed "Your item has been updated successfully!" after saving the modified description. | Pass | testing/member-1-test-planning-black-box-evidence/TC-ITEM-009_pass.png |
| TC-ITEM-010 | Delete Item | Delete an item report owned by the logged-in user | User is authenticated and owns an existing item report | Open My Reports, click Delete beside the item, and confirm deletion if prompted | Existing owned item: Smart Phone | Item report should be deleted and no longer appear in My Reports | High | The item was successfully deleted. It disappeared from My Reports, all report counts changed to 0, and the "No reports yet" message appeared. | Pass | testing/member-1-test-planning-black-box-evidence/TC-ITEM-010_pass.png |
| TC-ITEM-011 | My Reports | View reports created by the logged-in user | User is authenticated and has created item reports | Open My Reports | Authenticated QA Test User with an existing report: Test Laptop | The user's own reports should be displayed with correct item details and report summary counts | Medium | The My Reports page successfully displayed the Test Laptop report, including its category (Electronics), location (University Library), and reported date (24/11/2026). The summary showed Total Reports: 1, Lost Items: 1, and Found Items: 0. | Pass | testing/member-1-test-planning-black-box-evidence/TC-ITEM-011_pass.png |
| TC-CONTACT-001 | Contact Request | Send a contact request with a valid message | User is authenticated and views an item reported by another user | Enter a valid message and submit the contact request | Message: Hello, I would like to know more about this laptop. Please contact me. | Contact request should be created successfully | High | The contact request was submitted successfully. The application displayed "Request Sent!" and the confirmation message "Your contact request has been sent successfully!" | Pass | testing/member-1-test-planning-black-box-evidence/TC-CONTACT-001_pass.png |
| TC-CONTACT-002 | Contact Request | Submit a contact request with a message shorter than 10 characters | User is authenticated and views another user's item | Enter a message shorter than 10 characters and attempt to submit the contact request | Hello123 (8 characters) | Request should be rejected with a message-length validation error | High | The browser displayed "Please lengthen this text to 10 characters or more (you are currently using 8 characters)." and prevented form submission. | Pass | testing/member-1-test-planning-black-box-evidence/TC-CONTACT-002_pass.png |
| TC-CONTACT-003 | Contact Request | Attempt to contact the reporter of own item | User is authenticated and owns the selected item | Open My Reports, select an item owned by the logged-in user, and open its details page | Own item: Pencil case | System should prevent the user from contacting themselves | High | The item details page displayed "This is your own report. You can manage it through My Reports." No contact request form was displayed, preventing the owner from contacting themselves. | Pass | testing/member-1-test-planning-black-box-evidence/TC-CONTACT-003_pass.png |
| TC-CONTACT-004 | Contact Request | Submit a duplicate pending contact request | User has already submitted a pending contact request for the same item | Open the same item again, enter another message, and click Send Contact Request | Same item: Test Laptop; Message: Hello, I would like to know more about this laptop. | Duplicate pending request should be rejected and an appropriate validation message displayed | Medium | The application prevented the duplicate contact request and displayed the message "You already have a pending request for this item." | Pass | testing/member-1-test-planning-black-box-evidence/TC-CONTACT-004_pass.png |
| TC-CONTACT-005 | Contact Requests | View received contact requests | User is authenticated and another user has submitted a contact request for an item owned by the logged-in user | Open the Contact Requests page | Existing received request for Test Laptop | The received contact request should be displayed with the item details, sender information, message, and request status | Medium | The Contact Requests page successfully displayed 1 received request for Test Laptop, including the category (Electronics), item type (Lost), location (University Library), sender (QA Contact User), message, received date (24 November 2026), and Pending status. | Pass | testing/member-1-test-planning-black-box-evidence/TC-CONTACT-005_pass.png |
| TC-AUTH-001 | Access Control | Attempt to access a protected operation without authentication | User is logged out | Enter http://localhost:5173/my-reports directly in the browser address bar and press Enter | No authentication token; protected page: My Reports | Access to private reports should be denied and an authentication message displayed | High | The application displayed the My Reports page with the message "Please log in to view your reports." Private report information was not displayed. | Pass | testing/member-1-test-planning-black-box-evidence/TC-AUTH-001_pass.png |
| TC-AUTH-002 | Access Control | Attempt to modify another user's item | User A is logged in; the displayed item belongs to User B | Open Browse Items and locate an item reported by another user; check whether Edit or Delete controls are displayed | User A account; item reported by User B | Edit and Delete controls should not be available for another user's item | High | No Edit or Delete controls were displayed for the other user's item. | Pass | testing/member-1-test-planning-black-box-evidence/TC-AUTH-002_pass.png |

## 3. Test Execution Summary

A total of 28 test cases were executed to evaluate the functional and access-control requirements of the LostLink application.

The execution results are summarized below.

| Feature Area | Total Test Cases | Passed | Failed |
|---|---:|---:|---:|
| Registration | 5 | 5 | 0 |
| Login and Logout | 5 | 5 | 0 |
| Item Management and Browsing | 11 | 11 | 0 |
| Contact Requests | 5 | 5 | 0 |
| Access Control | 2 | 2 | 0 |
| **Total** | **28** | **28** | **0** |

**Overall Test Execution Result:** 28 out of 28 test cases passed.

## 4. Test Execution Status Definitions

The following status definitions were used to record the results of test execution.

| Status | Meaning |
|---|---|
| Pass | The actual result matched the expected result. |
| Fail | The actual result differed from the expected result. |
| Blocked | The test could not be executed due to an environment issue or dependency. |
| Not Run | The test case had not been executed. |

All 28 test cases included in this register were executed and marked as Pass.

## 5. Test Evidence

Screenshots were captured during test execution to provide supporting evidence for the observed application behaviour.

The screenshots document important outcomes, including:

- Successful and unsuccessful user registration and login.
- Item browsing, searching, filtering and sorting.
- Item reporting, editing and deletion.
- Contact request submission and duplicate request prevention.
- Viewing received contact requests.
- Access-control restrictions for unauthenticated users and other users' items.

All supporting screenshots are stored in the following directory:

`testing/member-1-test-planning-black-box-evidence/`

The following naming convention was used:

`TESTCASEID_status.png`

Examples:

- `TC-REG-001_pass.png`
- `TC-LOGIN-002_pass.png`
- `TC-ITEM-006_pass.png`
- `TC-CONTACT-004_pass.png`
- `TC-AUTH-001_pass.png`

## 6. Conclusion

The Master Test Case Register documents 28 functional and access-control test cases designed and executed for the LostLink â€“ University Lost and Found Management System.

The test cases covered the main application functionalities, including user registration, authentication, item management, browsing, searching, filtering, sorting and contact request handling.

All 28 executed test cases passed, indicating that the application behaved as expected for the tested scenarios. The recorded actual results and supporting screenshots provide evidence of the testing activities and their outcomes.

The register also provides a structured record for test traceability, execution monitoring and future regression testing.
