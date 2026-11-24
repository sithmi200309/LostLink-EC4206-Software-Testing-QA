[02-tdd.md](https://github.com/user-attachments/files/35358729/02-tdd.md)
# Test-Driven Development (TDD)

## 1. TDD Target

Test-Driven Development was demonstrated using a small isolated
password-length validation function:

`backend/tdd/passwordValidator.js`

The validation requirements were:

-   A **7-character** password should be rejected.
-   An **8-character** password should be accepted.
-   A **72-character** password should be accepted.
-   A **73-character** password should be rejected.

**Vitest** was used as the JavaScript testing framework.

The TDD cycle followed the lecture structure:

**Red → Green → Refactor**

## 2. Red Stage

The tests were written before the implementation was completed.

At the Red stage, the password validation function did not yet return
the required results, so the four tests failed.

The boundary cases were:

``` text
7 characters  → false
8 characters  → true
72 characters → true
73 characters → false
```

This demonstrates the TDD principle of writing a failing test before
implementing the required behaviour.

<img width="1017" height="796" alt="TDD_Red_Stage_1" src="https://github.com/user-attachments/assets/545a2591-a118-403f-ae78-dca31e54eb40" />
<img width="1052" height="862" alt="TDD_Red_Stage_2" src="https://github.com/user-attachments/assets/305ebe80-37e3-4f67-816a-1d3ceb892965" />
<img width="957" height="562" alt="TDD_Red_Stage_3" src="https://github.com/user-attachments/assets/c92ee9fc-dc66-41b6-bc05-3e0810a936d3" />



## 3. Green Stage

The password validation function was then implemented with the smallest
change required to satisfy the tests.

The four tests passed:

``` text
✓ reject 7-character password
✓ accept 8-character password
✓ accept 72-character password
✓ reject 73-character password
```

The Green stage demonstrated that the implementation satisfied the
requirements represented by the tests.

<img width="857" height="457" alt="TDD_Green_Stage" src="https://github.com/user-attachments/assets/5eced21a-bd3f-47da-9e98-44ed7d208b86" />



## 4. Refactor Stage

After reaching the Green stage, the implementation was refactored by
introducing named constants for the minimum and maximum password
lengths.

The final implementation is:

``` js
const MIN_PASSWORD_LENGTH = 8;
const MAX_PASSWORD_LENGTH = 72;

export function validatePasswordLength(password) {
  return (
    password.length >= MIN_PASSWORD_LENGTH &&
    password.length <= MAX_PASSWORD_LENGTH
  );
}
```

The tests were executed again after refactoring and all four tests
continued to pass.

This demonstrates the complete TDD cycle:

**Red → Green → Refactor**

<img width="861" height="452" alt="TDD_Refactor_Stage" src="https://github.com/user-attachments/assets/5341ad34-e15c-4cb9-bc62-6ec539878e54" />


## 5. Final TDD Test Result

The final TDD test execution produced:

``` text
✓ tdd/passwordValidator.test.js (4 tests)
Test Files  1 passed
Tests       4 passed
```

All four boundary-value tests passed.
The final passing result is shown in the TDD Refactor Stage evidence above.


## 6. Conclusion

The TDD exercise demonstrated the complete Red--Green--Refactor cycle
using Vitest.

The tests were created first, an implementation was added to make the
tests pass, and the implementation was then refactored while preserving
the passing test results.

The selected password-length boundaries of **7, 8, 72, and 73
characters** directly test values below, at, and above the required
limits.

