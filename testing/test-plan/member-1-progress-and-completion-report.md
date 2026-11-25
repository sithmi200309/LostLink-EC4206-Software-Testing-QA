# Member 1 – Progress and Completion Report

## 1. Member Responsibilities

Member 1 was responsible for Test Planning and Black-Box Testing activities for the LostLink – University Lost and Found Management System.

The assigned responsibilities included preparing test documentation, designing black-box test cases, executing functional tests, recording results and maintaining supporting evidence.

## 2. Completed Activities

| No. | Activity | Deliverable | Status |
|---|---|---|---|
| 1 | Identify and document application features | Feature Inventory | Completed |
| 2 | Prepare the software testing strategy and scope | Software Test Plan | Completed |
| 3 | Document the Software Testing Life Cycle | STLC Documentation | Completed |
| 4 | Design functional test cases | Master Test Case Register | Completed |
| 5 | Apply Equivalence Partitioning | Equivalence Partitioning Document | Completed |
| 6 | Apply Boundary Value Analysis | Boundary Value Analysis Document | Test design completed; partial execution |
| 7 | Apply Decision Table Testing | Decision Table Testing Document | Completed |
| 8 | Document the testing environment and test data | Test Environment and Test Data Record | Completed |
| 9 | Execute functional and access-control test cases | Test Execution Results | Completed |
| 10 | Capture and organise supporting screenshots | Testing Evidence | Completed |
| 11 | Summarise the test execution results | Test Execution Summary | Completed |

## 3. Test Execution Progress

A total of 28 functional test cases were documented and executed.

| Test Execution Status | Number of Test Cases |
|---|---:|
| Passed | 28 |
| Failed | 0 |
| Blocked | 0 |
| Not Run | 0 |
| **Total** | **28** |

The executed functional test cases covered registration, login, logout, item management, browsing, searching, filtering, sorting, contact requests and access control.

In addition to functional testing, Boundary Value Analysis was designed for important input fields, including full name, password, email, item name, location, item description, contact request message and item date.

Selected BVA test cases were executed, while the remaining cases are documented for future execution. The BVA execution results are recorded separately from the 28 functional test cases.

## 4. Testing Documentation Produced

The following documents were prepared and maintained under the `testing/` directory:

- Feature Inventory
- Software Test Plan
- STLC Documentation
- Test Environment and Test Data Record
- Master Test Case Register
- Equivalence Partitioning
- Boundary Value Analysis
- Decision Table Testing
- Test Execution Summary

Supporting screenshots were organised under:

`testing/member-1-test-planning-black-box-evidence/`

## 5. Challenges and Limitations

- Testing was conducted in a local development environment.
- Functional testing was primarily performed using Google Chrome.
- The functional test results cover the scenarios documented and executed in the Master Test Case Register.
- Selected Boundary Value Analysis test cases were executed, while the remaining cases require further runtime testing.
- A potential validation issue was identified in the full name field, where an input exceeding the specified maximum length was accepted during testing.
- The 73-character password test was inconclusive because the application displayed a password mismatch message.
- Testing in other browsers and production environments was outside the scope of these recorded activities.

## 6. Final Completion Statement

Member 1 completed the assigned test planning documentation, designed functional and black-box test cases, executed 28 functional test cases, recorded the observed results and organised supporting evidence.

Equivalence Partitioning and Decision Table Testing were documented as part of the black-box testing activities. Boundary Value Analysis test cases were also designed, and selected cases were executed and documented. The remaining BVA cases may be executed as additional testing when time permits.

The completed deliverables provide a structured record of the test planning and black-box testing activities performed for the LostLink application.