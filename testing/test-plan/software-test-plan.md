# Software Test Plan
## LostLink â€“ University Lost and Found Management System

**Module:** EC4206 â€“ Software Testing and Quality Assurance  
**Project:** LostLink  
**Document:** Software Test Plan  
**Version:** 1.0  
**Status:** Updated – Member 1 testing completed; team review pending

---

## 1. Introduction

LostLink is a University Lost and Found Management System designed to help users report lost and found items, browse reported items and communicate with item reporters.

This Software Test Plan describes the testing activities that will be performed to evaluate the functionality and quality of the LostLink application.

The plan defines the testing objectives, scope, approach, resources, environment, responsibilities, entry criteria, exit criteria and potential risks.

## 2. Testing Objectives

The main objectives of testing are:

1. Verify that the application functions according to its expected requirements.
2. Verify that users can successfully register, log in and log out.
3. Verify that users can report, browse, view, edit and delete item reports according to their permissions.
4. Verify that search, filtering and sorting functionalities produce appropriate results.
5. Verify that contact requests work as expected.
6. Identify input-validation errors and functional defects.
7. Evaluate access control and ensure that unauthorized users cannot perform restricted operations.
8. Record test results and provide evidence of the testing activities.

## 3. Testing Scope

### 3.1 In-Scope Features

The following application features are included in the proposed testing scope:

- User registration and authentication
- User login and logout
- Browse reported items
- Search, filtering and sorting
- Report lost and found items
- View item details
- Edit and delete item reports
- View personal item reports
- Send and receive contact requests
- Input validation and access control

### 3.2 Out-of-Scope Features

The following activities are excluded from the current testing scope unless they are specifically required by the assignment:

- Production deployment testing
- Real email or SMS delivery, if not implemented
- External integrations not included in the application
- Testing against real user accounts or production data

## 4. Testing Approach

The project will use multiple software testing techniques.

### 4.1 Functional Testing
Verify that application features behave according to their expected functionality.

### 4.2 Black-Box Testing
Apply Equivalence Partitioning, Boundary Value Analysis and Decision Table Testing to selected application inputs and features.

### 4.3 White-Box Testing
Evaluate selected internal code paths using control flow analysis, cyclomatic complexity and code coverage.

### 4.4 Unit Testing and Test-Driven Development
Use an appropriate JavaScript testing framework to demonstrate the Red-Green-Refactor cycle.

### 4.5 Behaviour-Driven Development
Prepare and execute selected Gherkin scenarios using Cucumber.

### 4.6 Test Automation
Automate selected user-interface or API test cases.

### 4.7 Non-Functional Testing
Perform selected performance, security and usability checks.

## 5. Test Environment

The application will be tested in a local development environment.

| Component | Configuration |
|---|---|
| Operating System | Windows |
| Frontend | React.js with Vite |
| Backend | Node.js with Express.js |
| Database | MongoDB |
| Frontend Port | 5173 |
| Backend Port | 5000 |
| Browser | Google Chrome 158.0.8127.36 (64-bit) |
| Node.js Version | v24.13.0 |
| Database | Dedicated QA database |

Testing will be conducted using synthetic test accounts and test data.

## 6. Test Resources

### 6.1 Human Resources

The project consists of four members with allocated testing responsibilities:

- Member 1: Test Planning and Black-Box Testing
- Member 2: White-Box Testing, TDD and SonarQube
- Member 3: BDD, Test Automation and CI/CD
- Member 4: Performance, Security, Usability and Defect Tracking

### 6.2 Software and Tools

The proposed tools include:

- Visual Studio Code
- Git and GitHub
- MongoDB
- Postman
- Selenium
- Cucumber
- JMeter
- SonarQube
- JavaScript-compatible unit testing framework

The final tool configuration will be documented as each testing activity is implemented.

## 7. Entry Criteria

Testing activities can begin when:

1. The LostLink source code is available.
2. The frontend and backend dependencies are installed.
3. The application starts successfully.
4. The MongoDB test database is connected.
5. Initial feature identification is completed.
6. Test data and test accounts are available.
7. The relevant test cases have been reviewed.

## 8. Exit Criteria

Testing activities can be considered complete when:

1. All planned test cases have been executed or their execution status explained.
2. Actual results have been documented.
3. Failed test cases have been investigated.
4. Reproducible defects have been recorded.
5. Required testing evidence has been collected.
6. Test coverage gaps and limitations have been documented.
7. The final testing summary has been prepared.

## 9. Risks and Mitigation

| Risk | Potential Impact | Mitigation |
|---|---|---|
| Database connection failure | Testing cannot proceed | Maintain a separate, verified QA database |
| Environment configuration problems | Application may fail to start | Document configuration and setup instructions |
| Test data conflicts | Incorrect or inconsistent test results | Use dedicated synthetic test accounts |
| Time limitations | Some testing activities may remain incomplete | Prioritize important features and test cases |
| Testing tool compatibility | Delays in automation and unit testing | Verify tool compatibility before implementation |
| Team integration conflicts | Changes may affect shared work | Use separate branches and pull requests |

## 10. Test Deliverables

The expected testing deliverables include:

- Software Test Plan
- Feature Inventory
- STLC documentation
- Master Test Case Register
- Black-Box Testing documentation
- White-Box Testing documentation
- Unit testing and TDD evidence
- BDD scenarios and execution evidence
- Test automation results
- Performance and security testing results
- Defect reports
- Final testing summary



