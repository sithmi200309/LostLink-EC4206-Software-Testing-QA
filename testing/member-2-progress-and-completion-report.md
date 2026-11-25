# Member 2 – Progress and Completion Report

## 1. Responsibilities

The following activities were completed as part of the software testing and quality assurance work for the LostLink application:

- White-Box Testing
- Control Flow Graph (CFG) analysis
- Cyclomatic Complexity calculation
- Statement and Branch Coverage
- Test-Driven Development (TDD)
- SonarQube analysis
- Testing documentation and evidence collection

---

## 2. Completed Activities

| Activity | Work Completed | Evidence / Result |
|---|---|---|
| **White-Box Testing** | Selected the `register()` function in `backend/controllers/authController.js` and analyzed its internal control flow and decision paths. | 9 decision points identified and cyclomatic complexity calculated as **10**. |
| **Control Flow Graph (CFG)** | Identified sequential statements, decision points, validation paths, success path, and exception-handling paths. | CFG prepared for the selected `register()` function. |
| **Cyclomatic Complexity** | Calculated cyclomatic complexity using the number of decision points for the single connected function. | **V(G) = 9 + 1 = 10**. |
| **White-Box Test Cases** | Designed and implemented test cases covering invalid input, invalid name, invalid email, password boundary conditions, password mismatch, existing user, successful registration, duplicate-key error, validation error, and unexpected error. | **11 white-box test cases** implemented. |
| **Statement & Branch Coverage** | Executed the test suite with Vitest coverage enabled and analyzed statement and branch coverage. | **71.18% statements**, **63.04% branches**, **80% functions**, **71.18% lines** overall. |
| **Test Execution** | Executed the complete Vitest test suite after implementing the white-box tests and TDD tests. | **16/16 tests passed**. |
| **Test-Driven Development** | Implemented a small password-length validation function using the Red → Green → Refactor cycle. | Tested **7, 8, 72, and 73 character** password boundaries. |
| **TDD Red Stage** | Created the password validation tests before completing the implementation. | Tests initially failed, demonstrating the Red stage. |
| **TDD Green Stage** | Implemented the password validation logic to satisfy the tests. | **4/4 TDD tests passed**. |
| **TDD Refactor Stage** | Refactored the implementation by introducing named minimum and maximum password-length constants. | Tests continued to pass after refactoring. |
| **SonarQube Setup** | Configured SonarQube for the LostLink backend and connected the Vitest LCOV coverage report. | SonarQube analysis completed successfully. |
| **SonarQube Analysis** | Reviewed bugs, vulnerabilities, security hotspots, code smells, technical debt, coverage, and duplication results. | **0 bugs, 0 vulnerabilities, 6 security hotspots, 4 code smells, 16 min technical debt, 24.9% coverage, 0 duplicated blocks**. |
| **SonarQube Improvements** | Identified actionable improvements based on the reported findings. | Cognitive complexity, email-regex hotspot review, and removal of unused/incomplete comments identified for improvement. |
| **Documentation** | Prepared documentation for White-Box Testing, TDD, and SonarQube analysis. | Reports organized under the `testing/` directory. |
| **Evidence Collection** | Collected test execution, coverage, TDD, and SonarQube evidence. | Screenshots and analysis results available for the relevant testing activities. |

---

## 3. White-Box Testing

### 3.1 Selected Function

The selected core function was:

`backend/controllers/authController.js`

Function:

```js
register(req, res)
```

The `register()` function was selected because it contains meaningful validation, database interaction, successful registration, and exception-handling decision paths.

The White-Box Testing workflow followed was:

1. Analyze Source Code
2. Select Coverage Criteria
3. Design Test Cases
4. Execute Tests
5. Measure Coverage
6. Add Missing Tests

---

### 3.2 Control Flow Analysis

The `register()` function contains the following major decision points:

- **D1:** Required fields have the correct string types
- **D2:** Full name length is valid
- **D3:** Email address is valid
- **D4:** Password has at least 8 characters
- **D5:** Password does not exceed 72 characters
- **D6:** Password and confirmation match
- **D7:** A user with the email already exists
- **D8:** The caught error has code `11000`
- **D9:** The caught error is a Mongoose `ValidationError`

Therefore:

**Number of decision points = 9**

---

### 3.3 Cyclomatic Complexity

For a single connected function:

\[
V(G) = D + 1
\]

Therefore:

\[
V(G) = 9 + 1 = 10
\]

**Cyclomatic Complexity = 10**

This gives **10 linearly independent basis paths** for the analysis.

The cyclomatic complexity represents the minimum number of independent paths needed for the analysis. It does not represent the total number of possible input combinations.

**Evidence:** `WB_Cyclomatic_Complexity.png`

---

### 3.4 White-Box Test Cases

| Test ID | Path / Condition | Expected Result |
|---|---|---|
| **WB01** | D1 = False — invalid required-field types | HTTP 400 |
| **WB02** | D2 = False — full name shorter than 2 characters | HTTP 400 |
| **WB03** | D3 = False — invalid email address | HTTP 400 |
| **WB04** | D4 = False — password shorter than 8 characters | HTTP 400 |
| **WB05** | D5 = False — password longer than 72 characters | HTTP 400 |
| **WB06** | D6 = False — passwords do not match | HTTP 400 |
| **WB07** | D7 = True — existing user found | HTTP 409 |
| **WB08** | D7 = False — valid registration and no existing user | HTTP 201 |
| **WB09** | D8 = True — duplicate-key error (`11000`) | HTTP 409 |
| **WB10** | D8 = False, D9 = True — Mongoose `ValidationError` | HTTP 400 |
| **WB11** | D8 = False, D9 = False — unexpected error | HTTP 500 |

The test cases cover the major validation, successful-registration, and exception-handling paths of the selected function.

---

## 4. Statement and Branch Coverage

### 4.1 Statement Coverage

Statement coverage requires every executable statement to be executed at least once.

The implemented white-box tests were executed using Vitest with coverage enabled.

### 4.2 Branch Coverage

Branch coverage requires both outcomes of each decision to be exercised:

- True branch
- False branch

The test cases were designed to exercise the validation decisions, registration path, and exception-handling branches.

---

### 4.3 Final Test Execution

The complete test suite was executed after implementing the White-Box Testing and TDD work.

```text
Test Files  3 passed (3)
Tests       16 passed (16)
```

The 16 tests consisted of:

- 11 White-Box registration tests
- 1 basic Vitest sanity test
- 4 TDD password-validator tests

**Result: 16/16 tests passed.**

**Evidence:** `WhiteBox_Test_Result.png`

---

### 4.4 Coverage Results

| Coverage Metric | Overall |
|---|---:|
| Statements | 71.18% |
| Branches | 63.04% |
| Functions | 80% |
| Lines | 71.18% |

Coverage for `authController.js`:

| Coverage Metric | `authController.js` |
|---|---:|
| Statements | 67.92% |
| Branches | 61.36% |
| Functions | 75% |
| Lines | 67.92% |

The file-level coverage report identified uncovered lines **132–193**. These lines are outside the selected `register()` function.

The HTML coverage report was inspected to verify the executed paths through the selected registration function.

**Evidence:** `WhiteBox_Coverage_Result.png`

---

### 4.5 Test Execution Note

The WB11 test intentionally causes an unexpected error so that the `500` exception-handling path is exercised.

The application therefore prints:

```text
Registration error: Database connection failed
```

to `stderr`.

This does not indicate a failed test. The test passes because the expected HTTP 500 response is produced.

---

## 5. Test-Driven Development

### 5.1 TDD Target

TDD was demonstrated using a small isolated password-length validation function:

```text
backend/tdd/passwordValidator.js
```

The password-length requirements tested were:

| Password Length | Expected Result |
|---:|---|
| 7 characters | Reject |
| 8 characters | Accept |
| 72 characters | Accept |
| 73 characters | Reject |

**Vitest** was used as the JavaScript testing framework.

The TDD cycle followed:

**Red → Green → Refactor**

---

### 5.2 Red Stage

The tests were written before the implementation was completed.

At the Red stage, the password validation function did not yet return the required results, so the tests failed.

The boundary cases were:

```text
7 characters  → false
8 characters  → true
72 characters → true
73 characters → false
```

This demonstrated the TDD principle of writing a failing test before implementing the required behaviour.

**Evidence:** `TDD_Red_Stage_1`, `TDD_Red_Stage_2`, and `TDD_Red_Stage_3`

---

### 5.3 Green Stage

The password validation function was then implemented with the smallest change required to satisfy the tests.

The four tests passed:

```text
✓ reject 7-character password
✓ accept 8-character password
✓ accept 72-character password
✓ reject 73-character password
```

This demonstrated that the implementation satisfied the requirements represented by the tests.

**Evidence:** `TDD_Green_Stage`

---

### 5.4 Refactor Stage

After reaching the Green stage, the implementation was refactored by introducing named constants for the minimum and maximum password lengths.

The final implementation was:

```js
const MIN_PASSWORD_LENGTH = 8;
const MAX_PASSWORD_LENGTH = 72;

export function validatePasswordLength(password) {
  return (
    password.length >= MIN_PASSWORD_LENGTH &&
    password.length <= MAX_PASSWORD_LENGTH
  );
}
```

The tests were executed again after refactoring and continued to pass.

This demonstrated the complete:

**Red → Green → Refactor**

cycle.

**Evidence:** `TDD_Refactor_Stage`

---

### 5.5 Final TDD Test Result

The final TDD test execution produced:

```text
✓ tdd/passwordValidator.test.js (4 tests)
Test Files  1 passed
Tests       4 passed
```

**Result: 4/4 TDD tests passed.**

---

## 6. SonarQube Analysis

### 6.1 Analysis Scope

SonarQube was configured for the **LostLink backend** on the:

```text
feature/whitebox-tdd
```

branch.

The SonarQube project was configured using:

```text
Project Name: LostLink
Project Key: LostLink
```

The analysis was performed against the backend project.

---

### 6.2 Scanner Configuration

The configuration was stored in:

```text
backend/sonar-project.properties
```

Important configuration included:

```properties
sonar.projectKey=LostLink
sonar.projectName=LostLink
sonar.sources=.
sonar.exclusions=node_modules/**,coverage/**,tests/**,**/*.test.js
sonar.host.url=http://localhost:9000
sonar.javascript.lcov.reportPaths=coverage/lcov.info
```

The generated `coverage/` and `.scannerwork/` directories were excluded from Git using `.gitignore`.

The SonarQube authentication token was kept local and was **not committed to the repository**.

---

### 6.3 Coverage Integration

Vitest was configured to generate an LCOV coverage report.

The test command was:

```text
npm test -- --run
```

The test execution completed successfully:

```text
Test Files  3 passed (3)
Tests       16 passed (16)
```

The generated LCOV report was then imported by SonarQube.

The successful scanner output included:

```text
Sensor JavaScript/TypeScript Coverage [javascript]
Analysing ...\coverage\lcov.info
...
ANALYSIS SUCCESSFUL
EXECUTION SUCCESS
```

This confirms that SonarQube successfully imported the LCOV coverage data.

---

### 6.4 SonarQube Results

The latest SonarQube analysis reported:

| Metric | Result |
|---|---:|
| Bugs | 0 |
| Vulnerabilities | 0 |
| Security Hotspots | 6 |
| Code Smells | 4 |
| Technical Debt | 16 min |
| Coverage | 24.9% |
| Duplicated Blocks | 0 |
| Duplications | 0.0% |
| Reliability | A |
| Security | A |
| Maintainability | A |
| Security Review | E |

The **Quality Gate for New Code passed**.

The SonarQube coverage value is reported separately from the Vitest coverage value because SonarQube calculates coverage over the lines indexed by its analysis configuration.

**Evidence:** SonarQube Overall Code screenshot.

---

### 6.5 Code Smells

The latest SonarQube analysis identified **4 code smells**:

1. `controllers/authController.js` — cognitive complexity of the function is 16, above the allowed value of 15.
2. `tdd/passwordValidator.js` — commented-out code should be removed.
3. `tdd/passwordValidator.js` — a `TODO` comment identifies an incomplete task.
4. `tdd/passwordValidator.js` — another instance of commented-out code should be removed.

**Evidence:** SonarQube Issues screenshot.

---

### 6.6 Security Hotspots

SonarQube identified **6 security hotspots** with **0.0% reviewed**.

The findings included:

- 2 regular-expression-related DoS hotspots
- 1 insecure-configuration hotspot
- 3 other security hotspots

One reported hotspot concerns the email validation regular expression in `authController.js`:

```js
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
```

SonarQube flags this pattern for possible super-linear runtime due to backtracking.

These findings are SonarQube security hotspots requiring review and should not automatically be described as confirmed vulnerabilities.

**Evidence:** SonarQube Security Hotspots screenshot.

---

### 6.7 Actionable Improvements

Based on the actual SonarQube findings, the following improvements were identified.

#### Improvement 1 — Reduce Cognitive Complexity

Refactor the `register()` function so that its validation and exception-handling responsibilities are easier to understand and maintain.

This directly addresses the cognitive-complexity finding in `authController.js`.

#### Improvement 2 — Review the Email Regular Expression

Review the email-validation regular expression flagged by SonarQube for possible excessive backtracking.

If the validation requirement permits it, replace the pattern with a safer validation approach or simplify the expression while preserving the application's expected email-validation behaviour.

This directly addresses one of the security hotspots.

#### Improvement 3 — Remove Unused Comments and Resolve the TODO

Remove commented-out code from `passwordValidator.js` and resolve or remove the `TODO` comment after confirming that no incomplete work remains.

These actions directly address the code-smell findings reported by SonarQube.

---

## 7. Documentation and Evidence

The testing work was documented and organized under the `testing/` directory.

The documentation structure is:

```text
testing/
├── whitebox/
│   └── 01-white-box-testing.md
├── tdd/
│   └── 02-tdd.md
├── sonarqube/
│   └── 03-sonarqube-analysis.md
└── test-plan/
    └── member-2-progress-and-completion-report.md
```

The documentation covers:

- White-Box Testing analysis
- Control Flow Graph
- Cyclomatic Complexity
- White-Box test cases
- Statement and Branch Coverage
- TDD Red → Green → Refactor
- SonarQube configuration
- SonarQube findings
- Actionable improvements

---

## 8. Challenges and Limitations

During the testing work, several technical considerations were encountered:

- The `register()` function contains several validation and exception-handling paths, requiring separate tests to exercise the different outcomes.
- Some SonarQube coverage values differ from the Vitest coverage values because the tools calculate coverage over different sets of indexed/source lines.
- The unexpected-error white-box test intentionally produces an error log in `stderr` while still passing the test.
- SonarQube reported security hotspots that require review; these findings were treated as hotspots rather than confirmed vulnerabilities.
- The TDD exercise was kept isolated using a small password validation function rather than changing the main registration logic solely to make testing easier.

---

## 9. Final Completion Summary

The assigned testing activities were completed for the LostLink project.

The completed work includes:

- White-Box Testing of the `register()` function
- Control Flow Graph analysis
- Cyclomatic Complexity calculation
- White-Box test case implementation
- Statement and Branch Coverage measurement
- TDD using the Red → Green → Refactor cycle
- SonarQube configuration and analysis
- Review of code smells and security hotspots
- Identification of actionable improvements
- Documentation and evidence organization

The final automated test execution completed with:

```text
16/16 tests passed
```

The White-Box Testing analysis produced a cyclomatic complexity of:

```text
10
```

The final Vitest coverage results were:

```text
Statements: 71.18%
Branches:   63.04%
Functions:  80%
Lines:      71.18%
```

The SonarQube analysis reported:

```text
0 Bugs
0 Vulnerabilities
6 Security Hotspots
4 Code Smells
16 min Technical Debt
24.9% Coverage
0 Duplicated Blocks
```

The **New Code Quality Gate passed**.

Therefore, the assigned White-Box Testing, TDD, and SonarQube activities were completed and documented with the corresponding test and analysis evidence.
