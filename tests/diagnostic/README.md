# Diagnostic Tests

This folder contains diagnostic scripts used to verify Freshworks login functionality and credentials.

## Contents

### Test Scripts

- **`test-freshworks-login.ts`**: Basic diagnostic script to inspect Freshworks login page selectors
- **`test-login-credentials.ts`**: Comprehensive login test with step-by-step screenshots

### Screenshots

Located in `screenshots/` directory:
- `step1-login-page.png`: Initial Freshworks login page
- `step2-credentials-filled.png`: Login form with credentials filled
- `freshworks-login-page.png`: Full page screenshot of login form

## Running Diagnostic Tests

```bash
# Inspect login form selectors
npx tsx diagnostic-tests/test-freshworks-login.ts

# Test login with credentials from .env
npx tsx diagnostic-tests/test-login-credentials.ts
```

## Purpose

These diagnostic scripts were created to:
1. Verify that Freshworks login page selectors match the test implementation
2. Test actual login credentials
3. Capture screenshots for debugging authentication issues
4. Document the login flow for test development

## Findings

- ✅ Selectors match: `#username`, `#password`, `button[type="submit"]`
- ✅ Form accepts credentials
- ❌ Login times out after submission (credentials may be invalid or 2FA required)

See [credential_verification_report.md](file:///home/dev2/.gemini/antigravity/brain/02b6e715-635f-4860-9a3e-3d10e4a94d7b/credential_verification_report.md) for detailed analysis.
