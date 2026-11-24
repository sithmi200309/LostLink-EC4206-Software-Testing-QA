# SonarQube Analysis

## 1. Analysis Scope

SonarQube was configured for the **LostLink backend** on the
`feature/whitebox-tdd` branch.

The analysis was performed as a separate backend analysis rather than
combining the frontend and backend source in the same SonarQube project.

The SonarQube project name/key used was:

`LostLink`

The scanner was executed against the actual backend project path.

## 2. Scanner Configuration

The project configuration was stored in:

`backend/sonar-project.properties`

The important configuration included:

``` properties
sonar.projectKey=LostLink
sonar.projectName=LostLink
sonar.sources=.
sonar.exclusions=node_modules/**,coverage/**,tests/**,**/*.test.js
sonar.host.url=http://localhost:9000
sonar.javascript.lcov.reportPaths=coverage/lcov.info
```

The generated `coverage/` and `.scannerwork/` directories are excluded
from Git using `.gitignore`.

The SonarQube authentication token was kept local and was **not
committed to the repository**.

## 3. Coverage Integration

Vitest was configured to generate an LCOV coverage report.

The test command was:

``` text
npm test -- --run
```

The test execution completed successfully:

``` text
Test Files  3 passed (3)
Tests       16 passed (16)
```

The generated LCOV file was then read by SonarQube during analysis.

The successful scanner output included:

``` text
Sensor JavaScript/TypeScript Coverage [javascript]
Analysing ...\coverage\lcov.info
...
ANALYSIS SUCCESSFUL
EXECUTION SUCCESS
```

This confirms that SonarQube successfully imported the LCOV coverage
data.

## 4. SonarQube Results

The latest SonarQube analysis reported the following overall metrics:

  Metric                Result
  ------------------- --------
  Bugs                       0
  Vulnerabilities            0
  Security Hotspots          6
  Code Smells                4
  Technical Debt        16 min
  Coverage               24.9%
  Duplicated Blocks          0
  Duplications            0.0%
  Reliability                A
  Security                   A
  Maintainability            A
  Security Review            E

The **Quality Gate for New Code passed**.

The SonarQube coverage value is reported separately from the Vitest
coverage value because SonarQube calculates coverage over the lines
indexed by its analysis configuration.

<img width="836" height="707" alt="overview" src="https://github.com/user-attachments/assets/a63db0b0-ce36-4a38-aa16-6bc3a6abc346" />



## 5. Code Smells

The latest SonarQube analysis identified **4 code smells**:

1.  `controllers/authController.js` --- cognitive complexity of the
    function is 16, above the allowed value of 15.
2.  `tdd/passwordValidator.js` --- commented-out code should be removed.
3.  `tdd/passwordValidator.js` --- a `TODO` comment identifies an
    incomplete task.
4.  `tdd/passwordValidator.js` --- another instance of commented-out
    code should be removed.

<img width="1122" height="690" alt="SonarQube_Issues" src="https://github.com/user-attachments/assets/7337864a-92a7-40ca-af35-f66a0f9a328f" />


## 6. Security Hotspots

SonarQube identified **6 security hotspots** with **0.0% reviewed**.

The findings include:

-   2 regular-expression-related DoS hotspots
-   1 insecure-configuration hotspot
-   3 other security hotspots

One reported hotspot concerns the email validation regular expression in
`authController.js`:

``` js
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
```

SonarQube flags this pattern for possible super-linear runtime due to
backtracking.

These are SonarQube findings requiring review; they should not
automatically be described as confirmed vulnerabilities.

<img width="1107" height="667" alt="SonarQube_Security_Hotspots" src="https://github.com/user-attachments/assets/dcd6d346-708c-4e0f-8fa6-8f4ef3ad44c0" />


## 7. Actionable Improvements

Based on the actual SonarQube findings, the following improvements are
appropriate:

### Improvement 1 --- Reduce Cognitive Complexity

Refactor the `register()` function so that its validation and
exception-handling responsibilities are easier to understand and
maintain.

This directly addresses the SonarQube cognitive-complexity finding in
`authController.js`.

### Improvement 2 --- Review the Email Regular Expression

Review the email-validation regular expression flagged by SonarQube for
possible excessive backtracking.

If the validation requirement permits it, replace the pattern with a
safer validation approach or simplify the expression while preserving
the application's expected email-validation behaviour.

This directly addresses one of the security hotspots.

### Improvement 3 --- Remove Unused Comments and Resolve the TODO

Remove commented-out code from `passwordValidator.js` and resolve or
remove the `TODO` comment after confirming that no incomplete work
remains.

These actions directly address the code-smell findings reported by
SonarQube.

## 8. Conclusion

SonarQube was successfully integrated with the LostLink backend and the
Vitest LCOV coverage report.

The analysis completed successfully and reported:

-   **0 bugs**
-   **0 vulnerabilities**
-   **6 security hotspots**
-   **4 code smells**
-   **16 minutes technical debt**
-   **24.9% SonarQube coverage**
-   **0 duplicated blocks**

The results provide specific areas for improvement, particularly
cognitive complexity, security-hotspot review, and removal of
unused/incomplete code comments.
