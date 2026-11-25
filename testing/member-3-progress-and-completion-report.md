# Member 3 – Progress and Completion Report

## 1. Member Responsibilities

Member 3 was responsible for Automation Testing and Behavior-Driven Development (BDD) activities for the LostLink – University Lost and Found Management System.

The assigned responsibilities included preparing automated test scripts, implementing BDD scenarios, performing Selenium frontend testing, executing API tests using Postman and Newman, configuring GitHub Actions and maintaining supporting evidence.

## 2. Completed Activities

| No. | Activity | Deliverable | Status |
|---|---|---|---|
| 1 | Set up the automation testing environment | Testing Environment Setup | Completed |
| 2 | Design BDD test scenarios | Cucumber Feature File | Completed |
| 3 | Implement BDD step definitions | Cucumber Step Definitions | Completed |
| 4 | Execute BDD test scenarios | BDD Test Execution Results | Completed |
| 5 | Implement Selenium frontend automation | Selenium Test Script | Completed |
| 6 | Execute Selenium automation tests | Selenium Test Execution Results | Completed |
| 7 | Create automated API test cases | Postman Collection | Completed |
| 8 | Execute API tests using Newman | Newman Test Execution Results | Completed |
| 9 | Configure continuous integration | GitHub Actions Workflow | Completed |
| 10 | Execute automated tests through GitHub Actions | CI Execution Results | Completed |
| 11 | Capture and organise supporting screenshots | Testing Evidence | Completed |
| 12 | Submit completed work through GitHub | Pull Request | Completed; awaiting merge |

## 3. Test Execution Progress

Automation testing was performed using Cucumber, Selenium WebDriver and Newman.

| Testing Method | Passed | Failed | Total |
|---|---:|---:|---:|
| Cucumber BDD Scenarios | 2 | 0 | 2 |
| Selenium Smoke Tests | 1 | 0 | 1 |
| Newman API Assertions | 4 | 0 | 4 |

The BDD scenarios verified backend API responses and item report data structure.

Selenium WebDriver was used to verify that the LostLink frontend loaded and displayed content successfully.

Newman executed one API request with four assertions covering HTTP response status, items array, count field and consistency between the count and returned items.

GitHub Actions was configured to execute BDD and Newman tests automatically. The workflow completed successfully, with two GitHub checks passing.

## 4. Testing Documentation Produced

The following files were prepared and maintained under the `testing/` directory:

- Cucumber BDD Feature File
- Cucumber Step Definitions
- Selenium Automation Test Script
- Postman API Test Collection
- BDD Test Execution Results
- Selenium Test Execution Evidence
- Newman API Test Execution Results

The GitHub Actions workflow was maintained under:

`.github/workflows/member3-automation.yml`

Supporting screenshots and reports were organised under:

`testing/evidence/member3/`

## 5. Challenges and Limitations

- Testing was initially conducted in a local development environment.
- The backend required an active MongoDB connection for API testing.
- The Postman desktop application encountered errors, so API tests were executed using Newman.
- Selenium testing covered basic frontend functionality rather than complete end-to-end workflows.
- API automation focused on the item reports endpoint.
- GitHub Actions automated BDD and Newman testing, while Selenium testing was performed locally.
- The Pull Request was created successfully, but final merging into the main branch remained pending.

## 6. Final Completion Statement

Member 3 completed the assigned automation testing activities, implemented Cucumber BDD scenarios, performed Selenium frontend testing, executed API tests using Newman and configured GitHub Actions for continuous integration.

Two BDD scenarios, one Selenium smoke test and four Newman API assertions passed successfully. The GitHub Actions workflow also completed successfully.

The completed automation scripts, execution results and supporting evidence were committed and pushed to the project repository. A Pull Request was created for integration into the main branch.

The completed deliverables provide a structured record of the automation testing and BDD activities performed for the LostLink application.