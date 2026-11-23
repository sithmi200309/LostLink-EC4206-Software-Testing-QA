# Decision Table Testing – LostLink

## 1. Introduction

Decision Table Testing is a black-box testing technique used to test system behaviour based on different combinations of input conditions.

It is particularly useful when an application's output depends on multiple conditions.

In the LostLink application, this technique is applied to the login functionality to verify whether users are authenticated correctly based on their email and password details.

## 2. Login Conditions

The following conditions are considered:

- C1: Is the email format valid?
- C2: Does the email belong to a registered user?
- C3: Does the entered password match the registered user's password?

The expected actions are:

- A1: Allow the user to log in.
- A2: Reject the login attempt and display an error message.

## 3. Login Decision Table

Y = Yes, N = No.

| Conditions / Actions | R1 | R2 | R3 | R4 | R5 | R6 | R7 | R8 |
|---|---|---|---|---|---|---|---|---|
| C1: Valid email format? | Y | Y | Y | Y | N | N | N | N |
| C2: Email registered? | Y | Y | N | N | Y | Y | N | N |
| C3: Password correct? | Y | N | Y | N | Y | N | Y | N |
| A1: Allow login? | Y | N | N | N | N | N | N | N |
| A2: Display error? | N | Y | Y | Y | Y | Y | Y | Y |

## 4. Explanation of Selected Rules

**Rule R1:** The email format is valid, the account exists and the password is correct. The user should successfully log in.

**Rule R2:** The email format is valid and the account exists, but the password is incorrect. Login should be rejected.

**Rule R3:** The email format is valid, but the email is not registered. Login should be rejected.

**Rule R5:** The email format is invalid. Login should be rejected.

The remaining rules represent other combinations in which at least one required condition is not satisfied.

## 5. Conclusion

Decision Table Testing helps identify different combinations of input conditions that may affect system behaviour. By testing these combinations, the testing team can verify the login decision logic and improve functional test coverage.