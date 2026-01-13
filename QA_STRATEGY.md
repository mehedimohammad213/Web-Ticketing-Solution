# 🛡️ QA Strategy: Web Ticketing System

This document explains **how** and **why** we test our application. Our goal is to catch bugs *before* our users do.

---

## 1. 🎯 Strategy Overview

We don't just "test everything." We focus on what matters most to the user.

### What We Test (Scope)
*   **Functional**: Does the login work? Can I create a ticket? (The buttons and logic).
*   **Non-Functional**: Does it look good on mobile? Is it easy to use?
*   **Performance**: Does the site crash if 1000 people use it at once?
*   **Security**: Is user data safe? Can regular users see Admin pages? (They shouldn't!).

### Priority Levels (What to fix first)
We use a **P0 - P3** scale to decide what is urgent.

| Priority | Meaning | Example |
| :--- | :--- | :--- |
| **P0 (Critical)** | **"Stop the Ship!"** The app is broken. We cannot release. | Login fails; Database is down. |
| **P1 (High)** | **"Must Fix"**. Major feature is broken, but there's a workaround. | Reset Password email not sending. |
| **P2 (Medium)** | **"Fix Soon"**. Annoying bugs, but users can still do their job. | Search is slow; Typo in a label. |
| **P3 (Low)** | **"Polish"**. Visual glitches or "nice to have" improvements. | Button color is slightly off. |

---

## 2. 🧪 Test Case Design

We write test cases to prove the software works. Here is how we structure them.

### Feature: User Authentication (Login)
*Why? If users can't login, they can't use the app.*

| ID | Test Scenario | Expected Result | Priority |
| :--- | :--- | :--- | :--- |
| **AUTH-01** | Admin logs in with correct password | Redirected to **Admin Dashboard** | **P0** |
| **AUTH-02** | Customer logs in with correct password | Redirected to **User Portal** | **P0** |
| **AUTH-03** | Agent tries to access Admin page | **Access Denied** (Security Check) | **P1** |
| **AUTH-04** | Invalid password entered 3 times | Account locked for 15 mins | **P2** |

### Feature: Ticket Workflow
*Why? This is the core purpose of our app.*

| ID | Test Scenario | Expected Result | Priority |
| :--- | :--- | :--- | :--- |
| **TKT-01** | Create "Critical" ticket | Ticket created & tagged red | **P0** |
| **TKT-02** | Attach a file larger than 10MB | Error: "File too large" | **P2** |
| **SLA-01** | Ticket ignored for 1 hour | Auto-escalate to Manager | **P1** |

---

## 3. 🤖 Automation Strategy

We automate the "boring" repetitive stuff so humans can focus on the complex stuff.

### What do we Automate?
*   ✅ **Regression Tests**: Things that *used* to work (to make sure we didn't break them).
*   ✅ **Smoke Tests**: A quick "pulse check" to see if the app even turns on.
*   ✅ **API Tests**: Checking data accuracy behind the scenes.

### Tools We Use
*   **Playwright**: For clicking buttons and filling forms automatically (E2E).
*   **Jest / Supertest**: For testing the API directly.
*   **k6**: For simulating thousands of users (Load Testing).

---

## 4. 🔒 Security & Compliance

We have to keep user data safe. It's the law!

*   **GDPR (Privacy)**: Users must be able to delete their account ("Right to be Forgotten").
*   **Access Control**: User A should **never** see User B's tickets.
*   **Injection Attacks**: We test putting "hacker code" into input fields to make sure the app blocks it.

---

## 5. 🐛 How to Report a Bug

Found a bug? Great catch! Here is how to report it so a developer can fix it easily.

### 📝 Bug Report Template

**Title**: `[P0] Ticket Routing fails for "Billing" Category`
*(Short and scary if it's important)*

**Description**:
When a user selects "Billing", the ticket should go to Finance. Instead, it goes to "Unassigned".

**Steps to Reproduce (The most important part!):**
1.  Login as **Customer User**.
2.  Click **"New Ticket"**.
3.  Select Category: **"Billing"**.
4.  Submit.
5.  Login as **Admin** and check the "Finance" queue.

**Expected Result**: Ticket is in Finance Queue.
**Actual Result**: Ticket is lost in specific queue.

---

## 6. 🤝 Team Process

Quality is everyone's job, not just QA's.

1.  **Shift Left**: QA talks to designers *before* code is written to find logic holes early.
2.  **No Broken Windows**: We don't release with known P0 bugs. Ever.
3.  **War Room**: If a P0 is found before launch, Devs and QAs sit together until it's fixed.
