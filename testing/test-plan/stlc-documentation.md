# Software Testing Life Cycle (STLC) – LostLink

## 1. Introduction

The Software Testing Life Cycle (STLC) is a systematic process followed by the testing team to ensure the quality and reliability of a software application. It consists of several phases, beginning with requirement analysis and ending with test cycle closure.

In this project, the STLC is applied to the LostLink – University Lost and Found Management System to evaluate its functionality, identify defects and verify whether the application behaves as expected.

## 2. Phases of STLC

### 2.1 Requirement Analysis

During this phase, the testing team studies the application requirements and identifies the functionalities that need to be tested.

**Activities:**
- Understand the purpose and functionality of the LostLink application.
- Identify the different user roles and their permissions.
- Identify testable features such as registration, login, browsing items and reporting lost or found items.
- Identify functional and non-functional testing requirements.

**Deliverables:**
- Feature inventory
- List of testable requirements
- Initial testing scope

### 2.2 Test Planning

During this phase, the testing team defines the overall testing strategy, resources, responsibilities, tools and schedule.

**Activities:**
- Define testing objectives and scope.
- Select appropriate testing techniques.
- Allocate responsibilities among the four team members.
- Identify required tools and testing environments.
- Define entry and exit criteria.

**Deliverables:**
- Software Test Plan (STP)
- Testing schedule
- Resource and responsibility allocation

### 2.3 Test Case Development

During this phase, test scenarios and test cases are prepared based on the identified requirements.

**Activities:**
- Prepare test scenarios for each application feature.
- Write test cases with preconditions, test steps and expected results.
- Prepare suitable test data.
- Apply black-box techniques such as Equivalence Partitioning and Boundary Value Analysis.
- Review test cases before execution.

**Deliverables:**
- Test case document
- Test data
- Expected test results

### 2.4 Test Environment Setup

During this phase, the required environment is prepared to execute the test cases.

**Activities:**
- Configure the LostLink frontend and backend.
- Configure the MongoDB testing database.
- Install the required dependencies.
- Prepare the browser and testing tools.
- Verify that the application is accessible and functioning in the test environment.

**Deliverables:**
- Configured test environment
- Environment readiness confirmation

### 2.5 Test Execution

During this phase, the prepared test cases are executed to verify the actual behaviour of the application.

**Activities:**
- Execute test cases according to the test plan.
- Compare actual results with expected results.
- Mark test cases as Pass, Fail or Blocked.
- Record screenshots and other supporting evidence.
- Report identified defects and retest after fixes.

**Deliverables:**
- Test execution results
- Defect reports
- Test evidence
- Updated test case register

### 2.6 Test Cycle Closure

During this phase, the testing activities are reviewed and summarized.

**Activities:**
- Review completed and pending test cases.
- Analyse test results and defect reports.
- Evaluate testing coverage and quality metrics.
- Document limitations and lessons learned.
- Prepare the final testing summary.

**Deliverables:**
- Test summary report
- Testing metrics
- Defect summary
- Lessons learned

## 3. STLC Application to LostLink

The following table summarizes how the STLC phases are applied to the LostLink project.

| STLC Phase | LostLink Project Activity |
|---|---|
| Requirement Analysis | Identify application features and user roles |
| Test Planning | Prepare the Software Test Plan |
| Test Case Development | Develop functional and black-box test cases |
| Test Environment Setup | Configure the application and QA database |
| Test Execution | Execute test cases and report defects |
| Test Cycle Closure | Analyse results and prepare the final report |

## 4. Conclusion

The STLC provides a structured approach to testing the LostLink application. Following these phases helps the team organize testing activities, identify defects systematically and evaluate the overall quality of the application.