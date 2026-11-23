# Equivalence Partitioning – LostLink

## 1. Introduction

Equivalence Partitioning (EP) is a black-box testing technique that divides input data into groups called equivalence classes. Inputs within the same class are expected to produce similar system behaviour.

Instead of testing every possible input, representative values are selected from each valid and invalid equivalence class.

## 2. Equivalence Partitioning Test Cases

### 2.1 Registration – Email Field

| Class ID | Equivalence Class | Representative Input | Expected Result |
|---|---|---|---|
| EP-REG-01 | Valid email format | student@gmail.com | Email should be accepted |
| EP-REG-02 | Email without @ symbol | studentgmail.com | Email should be rejected |
| EP-REG-03 | Email without domain extension | student@gmail | Email should be rejected |
| EP-REG-04 | Empty email | Empty value | Registration should be rejected |
| EP-REG-05 | Email already registered | Existing registered email | Registration should be rejected with an appropriate message |

### 2.2 Registration – Password Field

| Class ID | Equivalence Class | Representative Input | Expected Result |
|---|---|---|---|
| EP-PASS-01 | Valid password length | password123 | Password should be accepted |
| EP-PASS-02 | Password shorter than 8 characters | pass123 | Password should be rejected |
| EP-PASS-03 | Password longer than 72 characters | A password containing 73 characters | Password should be rejected |
| EP-PASS-04 | Empty password | Empty value | Registration should be rejected |

### 2.3 Registration – Confirm Password Field

| Class ID | Equivalence Class | Representative Input | Expected Result |
|---|---|---|---|
| EP-CONF-01 | Matching passwords | password123 / password123 | Confirmation should be accepted |
| EP-CONF-02 | Non-matching passwords | password123 / password456 | Registration should be rejected |
| EP-CONF-03 | Empty confirmation password | Empty value | Registration should be rejected |

### 2.4 Registration – Full Name Field

| Class ID | Equivalence Class | Representative Input | Expected Result |
|---|---|---|---|
| EP-NAME-01 | Valid name length | Alex | Name should be accepted |
| EP-NAME-02 | Name shorter than 2 characters | A | Name should be rejected |
| EP-NAME-03 | Name longer than 100 characters | A name containing 101 characters | Name should be rejected |
| EP-NAME-04 | Empty name | Empty value | Registration should be rejected |

### 2.5 Login – Credentials

| Class ID | Equivalence Class | Representative Input | Expected Result |
|---|---|---|---|
| EP-LOGIN-01 | Valid credentials | Registered email and correct password | Login should succeed |
| EP-LOGIN-02 | Incorrect password | Registered email and incorrect password | Login should be rejected |
| EP-LOGIN-03 | Unregistered email | Email not associated with an account | Login should be rejected |
| EP-LOGIN-04 | Invalid email format | studentgmail.com | Login should be rejected |
| EP-LOGIN-05 | Empty email | Empty email and valid password | Login should be rejected |
| EP-LOGIN-06 | Empty password | Valid email and empty password | Login should be rejected |

## 3. Conclusion

Equivalence Partitioning helps reduce the number of test cases while maintaining effective input coverage. It allows the testing team to identify representative valid and invalid inputs for the LostLink application.