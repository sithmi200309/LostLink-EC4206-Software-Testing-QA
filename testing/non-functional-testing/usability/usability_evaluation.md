# LostLink – Usability Evaluation

**Module:** EC4206 Software Testing and Quality Assurance
**Workstream:** Member 4 – Non-functional testing
**System under test:** LostLink (React/Vite frontend on `localhost:5173`, Express/MongoDB backend on `localhost:5000`)

## 1. Method

Usability was assessed using two expert-based methods:

1. **Heuristic review** – the evaluator walked through every LostLink page (Home, Register, Login, Browse Items, Item Details, Report an Item, Edit Item, My Reports, Contact Requests) in the running application and in the frontend source code, and judged each against Nielsen's 10 usability heuristics.
2. **Persona-based cognitive walkthrough** – the evaluator defined three typical user personas and stepped through five core tasks as each persona, recording where each would likely succeed or struggle based on the actual pages, labels and messages.

**Limitation:** both methods are expert evaluations. They predict usability problems from the interface design; they do not measure real users' task times or satisfaction. No real participants were tested. Testing with real users is recommended to confirm these findings.

## 2. Heuristic review

| ID | Page / flow | Finding | Heuristic | Severity | Suggested fix |
| --- | --- | --- | --- | --- | --- |
| UX-01 | Contact Requests | The item owner sees only the sender's name and message. There is no email, phone or reply button, and the request status is always "Pending" with no way to accept or decline. The owner has no way to get back to the person, so the main goal (returning the item) cannot be completed in the app. | Match between system and the real world; user control and freedom | High | Show the sender's contact email (with consent), or add a reply/accept action that shares contact details |
| UX-02 | Report an Item (logged out) | "Report an Item" appears in the menu for logged-out users. They can fill in the whole form; only a notice at the bottom says to sign in, and the Submit button is disabled. Going to Login leaves the page, so everything typed is lost. | Error prevention; visibility of system status | Medium | Redirect to Login before showing the form, or preserve the form data across login |
| UX-03 | Edit Item | After saving, the app redirects to Browse Items after 1 second instead of back to the edited item or My Reports. The user loses their place and must search for the item to confirm the change. | Consistency and standards; user control and freedom | Medium | Redirect to the item's details page or to My Reports |
| UX-04 | Report an Item (success) | After a successful report, the form clears and shows a success message but gives no link to view the new report. | Visibility of system status | Low | Add a "View my report" link or redirect to the new item |
| UX-05 | Report an Item (error) | If the server is unreachable, users see "Please make sure the backend is running", which is developer wording. | Help users recognise, diagnose and recover from errors | Low | Use plain wording, e.g. "Service unavailable, please try again later" |
| UX-06 | Navigation | The sign-up button in the navigation bar is labelled "Get Started", but the page it opens is titled "Register". Mismatched labels can make first-time users hesitate. | Consistency and standards | Low | Use one term (e.g. "Sign up") in both places |

### Good practices observed

- Form fields have visible labels and example placeholders (e.g. "e.g. Black backpack", "At least 8 characters").
- The report and edit forms use a date picker that blocks future dates.
- Deleting a report asks for confirmation in a modal before anything is removed.
- Login errors are generic ("Invalid email or password"), which is clear for users and avoids revealing whether an account exists.
- The navigation bar highlights the current page and only shows "My Reports" and "Contact Requests" when the user is logged in.

## 3. Persona-based cognitive walkthrough

### Personas

| ID | Persona | Relevant traits |
| --- | --- | --- |
| P1 | First-year student, confident web user | Uses apps daily, skims pages, expects modern patterns |
| P2 | Non-technical staff member | Reads carefully, unsure of jargon, needs clear feedback |
| P3 | Student in a hurry, rarely logs in | Starts tasks without signing in, impatient with extra steps |

### Tasks

1. Create a new account and log in.
2. Find any item in the Electronics category.
3. Report a lost item: a water bottle, lost yesterday at the canteen.
4. Edit the report and change the location to Library.
5. Find an item someone else reported and send them a message.

### Walkthrough results

| Persona | Task | Predicted completion | Likely issue (evidence from the interface) |
| --- | --- | --- | --- |
| P1 | 1. Register + log in | Yes | None significant; clear labels and "At least 8 characters" placeholder |
| P1 | 2. Find Electronics item | Yes | Category filter in the sidebar is easy to spot |
| P1 | 3. Report lost item | Yes | Date picker blocks future dates, which helps |
| P1 | 4. Edit report | Yes, with confusion | After saving, the app jumps to Browse Items instead of the edited item (UX-03) |
| P1 | 5. Send contact message | Yes | Success message shown; message needs at least 10 characters |
| P2 | 1. Register + log in | With hesitation | Navigation says "Get Started" but the page says "Register" (UX-06) |
| P2 | 2. Find Electronics item | Yes | – |
| P2 | 3. Report lost item | Yes | Success message shown, but no link to view the report (UX-04) |
| P2 | 4. Edit report | With difficulty | Must find My Reports first; redirect to Browse makes it unclear whether the edit was saved (UX-03) |
| P2 | 5. Send contact message | Yes | As an item owner, would receive requests but have no way to reply (UX-01) |
| P3 | 1. Register + log in | Skipped at first | Goes straight to "Report an Item" without logging in |
| P3 | 2. Find Electronics item | Yes | Browsing works without an account |
| P3 | 3. Report lost item | No at first, then yes | Fills in the whole form, then finds Submit disabled with "Please sign in"; after logging in, the typed data is lost (UX-02) |
| P3 | 4. Edit report | Yes, with confusion | Same redirect issue (UX-03) |
| P3 | 5. Send contact message | Yes | – |

## 4. Summary of findings

1. **UX-01 (High):** item owners cannot reply to or act on contact requests, so an item return cannot be completed within the app. Logged as GitHub Issue #4.
2. **UX-02 (Medium):** logged-out users can fill in the entire report form and then lose it when they sign in.
3. **UX-03 (Medium):** editing an item redirects to Browse Items, so users cannot easily confirm their change.
4. **UX-04, UX-05, UX-06 (Low):** no link to a newly created report; developer-oriented error wording; inconsistent "Get Started" vs "Register" labels.

## 5. Recommendations

- Prioritise UX-01, because it blocks the system's main purpose (reuniting owners with items).
- Fix UX-02 and UX-03 next; both are small frontend changes (redirect and navigation logic).
- Confirm these findings with a short test involving 3–5 real users from the target group (students and staff).
