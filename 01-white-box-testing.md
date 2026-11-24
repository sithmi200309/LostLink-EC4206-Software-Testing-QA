[01-white-box-testing.md](https://github.com/user-attachments/files/35357404/01-white-box-testing.md)
# White-Box Testing

## 1. Selected Function

The selected core function is `register()` in:

`backend/controllers/authController.js`

The function was selected because it contains meaningful validation,
database, success, and exception-handling decision paths.

The White-Box Testing workflow used was:

1.  Analyze source code
2.  Select coverage criteria
3.  Design test cases
4.  Execute tests
5.  Measure coverage
6.  Identify uncovered code

These steps follow the White-Box Testing lecture workflow.

## 2. Control Flow Analysis

The `register()` function contains the following major decision points:

-   **D1:** Required fields have the correct string types
-   **D2:** Full name length is valid
-   **D3:** Email address is valid
-   **D4:** Password has at least 8 characters
-   **D5:** Password does not exceed 72 characters
-   **D6:** Password and confirmation match
-   **D7:** A user with the email already exists
-   **D8:** The caught error has code `11000`
-   **D9:** The caught error is a Mongoose `ValidationError`

Therefore, there are **9 decision points**.

### Cyclomatic Complexity

For a single connected function:

\[ V(G) = D + 1 \]

\[ V(G) = 9 + 1 = 10 \]

Therefore:

**Cyclomatic Complexity = 10**

According to the lecture notes, a cyclomatic complexity of 1--10 is in
the **Low** risk range.

The result indicates **10 linearly independent basis paths** for the
analysis. This is the minimum number of independent paths, not the total
number of possible input combinations.

### CFG Evidence

The Control Flow Graph for `register()` is provided in the report
evidence.
<img width="809" height="691" alt="cfg" src="https://github.com/user-attachments/assets/ea80adaa-4f5e-4307-87f4-e8b6302e3530" />



## 3. Basis Paths and Test Cases

  -----------------------------------------------------------------------
  Test ID                 Path / Condition        Expected Result
  ----------------------- ----------------------- -----------------------
  WB01                    D1 = False --- invalid  HTTP 400
                          required-field types    

  WB02                    D2 = False --- full     HTTP 400
                          name shorter than 2     
                          characters              

  WB03                    D3 = False --- invalid  HTTP 400
                          email address           

  WB04                    D4 = False --- password HTTP 400
                          shorter than 8          
                          characters              

  WB05                    D5 = False --- password HTTP 400
                          longer than 72          
                          characters              

  WB06                    D6 = False ---          HTTP 400
                          passwords do not match  

  WB07                    D7 = True --- existing  HTTP 409
                          user found              

  WB08                    D7 = False --- valid    HTTP 201
                          registration and no     
                          existing user           

  WB09                    D8 = True ---           HTTP 409
                          duplicate-key error     
                          (`11000`)               

  WB10                    D8 = False, D9 = True   HTTP 400
                          --- Mongoose            
                          `ValidationError`       

  WB11                    D8 = False, D9 = False  HTTP 500
                          --- unexpected error    
  -----------------------------------------------------------------------

The test suite contains the required validation,
successful-registration, and exception-handling scenarios for the
selected function.

## 4. Statement and Branch Coverage

Statement coverage requires every executable statement in the selected
function to execute at least once.

Branch coverage requires each decision outcome, **true and false**, to
execute at least once.

The tests were implemented using Vitest and executed with coverage
enabled.

### Final Test Execution

``` text
Test Files  3 passed (3)
Tests       16 passed (16)
```

The 16 tests consist of:

-   11 white-box registration tests
-   1 basic Vitest sanity test
-   4 TDD password-validator tests


<img width="1122" height="437" alt="WhiteBox_AllTests_Passed" src="https://github.com/user-attachments/assets/825deda4-1f8f-40d8-8630-21e583181c75" />




### Coverage Results

  Coverage Metric     Overall
  ----------------- ---------
  Statements           71.18%
  Branches             63.04%
  Functions               80%
  Lines                71.18%

For `authController.js`:

  Coverage Metric     `authController.js`
  ----------------- ---------------------
  Statements                       67.92%
  Branches                         61.36%
  Functions                           75%
  Lines                            67.92%

The file-level report identifies uncovered lines **132--193**. These
lines are outside the selected `register()` function.

The HTML coverage report was inspected to verify the executed paths
through the selected registration function.


<img width="1055" height="691" alt="WhiteBox_Coverage_Result" src="https://github.com/user-attachments/assets/9357e3fd-4af3-48d5-831a-2818df0b1bfd" />



## 5. Test Execution Note

The WB11 test intentionally causes an unexpected error so that the `500`
exception-handling path is exercised. The application therefore prints:

``` text
Registration error: Database connection failed
```

to `stderr`. The test itself passes because the expected HTTP 500
response is produced.

## 6. Conclusion

The `register()` function was analyzed using its internal control flow.
Nine decision points produced a cyclomatic complexity of **10**, giving
10 linearly independent basis paths for the analysis.

The implemented white-box tests cover the major validation paths,
successful registration, existing-user handling, duplicate-key handling,
validation-error handling, and unexpected-error handling.

The final Vitest execution completed successfully with **16/16 tests
passing**. The coverage report provides evidence of executed statements
and branches, while the uncovered file-level lines belong to code
outside the selected function.
