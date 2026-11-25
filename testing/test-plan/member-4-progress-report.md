# Member 4 – Progress and Completion Report

## 1. Member Responsibilities

Member 4 was responsible for Non-Functional Testing and Defect Management for the LostLink – University Lost and Found Management System.

The assigned responsibilities included performance testing, manual security testing against OWASP categories, usability evaluation, defect tracking in GitHub Issues, root cause analysis, demonstrating a complete bug lifecycle and contributing the Agile/DevOps reflection.

## 2. Completed Activities

| No. | Activity | Deliverable | Status |
|---|---|---|---|
| 1 | Set up a local test environment with a dedicated test database | Test Environment Record (Report Section 2) | Completed |
| 2 | Create test users and test data through the API | Postman Collection | Completed |
| 3 | Design and run a JMeter load test on `GET /api/items` | JMeter Test Plan and Results | Completed |
| 4 | Execute manual OWASP security checks | Security Test Results (SEC-001 to SEC-010) | Completed |
| 5 | Perform a heuristic usability review | Usability Evaluation | Completed |
| 6 | Perform a persona-based cognitive walkthrough | Usability Evaluation | Completed |
| 7 | Configure GitHub Issue labels for severity, priority and status | GitHub Labels | Completed |
| 8 | Log reproducible defects in GitHub Issues | Issues #2, #3, #4 | Completed |
| 9 | Perform root cause analysis | RCA for Issues #3 and #2 | Completed |
| 10 | Fix one defect and demonstrate the full bug lifecycle | Issue #3 and Pull Request #5 | Completed |
| 11 | Triage failed tests reported by other members | Defect Triage (Report Section 6) | Completed |
| 12 | Write the Agile/DevOps reflection | Report Section 9 | Completed |
| 13 | Capture and organise supporting evidence | Testing Evidence | Completed |

## 3. Test Execution Progress

### Performance Testing

Three JMeter load runs were executed against `GET /api/items`, with a ramp-up of 10 seconds and 10 loops per user.

| Run | Virtual Users | Requests | Average (ms) | Max (ms) | Error % | Throughput (req/s) |
|---|---:|---:|---:|---:|---:|---:|
| PERF-001 | 10 | 100 | 147 | 291 | 0.00 | 9.6 |
| PERF-002 | 25 | 250 | 156 | 1031 | 0.00 | 22.6 |
| PERF-003 | 50 | 500 | 351 | 1930 | 0.00 | 38.5 |
| **Total** | | **850** | | | **0.00** | |

### Security Testing

A total of 10 manual security test cases were documented and executed using Postman.

| Test Execution Status | Number of Test Cases |
|---|---:|
| Passed | 9 |
| Failed | 1 |
| Blocked | 0 |
| Not Run | 0 |
| **Total** | **10** |

The security test cases covered authentication (OWASP A07), broken access control and mass assignment (OWASP A01) and input handling. The failed test (SEC-010) identified a defect that was subsequently fixed, verified and closed.

### Usability Evaluation

A heuristic review against Nielsen's 10 usability heuristics and a persona-based cognitive walkthrough of five core tasks identified six usability findings.

| Severity | Number of Findings |
|---|---:|
| High | 1 |
| Medium | 2 |
| Low | 3 |
| **Total** | **6** |

### Defect Management

| Issue | Description | Severity | Status |
|---|---|---|---|
| #2 | Server fails to start when `.env` is created from `.env.example` (`MONGO_URI` vs `MONGODB_URI`) | Medium | Open |
| #3 | `POST /api/contact` returns 500 instead of 400 for a malformed item ID | Medium | Closed (fixed in PR #5, verified) |
| #4 | Item owners cannot reply to or act on contact requests | High | Open |

Issue #3 was taken through the complete lifecycle: New → Assigned → Fixed → Verified → Closed. The fix was made on the branch `fix/contact-invalid-id`, merged through Pull Request #5 after the CI check passed, and re-tested on `main`.

## 4. Testing Documentation Produced

The following documents and files were prepared under `testing/non-functional-testing/`:

- Member 4 Report (`Member4_Report.md`)
- JMeter Test Plan (`performance/LostLink_GET_items.jmx`)
- Postman Collection (`security/LostLink_Member4.postman_collection.json`)
- Usability Evaluation (`usability/usability_evaluation.md`)
- Defect and Bug Lifecycle Evidence (`defects/`)

Supporting screenshots were organised under:

- `testing/non-functional-testing/performance/`
- `testing/non-functional-testing/security/`
- `testing/non-functional-testing/defects/`

## 5. Challenges and Limitations

- Testing was conducted in a local development environment on a single laptop, with JMeter and the backend sharing the same dual-core CPU.
- The database was a free-tier MongoDB Atlas cluster, so response times include network latency to the cloud database.
- Load testing was limited to 50 virtual users and one read-only endpoint; the results do not represent production-scale traffic.
- Usability was assessed through expert evaluation (heuristic review and persona-based walkthrough); testing with real participants was not carried out.
- Security testing was limited to the manual checks listed and was performed only on the local test deployment.
- Three moderate-severity frontend dependency vulnerabilities reported by `npm install` were recorded but not fixed, to avoid changing the group's package versions.
- Issues #2 and #4 remain open for the group to prioritise.

## 6. Final Completion Statement

Member 4 completed the assigned non-functional testing and defect management activities. A JMeter load test of 850 requests was executed with no errors, 10 manual OWASP security checks were executed with 9 passing, and a usability evaluation produced six documented findings with suggested fixes.

Three defects were logged in GitHub Issues with severity, priority and status labels. Root cause analysis was completed for two defects, and one defect was fixed, verified and closed through a complete bug lifecycle supported by a pull request and a passing CI check.

The completed deliverables provide a structured record of the non-functional testing and defect management activities performed for the LostLink application.
